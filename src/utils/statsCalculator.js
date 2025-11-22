/**
 * Calculate statistics for the last 7 days
 */
export function calculateWeeklyStats(logs) {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentLogs = logs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= sevenDaysAgo;
    });
    const stats = {
        totalPoints: 0,
        totalProtein: 0,
        perfectDays: 0,
        trainingCount: 0
    };
    recentLogs.forEach(log => {
        stats.totalPoints += log.score;
        if (log.type === '训练') {
            stats.trainingCount++;
        }
        if (log.type === '结算' && log.score === 60) {
            stats.perfectDays++;
        }
    });
    return stats;
}
/**
 * Get daily points data for chart
 */
export function getDailyChartData(logs, days = 14) {
    const now = new Date();
    const dateMap = new Map();
    // Initialize last N days
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
        dateMap.set(dateStr, 0);
    }
    // Aggregate points by date
    logs.forEach(log => {
        const logDate = new Date(log.date);
        const dateStr = logDate.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
        if (dateMap.has(dateStr)) {
            dateMap.set(dateStr, (dateMap.get(dateStr) || 0) + log.score);
        }
    });
    // Convert to array
    return Array.from(dateMap.entries()).map(([date, points]) => ({
        date,
        points
    }));
}
