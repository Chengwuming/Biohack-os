import React, { useState } from 'react';
import { Settings, Plus, Download, Upload, RefreshCw, Save } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { CustomMeal, CustomReward, CustomPatch, CustomFixedModule } from '../types';
import toast from 'react-hot-toast';

export const SettingsTab: React.FC = () => {
    const {
        settings,
        addCustomMeal,
        deleteCustomMeal,
        addCustomReward,
        deleteCustomReward,
        addCustomPatch,
        deleteCustomPatch,
        addCustomFixedModule,
        deleteCustomFixedModule,
        toggleUseCustomData,
        resetSettings,
        exportSettings,
        importSettings
    } = useSettings();

    const [showMealEditor, setShowMealEditor] = useState(false);
    const [showRewardEditor, setShowRewardEditor] = useState(false);

    const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            importSettings(file);
            toast.success('设置导入成功！');
        }
    };

    const handleExport = () => {
        exportSettings();
        toast.success('设置导出成功！');
    };

    const handleReset = () => {
        if (window.confirm('确定要重置所有自定义设置吗？此操作不可撤销！')) {
            resetSettings();
            toast.success('设置已重置');
        }
    };

    const handleAddMeal = (type: 'SSR' | 'SR' | 'R_FLAVOR' | 'R_CARB') => {
        const id = `custom_meal_${Date.now()}`;
        const meal: CustomMeal = {
            id,
            type,
            title: '新餐食',
            main: '主食',
            side: '配菜',
            location: '食堂',
            cost: 10,
            protein: 20,
            weight: 1.0,
            tags: [],
            tips: '',
            isCustom: true,
            isSpecial: false
        };
        addCustomMeal(meal);
        toast.success('已添加新餐食，请在列表中编辑');
    };

    const handleAddReward = () => {
        const id = `custom_reward_${Date.now()}`;
        const reward: CustomReward = {
            id,
            type: 'REWARD',
            title: '新奖励',
            cost: 10,
            pointsCost: 100,
            cooldownDays: 7,
            tags: [],
            tips: '',
            isCustom: true
        };
        addCustomReward(reward);
        toast.success('已添加新奖励');
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 pb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-black flex items-center">
                    <Settings className="mr-2" size={24} />
                    自定义设置
                </h2>
                <p className="text-sm opacity-90 mt-1">管理你的餐食池、积分商城和固定协议</p>
            </div>

            {/* Toggle Custom Data */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">启用自定义数据</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">开启后，将使用你自定义的餐食和奖励</p>
                    </div>
                    <button
                        onClick={toggleUseCustomData}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${settings.useCustomData ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                    >
                        <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${settings.useCustomData ? 'translate-x-7' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Data Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">数据管理</h3>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={handleExport}
                        className="flex items-center justify-center py-2 px-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm font-medium"
                    >
                        <Download size={16} className="mr-1" />
                        导出
                    </button>
                    <label className="flex items-center justify-center py-2 px-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium cursor-pointer">
                        <Upload size={16} className="mr-1" />
                        导入
                        <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
                    </label>
                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center py-2 px-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium"
                    >
                        <RefreshCw size={16} className="mr-1" />
                        重置
                    </button>
                </div>
            </div>

            {/* Custom Meals */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">自定义餐食池</h3>
                    <div className="flex space-x-1">
                        <button onClick={() => handleAddMeal('SSR')} className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-bold">+SSR</button>
                        <button onClick={() => handleAddMeal('SR')} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-bold">+SR</button>
                        <button onClick={() => handleAddMeal('R_FLAVOR')} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-bold">+R</button>
                    </div>
                </div>
                {settings.customMeals.length === 0 ? (
                    <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">暂无自定义餐食</p>
                ) : (
                    <div className="space-y-2">
                        {settings.customMeals.map(meal => (
                            <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">{meal.type}</span>
                                        <span className="font-bold text-sm text-gray-800 dark:text-gray-100">{meal.title}</span>
                                        {meal.isSpecial && <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded">特殊</span>}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {meal.protein}g蛋白 | ¥{meal.cost} | 权重:{meal.weight}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteCustomMeal(meal.id)}
                                    className="ml-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 text-xs font-medium transition-colors"
                                >
                                    删除
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Custom Rewards */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">自定义积分商城</h3>
                    <button
                        onClick={handleAddReward}
                        className="flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 text-xs font-bold transition-colors"
                    >
                        <Plus size={14} className="mr-1" />
                        添加奖励
                    </button>
                </div>
                {settings.customRewards.length === 0 ? (
                    <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">暂无自定义奖励</p>
                ) : (
                    <div className="space-y-2">
                        {settings.customRewards.map(reward => (
                            <div key={reward.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                                <div className="flex-1">
                                    <span className="font-bold text-sm text-gray-800 dark:text-gray-100">{reward.title}</span>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {reward.pointsCost}积分 | 冷却{reward.cooldownDays}天
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteCustomReward(reward.id)}
                                    className="ml-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 text-xs font-medium transition-colors"
                                >
                                    删除
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                    💡 <strong>提示:</strong> 目前为简化版设置，只支持添加和删除。后续版本将支持详细编辑功能。
                </p>
            </div>
        </div>
    );
};
