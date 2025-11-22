import React from 'react';
import { Download, TrendingUp, Award, Flame, Zap as ZapIcon } from 'lucide-react';
import { PointsChart } from '../components/PointsChart';
import { StatsCard } from '../components/StatsCard';
import { calculateWeeklyStats, getDailyChartData } from '../utils/statsCalculator';
export const StatsTab = ({ logs, points }) => {
    const handleExport = () => {
        const jsonString = JSON.stringify(logs, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `biohack_logs_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    const weeklyStats = calculateWeeklyStats(logs);
    const chartData = getDailyChartData(logs, 14);
    return (<div className="space-y-4 animate-in slide-in-from-right-4">
            {/* Weekly Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
                <StatsCard icon={ZapIcon} label="当前积分" value={points} color="indigo"/>
                <StatsCard icon={TrendingUp} label="周获取积分" value={weeklyStats.totalPoints} color="green"/>
                <StatsCard icon={Flame} label="完美执行天数" value={weeklyStats.perfectDays} color="orange"/>
                <StatsCard icon={Award} label="周训练次数" value={weeklyStats.trainingCount} color="purple"/>
            </div>

            {/* Points Trend Chart */}
            <PointsChart data={chartData}/>

            {/* Logs Section */}
            <div className="flex justify-between items-end mb-4">
                <h3 className="font-black text-xl text-gray-800 dark:text-gray-100">数据流水</h3>
                <div className="flex items-center space-x-2">
                    <button onClick={handleExport} className="text-xs flex items-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                        <Download size={12} className="mr-1"/> 导出
                    </button>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{logs.length} 条记录</span>
                </div>
            </div>
            {logs.length === 0 ? <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">暂无数据</div> : logs.map((log, i) => (<div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex justify-between items-center transition-colors">
                    <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${log.type === '训练' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : log.type === '结算' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>{log.type}</span>
                            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 truncate">{log.date.split(' ')[0]}</span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 truncate">{log.details}</div>
                    </div>
                    <div className={`font-mono font-bold ${log.score > 0 ? 'text-green-500 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`}>+{log.score}</div>
                </div>))}
        </div>);
};
