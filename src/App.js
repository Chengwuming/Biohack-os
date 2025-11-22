import React, { useState, useEffect } from 'react';
import { Zap, Utensils, Dumbbell, BarChart3, Moon, Sun } from 'lucide-react';
import { usePersistentState } from './hooks/usePersistentState';
import { useAutoSettlement } from './hooks/useAutoSettlement';
import { TabButton } from './components/TabButton';
import { EatTab } from './pages/EatTab';
import { TrainTab } from './pages/TrainTab';
import { StatsTab } from './pages/StatsTab';
import { useTheme } from './hooks/useTheme';
export default function App() {
    const [activeTab, setActiveTab] = useState('EAT');
    // Real Time
    const [today, setToday] = useState(new Date());
    const dayOfWeek = today.getDay();
    // Persistent State
    const [points, setPoints] = usePersistentState('thu_points', 0);
    const [workoutWeights, setWorkoutWeights] = usePersistentState('thu_weights', { bench: 40, squat: 50, pull: 30 });
    const [logs, setLogs] = usePersistentState('thu_logs', []);
    const [cooldowns, setCooldowns] = usePersistentState('thu_cds', {});
    // Auto-Settlement State
    const [lastActiveDate, setLastActiveDate] = usePersistentState('thu_active_date', new Date().toLocaleDateString());
    const [dailyState, setDailyState] = usePersistentState('thu_daily_state', {
        lunch: null, dinner: null,
        lunchPatch: null, dinnerPatch: null,
        lunchFailed: false, dinnerFailed: false
    });
    // Timer Effect
    useEffect(() => {
        const timer = setInterval(() => setToday(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);
    // Auto-Settlement Logic Hook
    useAutoSettlement({
        lastActiveDate,
        setLastActiveDate,
        dailyState,
        setDailyState,
        setPoints,
        setLogs,
        today
    });
    const { theme, toggleTheme } = useTheme();
    const getDayName = (dayIndex) => ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][dayIndex];
    return (<div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-100 pb-24 transition-colors">
            {/* Top Bar */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm transition-colors">
                <div>
                    <h1 className="font-black text-indigo-700 dark:text-indigo-400 tracking-tighter leading-none">
                        BioHackOS <span className="text-[10px] text-gray-400 dark:text-gray-500 font-normal">v2.0</span>
                    </h1>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 font-mono mt-0.5">
                        {today.toLocaleDateString()} {getDayName(dayOfWeek)}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" aria-label="Toggle theme">
                        {theme === 'light' ? <Moon size={16} className="text-gray-600 dark:text-gray-300"/> : <Sun size={16} className="text-yellow-500"/>}
                    </button>
                    <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800">
                        <Zap size={14} className="text-indigo-600 dark:text-indigo-400 mr-1 fill-indigo-600 dark:fill-indigo-400"/>
                        <span className="font-black text-indigo-700 dark:text-indigo-300">{points}</span>
                    </div>
                </div>
            </div>

            <div className="p-4 max-w-md mx-auto">
                {activeTab === 'EAT' && (<EatTab dailyState={dailyState} setDailyState={setDailyState} points={points} setPoints={setPoints} cooldowns={cooldowns} setCooldowns={setCooldowns} dayOfWeek={dayOfWeek}/>)}
                {activeTab === 'TRAIN' && (<TrainTab workoutWeights={workoutWeights} setWorkoutWeights={setWorkoutWeights} setPoints={setPoints} setLogs={setLogs}/>)}
                {activeTab === 'STATS' && (<StatsTab logs={logs} points={points}/>)}
            </div>

            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around z-30 pb-safe safe-area-inset-bottom transition-colors">
                <TabButton active={activeTab === 'EAT'} onClick={() => setActiveTab('EAT')} icon={Utensils} label="补给"/>
                <TabButton active={activeTab === 'TRAIN'} onClick={() => setActiveTab('TRAIN')} icon={Dumbbell} label="训练"/>
                <TabButton active={activeTab === 'STATS'} onClick={() => setActiveTab('STATS')} icon={BarChart3} label="数据"/>
            </nav>
        </div>);
}
