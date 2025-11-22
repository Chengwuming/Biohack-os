export type MealType = 'SR' | 'R_FLAVOR' | 'R_CARB' | 'SSR_LOCK' | 'UR_DORM' | 'REWARD';

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
}

export interface Patch {
    id: string;
    name: string;
    content: string;
    cost: number;
    protein: number;
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
}
