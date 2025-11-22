import { useState, useEffect } from 'react';
export function usePersistentState(key, initialValue) {
    const [state, setState] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        }
        catch (e) {
            console.error("Failed to load state", e);
            return initialValue;
        }
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
}
