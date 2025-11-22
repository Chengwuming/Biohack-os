import React from 'react';
import { Activity, Info, Zap } from 'lucide-react';
import { WorkoutWeights, Log } from '../types';
import toast from 'react-hot-toast';

interface TrainTabProps {
    workoutWeights: WorkoutWeights;
    setWorkoutWeights: React.Dispatch<React.SetStateAction<WorkoutWeights>>;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
}

export const TrainTab: React.FC<TrainTabProps> = ({ workoutWeights, setWorkoutWeights, setPoints, setLogs }) => {

    const handleWorkoutComplete = () => {
        const earned = 50;
        setPoints(p => p + earned);
        const newLog: Log = {
            date: new Date().toLocaleString(),
            type: '训练',
            score: earned,
            details: `BP: ${workoutWeights.bench}kg, SQ: ${workoutWeights.squat}kg, PD: ${workoutWeights.pull}kg`
        };
        setLogs(prev => [newLog, ...prev]);
        toast.success(`🏋️ 训练完成！获得 ${earned} 积分`, {
            icon: '💪',
        });
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center"><Activity size={18} className="mr-2 text-indigo-600 dark:text-indigo-400" /> 训练日志</h3>
                <div className="space-y-4">
                    {(['bench', 'squat', 'pull'] as const).map(type => (
                        <div key={type} className="flex justify-between items-center border-b border-gray-50 dark:border-gray-700 pb-2">
                            <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase w-24">
                                {type === 'bench' ? '卧推' : type === 'squat' ? '深蹲' : '下拉'}
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={workoutWeights[type]}
                                    onChange={(e) => setWorkoutWeights({ ...workoutWeights, [type]: parseInt(e.target.value) || 0 })}
                                    className="w-20 p-2 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-center font-bold bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                />
                                <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">KG</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-[10px] text-gray-400 dark:text-gray-500 flex items-center">
                    <Info size={10} className="mr-1" /> 重量已自动保存
                </div>
            </div>
            <button onClick={handleWorkoutComplete} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 flex items-center justify-center transition-all">
                <Zap size={18} className="mr-2" /> 完成训练 (+50 PTS)
            </button>
        </div>
    );
};
