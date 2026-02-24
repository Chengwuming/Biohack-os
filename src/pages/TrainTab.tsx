import React, { useState } from 'react';
import { Activity, Info, Zap, Plus, Trash2 } from 'lucide-react';
import { WorkoutWeights, Log, TrainingItem } from '../types';
import toast from 'react-hot-toast';

interface TrainTabProps {
    workoutWeights: WorkoutWeights;
    setWorkoutWeights: React.Dispatch<React.SetStateAction<WorkoutWeights>>;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
}

export const TrainTab: React.FC<TrainTabProps> = ({ workoutWeights, setWorkoutWeights, setPoints, setLogs }) => {
    const [newItemName, setNewItemName] = useState('');

    const handleWorkoutComplete = () => {
        const earned = 50;
        setPoints(p => p + earned);
        const details = workoutWeights.map(item => `${item.name}: ${item.weight}kg x ${item.sets}组`).join(', ');
        const newLog: Log = {
            date: new Date().toLocaleString(),
            type: '训练',
            score: earned,
            details: details
        };
        setLogs(prev => [newLog, ...prev]);
        toast.success(`🏋️ 训练完成！获得 ${earned} 积分`, {
            icon: '💪',
        });
    };

    const updateItem = (id: string, updates: Partial<TrainingItem>) => {
        setWorkoutWeights(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    };

    const deleteItem = (id: string) => {
        if (window.confirm('确定删除该训练项目吗？')) {
            setWorkoutWeights(prev => prev.filter(item => item.id !== id));
        }
    };

    const addItem = () => {
        if (!newItemName.trim()) {
            toast.error('请输入项目名称');
            return;
        }
        const newItem: TrainingItem = {
            id: Date.now().toString(),
            name: newItemName,
            weight: 0,
            sets: 3,
            isCustom: true
        };
        setWorkoutWeights(prev => [...prev, newItem]);
        setNewItemName('');
        toast.success('已添加训练项目');
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm transition-colors">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center"><Activity size={18} className="mr-2 text-indigo-600 dark:text-indigo-400" /> 训练日志</h3>

                <div className="space-y-6">
                    {workoutWeights.map(item => (
                        <div key={item.id} className="border-b border-gray-50 dark:border-gray-700 pb-4">
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase">
                                    {item.name}
                                </label>
                                {item.isCustom && (
                                    <button onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-600 p-1">
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        value={item.weight}
                                        onChange={(e) => updateItem(item.id, { weight: parseInt(e.target.value) || 0 })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-center font-bold bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                    />
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">KG</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        value={item.sets}
                                        onChange={(e) => updateItem(item.id, { sets: parseInt(e.target.value) || 0 })}
                                        className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-center font-bold bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                    />
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">SETS</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New Item */}
                <div className="mt-8 pt-6 border-t border-dashed border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="新增训练项目 (如: 哑铃推举)"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addItem()}
                            className="flex-1 p-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        />
                        <button onClick={addItem} className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                <div className="mt-4 text-[10px] text-gray-400 dark:text-gray-500 flex items-center">
                    <Info size={10} className="mr-1" /> 数据已自动保存
                </div>
            </div>
            <button onClick={handleWorkoutComplete} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg active:scale-95 flex items-center justify-center transition-all">
                <Zap size={18} className="mr-2" /> 完成训练 (+50 PTS)
            </button>
        </div>
    );
};
