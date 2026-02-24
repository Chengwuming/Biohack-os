import { Meal, Settings } from '../types';
import { MEAL_POOL } from '../data/meals';

export const getWeightedRandomMeal = (settings: Settings, excludeId?: string) => {
    let pool = [...MEAL_POOL];
    if (settings.useCustomData) {
        pool = [...pool, ...settings.customMeals];
    }
    pool = pool.filter(m => m.id !== excludeId);

    if (pool.length === 0) return null;

    const totalWeight = pool.reduce((acc, m) => acc + (m.weight || 1.0), 0);
    let random = Math.random() * totalWeight;
    for (let meal of pool) {
        const weight = meal.weight || 1.0;
        if (random < weight) return meal;
        random -= weight;
    }
    return pool[0];
};
