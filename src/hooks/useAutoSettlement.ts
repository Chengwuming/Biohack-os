import { useEffect } from 'react';
import { DailyState, Log } from '../types';
import { SPECIAL_MEALS } from '../data/meals';

interface AutoSettlementProps {
    lastActiveDate: string;
    setLastActiveDate: (date: string) => void;
    dailyState: DailyState;
    setDailyState: (state: DailyState) => void;
    setPoints: (callback: (prev: number) => number) => void;
    setLogs: (callback: (prev: Log[]) => Log[]) => void;
    today: Date;
}

export function useAutoSettlement({
    lastActiveDate,
    setLastActiveDate,
    dailyState,
    setDailyState,
    setPoints,
    setLogs,
    today
}: AutoSettlementProps) {

    useEffect(() => {
        const currentStr = today.toLocaleDateString();

        // Check if day changed
        if (lastActiveDate !== currentStr) {
            settlePreviousDay(lastActiveDate, dailyState, setPoints, setLogs);

            // Reset for today
            const dayOfWeek = today.getDay();
            const isFri = dayOfWeek === 5;
            const isSat = dayOfWeek === 6;

            const newState: DailyState = {
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

function settlePreviousDay(
    dateStr: string,
    state: DailyState,
    setPoints: (cb: (p: number) => number) => void,
    setLogs: (cb: (l: Log[]) => Log[]) => void
) {
    let earnedPoints = 0;
    let details: string[] = [];

    if (state.lunch) {
        if (!state.lunchFailed) {
            earnedPoints += 30;
            details.push(`午: ${state.lunch.title}`);
        } else {
            details.push("午: ❌");
        }
    } else {
        details.push("午: 空");
    }

    if (state.dinner) {
        if (!state.dinnerFailed) {
            earnedPoints += 30;
            details.push(`晚: ${state.dinner.title}`);
        } else {
            details.push("晚: ❌");
        }
    } else {
        details.push("晚: 空");
    }

    if (earnedPoints > 0) {
        setPoints(p => p + earnedPoints);
        const newLog: Log = {
            date: dateStr,
            type: '结算',
            score: earnedPoints,
            details: details.join(' | ')
        };
        setLogs(prev => [newLog, ...prev]);
    }
}
