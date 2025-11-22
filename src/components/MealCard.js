import React from 'react';
import { Lock, Trophy, Home, RotateCcw, XCircle, Skull, AlertTriangle } from 'lucide-react';
import { PATCHES } from '../data/meals';
export const MealCard = ({ meal, isLocked, onRoll, onToggleDorm, patch, onPatchChange, onFail, isFailed }) => {
    if (!meal)
        return <div className="p-8 text-center text-gray-400 border-2 border-dashed rounded-xl">待机中...</div>;
    if (isFailed) {
        return (<div className="relative bg-gray-100 rounded-xl border-2 border-gray-200 p-6 mb-4 opacity-60">
                <div className="flex items-center justify-center text-gray-400 font-bold space-x-2">
                    <Skull size={20}/>
                    <span>已标记失败 (积分归零)</span>
                </div>
                <button onClick={onFail} className="absolute top-2 right-2 text-xs text-indigo-500 underline">撤销</button>
            </div>);
    }
    const isDorm = meal.type === 'UR_DORM';
    const isReward = meal.type === 'REWARD';
    const totalP = (meal.protein || 0) + (patch?.protein || 0);
    const borderClass = isDorm
        ? 'border-gray-900 border-4'
        : isLocked ? 'border-yellow-400 ring-2 ring-yellow-100'
            : isReward ? 'border-purple-400 ring-2 ring-purple-100'
                : 'border-indigo-100';
    const bgHeaderClass = isDorm
        ? 'bg-gray-900 text-white'
        : isLocked ? 'bg-yellow-50 text-yellow-700'
            : isReward ? 'bg-purple-50 text-purple-700'
                : 'bg-gray-50 text-gray-500';
    return (<div className={`relative bg-white rounded-xl shadow-sm overflow-hidden mb-4 transition-all ${borderClass}`}>

            {/* Card Header */}
            <div className={`px-4 py-2 flex justify-between items-center border-b ${bgHeaderClass}`}>
                <div className="flex items-center space-x-2">
                    {isLocked && <Lock size={14}/>}
                    {isReward && <Trophy size={14}/>}
                    {isDorm && <Home size={14}/>}
                    <span className="text-xs font-bold">
                        {isLocked ? "系统锁定" : isReward ? "奖励餐" : isDorm ? "宿舍模式" : meal.location}
                    </span>
                </div>
                <div className="flex space-x-1 items-center">
                    {!isLocked && !isReward && (<>
                            <button onClick={onToggleDorm} className={`px-2 py-1 rounded text-[10px] font-bold ${isDorm ? 'bg-white text-black' : 'bg-gray-200 text-gray-600'}`}>
                                {isDorm ? "退出" : "切宿舍"}
                            </button>
                            <button onClick={onRoll} disabled={isDorm} className="p-1 bg-white/20 hover:bg-white/40 rounded disabled:opacity-50">
                                <RotateCcw size={14}/>
                            </button>
                        </>)}
                    <button onClick={onFail} className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded-full" title="没按计划吃">
                        <XCircle size={16}/>
                    </button>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-lg text-gray-800 leading-tight">{meal.title}</h3>
                    <div className="text-right">
                        <div className="font-mono font-bold text-xl text-indigo-600">{totalP}g</div>
                        <div className="text-[10px] text-gray-400">¥{(meal.cost + (patch?.cost || 0)).toFixed(1)}</div>
                    </div>
                </div>
                <div className="text-sm text-gray-600 mb-3 space-y-1">
                    <div><span className="text-xs text-gray-400 mr-1">主:</span>{meal.main}</div>
                    <div><span className="text-xs text-gray-400 mr-1">配:</span>{meal.side}</div>
                </div>

                {!isDorm && !isLocked && !isReward && meal.patchRequired && (<div className="mt-3 bg-red-50 p-2 rounded-lg border border-red-100">
                        <div className="flex items-center text-red-600 text-[10px] font-bold mb-2">
                            <AlertTriangle size={10} className="mr-1"/> 蛋白不足！请挂载:
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            {PATCHES.map(p => (<button key={p.id} onClick={() => onPatchChange(patch?.id === p.id ? null : p)} className={`text-left px-2 py-2 rounded border text-[10px] flex flex-col justify-center items-center transition-all
                      ${patch?.id === p.id ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-white border-red-100 text-gray-600 hover:bg-red-50'}`}>
                                    <span className="font-bold">{p.name}</span>
                                </button>))}
                        </div>
                        {patch && (<div className="bg-white p-2 rounded border border-red-100 text-xs text-red-800 font-bold flex items-start animate-in slide-in-from-top-1">
                                <span className="mr-1">👉</span> {patch.content}
                            </div>)}
                    </div>)}
            </div>
        </div>);
};
