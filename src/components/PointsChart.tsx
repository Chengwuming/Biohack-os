import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyData } from '../utils/statsCalculator';

interface PointsChartProps {
    data: DailyData[];
}

export const PointsChart: React.FC<PointsChartProps> = ({ data }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 text-sm">积分趋势 (近14天)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        stroke="#d1d5db"
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: '#9ca3af' }}
                        stroke="#d1d5db"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            fontSize: '12px'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="points"
                        stroke="#4f46e5"
                        fillOpacity={1}
                        fill="url(#colorPoints)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
