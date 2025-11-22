import { useEffect } from 'react';
import { SPECIAL_MEALS } from '../data/meals';
export function useAutoSettlement({ lastActiveDate, setLastActiveDate, dailyState, setDailyState, setPoints, setLogs, today }) {
    useEffect(() => {
        const currentStr = today.toLocaleDateString();
        // Check if day changed
        if (lastActiveDate !== currentStr) {
            settlePreviousDay(lastActiveDate, dailyState, setPoints, setLogs);
            // Reset for today
            const dayOfWeek = today.getDay();
            const isFri = dayOfWeek === 5;
            const isSat = dayOfWeek === 6;
            const newState = {
                lunch: isFri ? SPECIAL_MEALS.liver : isSat ? SPECIAL_MEALS.fish : null,
                dinner: null,
                lunchPatch: null, dinnerPatch: null,
                lunchFailed: false, dinnerFailed: false
            };
            setDailyState(newState);
            setLastActiveDate(currentStr);
        }
    }, [today, lastActiveDate, dailyState, setDailyState, setLastActiveDate, setPoints, setLogs]);
}
function settlePreviousDay(dateStr, state, setPoints, setLogs) {
    let earnedPoints = 0;
    let details = [];
    if (state.lunch) {
        if (!state.lunchFailed) {
            earnedPoints += 30;
            details.push(`午: ${state.lunch.title}`);
        }
        else {
            details.push("午: ❌");
        }
    }
    else {
        details.push("午: 空");
    }
    if (state.dinner) {
        if (!state.dinnerFailed) {
            earnedPoints += 30;
            details.push(`晚: ${state.dinner.title}`);
        }
        else {
            details.push("晚: ❌");
        }
    }
    else {
        details.push("晚: 空");
    }
    if (earnedPoints > 0) {
        setPoints(p => p + earnedPoints);
        const newLog = {
            date: dateStr,
            type: '结算',
            score: earnedPoints,
            details: details.join(' | ')
        };
        setLogs(prev => [newLog, ...prev]);
    }
}
