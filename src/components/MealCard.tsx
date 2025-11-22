import React from 'react';
import { Lock, Trophy, Home, RotateCcw, XCircle, Skull, AlertTriangle } from 'lucide-react';
import { Meal, Patch } from '../types';
import { PATCHES } from '../data/meals';

interface MealCardProps {
    meal: Meal | null;
    isLocked?: boolean;
    onRoll: () => void;
    onToggleDorm: () => void;
    patch: Patch | null;
    onPatchChange: (patch: Patch | null) => void;
    onFail: () => void;
    isFailed: boolean;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, isLocked, onRoll, onToggleDorm, patch, onPatchChange, onFail, isFailed }) => {
    if (!meal) return <div className="p-8 text-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl transition-colors">待机中...</div>;

    if (isFailed) {
        return (
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 mb-4 opacity-60 transition-colors">
                <div className="flex items-center justify-center text-gray-400 dark:text-gray-500 font-bold space-x-2">
                    <Skull size={20} />
                    <span>已标记失败 (积分归零)</span>
                </div>
                <button onClick={onFail} className="absolute top-2 right-2 text-xs text-indigo-500 dark:text-indigo-400 underline">撤销</button>
            </div>
        );
    }

    const isDorm = meal.type === 'UR_DORM';
    const isReward = meal.type === 'REWARD';
    const totalP = (meal.protein || 0) + (patch?.protein || 0);

    const borderClass = isDorm
        ? 'border-gray-900 dark:border-gray-600 border-4'
        : isLocked ? 'border-yellow-400 dark:border-yellow-600 ring-2 ring-yellow-100 dark:ring-yellow-900/30'
            : isReward ? 'border-purple-400 dark:border-purple-600 ring-2 ring-purple-100 dark:ring-purple-900/30'
                : 'border-indigo-100 dark:border-indigo-900';

    const bgHeaderClass = isDorm
        ? 'bg-gray-900 dark:bg-gray-950 text-white'
        : isLocked ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
            : isReward ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400';

    return (
        <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-4 transition-all border-2 ${borderClass}`}>

            {/* Card Header */}
            <div className={`px-4 py-2 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 ${bgHeaderClass}`}>
                <div className="flex items-center space-x-2">
                    {isLocked && <Lock size={14} />}
                    {isReward && <Trophy size={14} />}
                    {isDorm && <Home size={14} />}
                    <span className="text-xs font-bold">
                        {isLocked ? "系统锁定" : isReward ? "奖励餐" : isDorm ? "宿舍模式" : meal.location}
                    </span>
                </div>
                <div className="flex space-x-1 items-center">
                    {!isLocked && !isReward && (
                        <>
                            <button onClick={onToggleDorm} className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${isDorm ? 'bg-white dark:bg-gray-700 text-black dark:text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                {isDorm ? "退出" : "切宿舍"}
                            </button>
                            <button onClick={onRoll} disabled={isDorm} className="p-1 bg-white/20 dark:bg-gray-700/50 hover:bg-white/40 dark:hover:bg-gray-600 rounded disabled:opacity-50 transition-colors">
                                <RotateCcw size={14} />
                            </button>
                        </>
                    )}
                    <button onClick={onFail} className="ml-2 p-1 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors" title="没按计划吃">
                        <XCircle size={16} />
                    </button>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-lg text-gray-800 dark:text-gray-100 leading-tight">{meal.title}</h3>
                    <div className="text-right">
                        <div className="font-mono font-bold text-xl text-indigo-600 dark:text-indigo-400">{totalP}g</div>
                        <div className="text-[10px] text-gray-400 dark:text-gray-500">¥{(meal.cost + (patch?.cost || 0)).toFixed(1)}</div>
                    </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 space-y-1">
                    <div><span className="text-xs text-gray-400 dark:text-gray-500 mr-1">主:</span>{meal.main}</div>
                    <div><span className="text-xs text-gray-400 dark:text-gray-500 mr-1">配:</span>{meal.side}</div>
                </div>

                {!isDorm && !isLocked && !isReward && meal.patchRequired && (
                    <div className="mt-3 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-900/50 transition-colors">
                        <div className="flex items-center text-red-600 dark:text-red-400 text-[10px] font-bold mb-2">
                            <AlertTriangle size={10} className="mr-1" /> 蛋白不足！请挂载:
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            {PATCHES.map(p => (
                                <button key={p.id} onClick={() => onPatchChange(patch?.id === p.id ? null : p)}
                                    className={`text-left px-2 py-2 rounded border text-[10px] flex flex-col justify-center items-center transition-all
                      ${patch?.id === p.id ? 'bg-red-600 dark:bg-red-700 border-red-600 dark:border-red-700 text-white shadow-md' : 'bg-white dark:bg-gray-800 border-red-100 dark:border-red-900/50 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30'}`}>
                                    <span className="font-bold">{p.name}</span>
                                </button>
                            ))}
                        </div>
                        {patch && (
                            <div className="bg-white dark:bg-gray-800 p-2 rounded border border-red-100 dark:border-red-900/50 text-xs text-red-800 dark:text-red-300 font-bold flex items-start animate-in slide-in-from-top-1 transition-colors">
                                <span className="mr-1">👉</span> {patch.content}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
