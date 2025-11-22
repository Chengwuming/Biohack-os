import React, { useState } from 'react';
import { Settings, Download, Upload, RefreshCw, Eye, FileJson, ChevronDown, ChevronRight, Lock, Star, Zap, Coffee } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { MEAL_POOL, REWARD_MEALS, SPECIAL_MEALS } from '../data/meals';
import { Meal } from '../types';
import toast from 'react-hot-toast';

export const SettingsTab: React.FC = () => {
    const {
        settings,
        deleteCustomMeal,
        deleteCustomReward,
        toggleUseCustomData,
        resetSettings,
        exportSettings,
        importSettings
    } = useSettings();

    const [showMealBrowser, setShowMealBrowser] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>('SSR');

    const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            importSettings(file);
            toast.success('✅ 配置导入成功！');
            e.target.value = ''; // Reset input
        }
    };

    const handleExport = () => {
        exportSettings();
        toast.success('✅ 配置导出成功！');
    };

    const handleReset = () => {
        if (window.confirm('确定要重置所有自定义设置吗？此操作不可撤销！')) {
            resetSettings();
            toast.success('✅ 设置已重置');
        }
    };

    const downloadTemplate = () => {
        const template = {
            customMeals: [
                {
                    id: "custom_meal_example",
                    type: "SSR",
                    title: "示例餐食",
                    main: "主食内容",
                    side: "配菜内容",
                    location: "食堂名称",
                    cost: 10,
                    protein: 30,
                    weight: 1.0,
                    tags: ["标签1", "标签2"],
                    tips: "提示信息",
                    isCustom: true,
                    isSpecial: false,
                    specialDay: 0
                }
            ],
            customRewards: [
                {
                    id: "custom_reward_example",
                    type: "REWARD",
                    title: "示例奖励",
                    cost: 20,
                    pointsCost: 100,
                    cooldownDays: 7,
                    tags: ["奖励"],
                    tips: "奖励说明",
                    isCustom: true
                }
            ],
            customPatches: [],
            customFixedModules: [],
            useCustomData: false
        };

        const jsonString = JSON.stringify(template, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'biohack_template.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('📄 模板已下载');
    };

    // Combine and Group Meals
    const allMeals = [...Object.values(SPECIAL_MEALS), ...MEAL_POOL, ...settings.customMeals];

    const groupedMeals = {
        'SPECIAL': allMeals.filter(m => m.type === 'SSR_LOCK' || m.isSpecial),
        'SSR': allMeals.filter(m => m.type === 'SSR' && !m.isSpecial),
        'SR': allMeals.filter(m => m.type === 'SR'),
        'R': allMeals.filter(m => m.type.startsWith('R_')),
    };

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const renderMealCard = (meal: Meal) => {
        const isSSR = meal.type === 'SSR' || meal.type === 'SSR_LOCK';
        const isSR = meal.type === 'SR';
        const isR = meal.type.startsWith('R_');
        const isLock = meal.type === 'SSR_LOCK' || meal.isSpecial;

        const borderColor = isLock ? 'border-gray-400 dark:border-gray-500' :
            isSSR ? 'border-yellow-400 dark:border-yellow-500' :
                isSR ? 'border-purple-400 dark:border-purple-500' :
                    'border-blue-400 dark:border-blue-500';

        const bgGradient = isLock ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900' :
            isSSR ? 'bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-900/20 dark:to-yellow-900/10' :
                isSR ? 'bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-900/10' :
                    'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10';

        return (
            <div key={meal.id} className={`relative p-3 rounded-xl border-l-4 shadow-sm ${borderColor} ${bgGradient} mb-2`}>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                            {isLock && <Lock size={14} className="text-gray-500" />}
                            {isSSR && !isLock && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                            {isSR && <Zap size={14} className="text-purple-500 fill-purple-500" />}
                            {isR && <Coffee size={14} className="text-blue-500" />}

                            <span className="font-bold text-gray-800 dark:text-gray-100">{meal.title}</span>

                            {meal.isCustom && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded border border-green-200 dark:border-green-800">
                                    自定义
                                </span>
                            )}
                        </div>

                        <div className="text-xs text-gray-600 dark:text-gray-300 space-y-0.5 pl-6">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">{meal.main}</span>
                                <span className="text-gray-300 dark:text-gray-600">|</span>
                                <span className="text-gray-500 dark:text-gray-400">{meal.side}</span>
                            </div>
                            <div className="flex items-center space-x-3 mt-1.5 text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                                <span className="bg-white/50 dark:bg-black/20 px-1 rounded">PRO: {meal.protein}g</span>
                                <span className="bg-white/50 dark:bg-black/20 px-1 rounded">¥{meal.cost}</span>
                                {!isLock && <span className="bg-white/50 dark:bg-black/20 px-1 rounded">权重: {meal.weight || 1.0}</span>}
                            </div>
                        </div>
                    </div>

                    {meal.isCustom && (
                        <button
                            onClick={() => deleteCustomMeal(meal.id)}
                            className="ml-2 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                            <span className="text-xs font-bold">删除</span>
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 pb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-black flex items-center">
                    <Settings className="mr-2" size={24} />
                    自定义设置
                </h2>
                <p className="text-sm opacity-90 mt-1">通过JSON配置文件管理你的餐食池和奖励</p>
            </div>

            {/* Toggle Custom Data */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100">启用自定义数据</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">开启后，将使用你导入的自定义餐食和奖励</p>
                    </div>
                    <button
                        onClick={toggleUseCustomData}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${settings.useCustomData ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                    >
                        <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${settings.useCustomData ? 'translate-x-7' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* JSON Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                    <FileJson size={18} className="mr-2 text-indigo-600 dark:text-indigo-400" />
                    JSON 配置管理
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={downloadTemplate}
                        className="flex items-center justify-center py-2.5 px-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors text-sm font-medium border border-indigo-200 dark:border-indigo-800"
                    >
                        <Download size={16} className="mr-1.5" />
                        下载模板
                    </button>
                    <label className="flex items-center justify-center py-2.5 px-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm font-medium cursor-pointer border border-green-200 dark:border-green-800">
                        <Upload size={16} className="mr-1.5" />
                        导入配置
                        <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
                    </label>
                    <button
                        onClick={handleExport}
                        className="flex items-center justify-center py-2.5 px-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm font-medium border border-blue-200 dark:border-blue-800"
                    >
                        <Download size={16} className="mr-1.5" />
                        导出当前
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex items-center justify-center py-2.5 px-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium border border-red-200 dark:border-red-800"
                    >
                        <RefreshCw size={16} className="mr-1.5" />
                        重置全部
                    </button>
                </div>
            </div>

            {/* Meal Pool Browser (Accordion) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center">
                        <Eye size={18} className="mr-2" />
                        餐食池预览
                    </h3>
                    <span className="text-xs text-gray-400">共 {allMeals.length} 个餐食</span>
                </div>

                <div className="space-y-2">
                    {/* Special Meals */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('SPECIAL')}
                            className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="flex items-center space-x-2">
                                <Lock size={16} className="text-gray-500" />
                                <span className="font-bold text-sm text-gray-700 dark:text-gray-200">特殊/锁定池</span>
                                <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-1.5 rounded-full">{groupedMeals.SPECIAL.length}</span>
                            </div>
                            {expandedSection === 'SPECIAL' ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                        {expandedSection === 'SPECIAL' && (
                            <div className="p-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                                {groupedMeals.SPECIAL.map(renderMealCard)}
                            </div>
                        )}
                    </div>

                    {/* SSR Meals */}
                    <div className="border border-yellow-200 dark:border-yellow-900/50 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('SSR')}
                            className="w-full flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                        >
                            <div className="flex items-center space-x-2">
                                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-bold text-sm text-yellow-800 dark:text-yellow-400">SSR 传说池</span>
                                <span className="text-xs bg-yellow-200 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 px-1.5 rounded-full">{groupedMeals.SSR.length}</span>
                            </div>
                            {expandedSection === 'SSR' ? <ChevronDown size={16} className="text-yellow-600" /> : <ChevronRight size={16} className="text-yellow-600" />}
                        </button>
                        {expandedSection === 'SSR' && (
                            <div className="p-2 bg-white dark:bg-gray-800 border-t border-yellow-100 dark:border-yellow-900/30">
                                {groupedMeals.SSR.map(renderMealCard)}
                            </div>
                        )}
                    </div>

                    {/* SR Meals */}
                    <div className="border border-purple-200 dark:border-purple-900/50 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('SR')}
                            className="w-full flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                            <div className="flex items-center space-x-2">
                                <Zap size={16} className="text-purple-500 fill-purple-500" />
                                <span className="font-bold text-sm text-purple-800 dark:text-purple-400">SR 史诗池</span>
                                <span className="text-xs bg-purple-200 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 px-1.5 rounded-full">{groupedMeals.SR.length}</span>
                            </div>
                            {expandedSection === 'SR' ? <ChevronDown size={16} className="text-purple-600" /> : <ChevronRight size={16} className="text-purple-600" />}
                        </button>
                        {expandedSection === 'SR' && (
                            <div className="p-2 bg-white dark:bg-gray-800 border-t border-purple-100 dark:border-purple-900/30">
                                {groupedMeals.SR.map(renderMealCard)}
                            </div>
                        )}
                    </div>

                    {/* R Meals */}
                    <div className="border border-blue-200 dark:border-blue-900/50 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleSection('R')}
                            className="w-full flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <div className="flex items-center space-x-2">
                                <Coffee size={16} className="text-blue-500" />
                                <span className="font-bold text-sm text-blue-800 dark:text-blue-400">R 稀有池</span>
                                <span className="text-xs bg-blue-200 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-1.5 rounded-full">{groupedMeals.R.length}</span>
                            </div>
                            {expandedSection === 'R' ? <ChevronDown size={16} className="text-blue-600" /> : <ChevronRight size={16} className="text-blue-600" />}
                        </button>
                        {expandedSection === 'R' && (
                            <div className="p-2 bg-white dark:bg-gray-800 border-t border-blue-100 dark:border-blue-900/30">
                                {groupedMeals.R.map(renderMealCard)}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">💡 配置说明</h4>
                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1.5">
                    <li><strong>type:</strong> SSR/SR/R_FLAVOR/R_CARB (餐食等级)</li>
                    <li><strong>weight:</strong> 0.1-2.0 (出现概率，1.0为基准)</li>
                    <li><strong>isSpecial:</strong> true 时为特殊餐</li>
                    <li><strong>specialDay:</strong> 0-6 (周日到周六，仅特殊餐需要)</li>
                </ul>
            </div>
        </div>
    );
};
