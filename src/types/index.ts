export type MealType = 'SSR' | 'SR' | 'R_FLAVOR' | 'R_CARB' | 'SSR_LOCK' | 'UR_DORM' | 'REWARD';

export interface Meal {
    id: string;
    type: MealType;
    title: string;
    main?: string;
    side?: string;
    location?: string;
    cost: number;
    protein?: number; // Some rewards might not track protein
    weight?: number; // For random pool
    tags: string[];
    tips: string;
    patchRequired?: boolean;
    pointsCost?: number; // For rewards
    cooldownDays?: number; // For rewards
    // Custom meal fields
    isSpecial?: boolean; // 是否为特殊餐
    specialDay?: number; // 0-6 (周日-周六)，仅当 isSpecial 为 true
    isCustom?: boolean; // 标记为自定义餐食
}

export interface Patch {
    id: string;
    name: string;
    content: string;
    cost: number;
    protein: number;
    isCustom?: boolean;
}

export interface Log {
    date: string;
    type: '训练' | '结算' | '系统';
    score: number;
    details: string;
}

export interface WorkoutWeights {
    bench: number;
    squat: number;
    pull: number;
}

export interface DailyState {
    lunch: Meal | null;
    dinner: Meal | null;
    lunchPatch: Patch | null;
    dinnerPatch: Patch | null;
    lunchFailed: boolean;
    dinnerFailed: boolean;
}

export interface FixedModule {
    title: string;
    items: string[];
    cost: number;
    protein: number;
    tips: string;
    isCustom?: boolean;
}

// Settings types
export interface CustomMeal extends Meal {
    isCustom: true;
}

export interface CustomReward extends Meal {
    type: 'REWARD';
    isCustom: true;
}

export interface CustomPatch extends Patch {
    isCustom: true;
}

export interface CustomFixedModule extends FixedModule {
    id: string;
    isCustom: true;
}

export interface Settings {
    customMeals: CustomMeal[];
    customRewards: CustomReward[];
    customPatches: CustomPatch[];
    customFixedModules: CustomFixedModule[];
    useCustomData: boolean; // 是否启用自定义数据
}
