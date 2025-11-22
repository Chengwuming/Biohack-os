import { Meal, Patch, FixedModule } from '../types';

export const FIXED_MODULES: Record<string, FixedModule> = {
    BREAKFAST: {
        title: "固定: 早餐标准件",
        items: ["煮鸡蛋 × 4", "散豆浆", "拌豆腐"],
        cost: 2.6,
        protein: 32,
        tips: "美好的一天从0.5元的鸡蛋开始"
    },
    SUPPLEMENTS: {
        title: "固定: 生物补剂",
        items: ["锌(10mg)", "D3", "牛奶(早晚)", "南瓜子"],
        cost: 3.5,
        protein: 14,
        tips: "微量元素的护城河"
    }
};

export const PATCHES: Patch[] = [
    { id: 'p1', name: "紫荆补丁", content: "去紫荆买2两酱鸡胗", cost: 5.0, protein: 18 },
    { id: 'p2', name: "宿舍补丁", content: "回宿舍开半罐金枪鱼", cost: 3.4, protein: 15 },
    { id: 'p3', name: "极简补丁", content: "原地喝一盒牛奶", cost: 1.7, protein: 7 },
    { id: 'p4', name: "穷鬼补丁", content: "加2个煮鸡蛋拌饭", cost: 1.0, protein: 14 },
];

export const DORM_MEAL: Meal = {
    id: 'ur_dorm', type: 'UR_DORM', title: "宿舍生存协议",
    main: "金枪鱼罐头 (整罐)", side: "燕麦片 / 馒头",
    location: "宿舍", cost: 8.0, protein: 32,
    tags: ["社恐", "暴雨", "极高蛋白"], tips: "适合不想出门的日子。", patchRequired: false
};

export const REWARD_MEALS: Meal[] = [
    {
        id: 'reward_noodle',
        title: "热汤面 (安慰剂)",
        cost: 10, pointsCost: 50, cooldownDays: 3, type: 'REWARD',
        tags: ["高钠", "暖胃"],
        tips: "不健康但快乐。建议加个蛋。"
    },
    {
        id: 'reward_yogurt',
        title: "1kg 酸奶桶 (液体炸弹)",
        cost: 16, pointsCost: 150, cooldownDays: 7, type: 'REWARD',
        tags: ["高碳水", "练后限定"],
        tips: "练完腿来一桶，直接合成肌糖原。"
    },
    {
        id: 'reward_fried_rice',
        title: "炒饭/炒面 (碳水快乐)",
        cost: 12, pointsCost: 200, cooldownDays: 14, type: 'REWARD',
        tags: ["高升糖", "老干妈"],
        tips: "偶尔吃顿低蛋白的垃圾食品，是为了心理健康。"
    },
    {
        id: 'reward_hotpot',
        title: "麻辣香锅 (欺骗餐)",
        cost: 25, pointsCost: 500, cooldownDays: 30, type: 'REWARD',
        tags: ["高油", "月度奖励"],
        tips: "去油协议：别吃碗底，多喝水。"
    },
    {
        id: 'reward_fish',
        title: "酸菜鱼 (欺骗餐)",
        cost: 30, pointsCost: 500, cooldownDays: 30, type: 'REWARD',
        tags: ["高钠", "月度奖励"],
        tips: "别喝汤！汤里全是嘌呤和盐。"
    }
];

export const MEAL_POOL: Meal[] = [
    // SR: 极高性价比
    {
        id: 'sr_poor_guy', type: 'SR', weight: 1.2,
        title: "紫荆穷鬼套餐", main: "双拼半份荤菜", side: "2两米饭",
        location: "紫荆园", cost: 6.45, protein: 24,
        tags: ["神级性价比", "多样性"], tips: "6元吃两个菜，清华食堂的良心。", patchRequired: false
    },
    {
        id: 'sr_duck', type: 'SR', weight: 1.0,
        title: "标准鸭腿饭", main: "烤鸭腿 (带皮)", side: "半份白菜豆腐 + 杂粮粥",
        location: "听涛/紫荆", cost: 8.5, protein: 33,
        tags: ["快乐"], tips: "吃了皮就要多跑 5km。", patchRequired: false
    },
    {
        id: 'sr_chicken', type: 'SR', weight: 1.0,
        title: "标准鸡腿饭", main: "大卤鸡腿/炸鸡腿", side: "素炒芹菜叶 + 米饭",
        location: "听涛/紫荆", cost: 7.0, protein: 30,
        tags: ["稳健"], tips: "若炸鸡腿油太大，记得剥皮。", patchRequired: false
    },
    // R: 风味/低蛋白
    {
        id: 'r_pork_chop', type: 'R_FLAVOR', weight: 0.3,
        title: "炸猪排饭", main: "炸猪排", side: "米饭",
        location: "各食堂", cost: 10.0, protein: 18,
        tags: ["油炸", "一般"], tips: "面粉有点多，建议补个蛋。", patchRequired: true
    },
    {
        id: 'r_dumpling', type: 'R_CARB', weight: 0.2,
        title: "北方碳水快乐餐", main: "猪肉饺子 (18个)", side: "无",
        location: "各食堂", cost: 5.0, protein: 12,
        tags: ["需补丁"], tips: "警告：蛋白不足！必须挂载补丁。", patchRequired: true
    },
    {
        id: 'r_mix', type: 'R_FLAVOR', weight: 0.3,
        title: "风味拌饭 (去油版)", main: "烤肉拌饭", side: "记得喝水",
        location: "紫荆园", cost: 12.0, protein: 20,
        tags: ["解馋"], tips: "别吃碗底最后2cm的油饭。", patchRequired: true
    }
];

export const SPECIAL_MEALS: Record<string, Meal> = {
    liver: {
        id: 'ssr_liver', type: 'SSR_LOCK',
        title: "内脏功能餐 (钢铁侠)", main: "酱鸭肝 (2两)", side: "醋溜白菜 + 米饭",
        location: "听涛园", cost: 9.0, protein: 30,
        tags: ["补铁", "维A", "周五强制"], tips: "系统强制锁定。", patchRequired: false, weight: 0
    },
    fish: {
        id: 'ssr_fish', type: 'SSR_LOCK',
        title: "深海进化餐 (Omega-3)", main: "蒜子烧鲅鱼 (3两)", side: "清炒油麦菜 + 米饭",
        location: "紫荆园", cost: 10.5, protein: 28,
        tags: ["补脑", "抗炎", "周六强制"], tips: "系统强制锁定。", patchRequired: false, weight: 0
    }
};
