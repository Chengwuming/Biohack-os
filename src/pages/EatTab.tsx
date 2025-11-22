import React from 'react';
import { Dices, Wallet, Lock } from 'lucide-react';
import { DailyState, Meal, Patch } from '../types';
import { MealCard } from '../components/MealCard';
import { REWARD_MEALS, MEAL_POOL, DORM_MEAL } from '../data/meals';
import toast from 'react-hot-toast';

interface EatTabProps {
    dailyState: DailyState;
    setDailyState: React.Dispatch<React.SetStateAction<DailyState>>;
    points: number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    cooldowns: Record<string, string>;
    setCooldowns: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    dayOfWeek: number;
}

export const EatTab: React.FC<EatTabProps> = ({
    dailyState, setDailyState, points, setPoints, cooldowns, setCooldowns, dayOfWeek
}) => {

    const getWeightedRandomMeal = (excludeId?: string) => {
        let pool = MEAL_POOL.filter(m => m.id !== excludeId);
        const totalWeight = pool.reduce((acc, m) => acc + (m.weight || 0), 0);
        let random = Math.random() * totalWeight;
        for (let meal of pool) {
            if (random < (meal.weight || 0)) return meal;
            random -= (meal.weight || 0);
        }
        return pool[0];
    };

    const updateDaily = (key: keyof DailyState, value: any) => {
        setDailyState(prev => ({ ...prev, [key]: value }));
    };

    const handleRoll = (slot: 'lunch' | 'dinner') => {
        const exclude = slot === 'lunch' ? dailyState.dinner?.id : dailyState.lunch?.id;
        const meal = getWeightedRandomMeal(exclude);

        updateDaily(slot, meal);
        updateDaily(`${slot}Patch` as keyof DailyState, null);
        updateDaily(`${slot}Failed` as keyof DailyState, false);
    };

    const toggleDorm = (slot: 'lunch' | 'dinner') => {
        const current = slot === 'lunch' ? dailyState.lunch : dailyState.dinner;
        if (current?.type === 'UR_DORM') {
            updateDaily(slot, null);
        } else {
            updateDaily(slot, DORM_MEAL);
            updateDaily(`${slot}Patch` as keyof DailyState, null);
        }
    };

    const getDaysDiff = (dateStr?: string) => {
        if (!dateStr) return 999;
        const diff = new Date().getTime() - new Date(dateStr).getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    };

    const handleRedeem = (rewardId: string) => {
        const reward = REWARD_MEALS.find(r => r.id === rewardId);
        if (!reward) return;

        const cdDate = cooldowns[rewardId];
        const daysSince = getDaysDiff(cdDate);

        if (points < (reward.pointsCost || 0)) {
            toast.error("❌ 积分不足，快去训练！");
            return;
        }
        if (reward.cooldownDays && daysSince < reward.cooldownDays) {
            toast.error(`⏳ 冷却中... ${reward.cooldownDays - daysSince}天`);
            return;
        }

        // Simple approach: always replace lunch
        const shouldReplaceLunch = window.confirm(`兑换 [${reward.title}]?\n\n点击【确定】替换午餐\n点击【取消】替换晚餐`);
        if (shouldReplaceLunch) {
            updateDaily('lunch', reward); updateDaily('lunchPatch', null); updateDaily('lunchFailed', false);
        } else {
            updateDaily('dinner', reward); updateDaily('dinnerPatch', null); updateDaily('dinnerFailed', false);
        }

        setPoints(p => p - (reward.pointsCost || 0));
        setCooldowns(prev => ({ ...prev, [rewardId]: new Date().toISOString() }));
        toast.success(`✅ ${reward.title} 兑换成功！`, {
            icon: '🎉',
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            {/* Status Bar */}
            <div className="bg-indigo-900 dark:bg-indigo-950 text-white p-4 rounded-xl shadow-lg flex justify-between items-center transition-colors">
                <div>
                    <div className="text-[10px] opacity-70 uppercase tracking-wider">System Status</div>
                    <div className="font-bold text-sm flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        自动结算系统运行中
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] opacity-70 uppercase tracking-wider">Pending Points</div>
                    <div className="font-mono font-bold text-lg text-green-400">
                        +{(dailyState.lunch && !dailyState.lunchFailed ? 30 : 0) + (dailyState.dinner && !dailyState.dinnerFailed ? 30 : 0)}
                    </div>
                </div>
            </div>

            {/* Fixed Protocol */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">固定协议</h2>
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">¥6.1 | 46g 蛋白</span>
                </div>
                <div className="flex space-x-2 overflow-x-auto text-[10px] text-gray-600 pb-1">
                    <span className="bg-green-50 px-2 py-1 rounded border border-green-100 whitespace-nowrap">🥚 4个蛋</span>
                    <span className="bg-green-50 px-2 py-1 rounded border border-green-100 whitespace-nowrap">🥛 2盒奶</span>
                    <span className="bg-blue-50 px-2 py-1 rounded border border-blue-100 whitespace-nowrap">💊 锌+D3</span>
                </div>
            </div>

            {/* Lunch */}
            <div>
                <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">午餐槽位</span>
                    <span className="text-[10px] text-gray-300 dark:text-gray-600 font-mono">{dayOfWeek === 5 ? '周五锁定' : dayOfWeek === 6 ? '周六锁定' : '自动'}</span>
                </div>
                {dailyState.lunch || dailyState.lunchFailed ? (
                    <MealCard
                        meal={dailyState.lunch} isLocked={dailyState.lunch?.type === 'SSR_LOCK'}
                        onRoll={() => handleRoll('lunch')} onToggleDorm={() => toggleDorm('lunch')}
                        patch={dailyState.lunchPatch} onPatchChange={(p) => updateDaily('lunchPatch', p)}
                        isFailed={dailyState.lunchFailed} onFail={() => updateDaily('lunchFailed', !dailyState.lunchFailed)}
                    />
                ) : (
                    <div onClick={() => handleRoll('lunch')} className="h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Dices className="mr-2 opacity-50" /> 点击生成午餐
                    </div>
                )}
            </div>

            {/* Dinner */}
            <div>
                <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">晚餐槽位</span>
                </div>
                {dailyState.dinner || dailyState.dinnerFailed ? (
                    <MealCard
                        meal={dailyState.dinner} isLocked={dailyState.dinner?.type === 'SSR_LOCK'}
                        onRoll={() => handleRoll('dinner')} onToggleDorm={() => toggleDorm('dinner')}
                        patch={dailyState.dinnerPatch} onPatchChange={(p) => updateDaily('dinnerPatch', p)}
                        isFailed={dailyState.dinnerFailed} onFail={() => updateDaily('dinnerFailed', !dailyState.dinnerFailed)}
                    />
                ) : (
                    <div onClick={() => handleRoll('dinner')} className="h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Dices className="mr-2 opacity-50" /> 点击生成晚餐
                    </div>
                )}
            </div>

            {/* Reward Shop */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-black text-gray-800 dark:text-gray-100 flex items-center"><Wallet size={16} className="mr-2 text-gray-600 dark:text-gray-400" /> 积分商城</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {REWARD_MEALS.map(r => {
                        const cdDate = cooldowns[r.id];
                        const days = getDaysDiff(cdDate);
                        const onCD = r.cooldownDays ? days < r.cooldownDays : false;
                        const canAfford = points >= (r.pointsCost || 0);
                        return (
                            <button key={r.id} onClick={() => handleRedeem(r.id)} disabled={!canAfford || onCD}
                                className={`p-3 rounded-xl border-2 text-left relative overflow-hidden transition-all active:scale-95 ${!canAfford || onCD ? 'bg-gray-50 dark:bg-gray-800 opacity-60' : 'bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900 hover:border-purple-300 dark:hover:border-purple-700'}`}>
                                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{r.title}</div>
                                <div className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">{r.pointsCost} pts</div>
                                {onCD && <div className="absolute inset-0 bg-gray-100/90 dark:bg-gray-900/90 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">CD: {(r.cooldownDays || 0) - days}天</div>}
                                {!canAfford && !onCD && <div className="absolute bottom-2 right-2"><Lock size={12} className="text-gray-300 dark:text-gray-600" /></div>}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
