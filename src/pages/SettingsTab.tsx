import React, { useState } from 'react';
import { Settings, Download, Upload, RefreshCw, Eye, FileJson } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { MEAL_POOL, REWARD_MEALS } from '../data/meals';
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

    // Combine default and custom meals
    const allMeals = [...MEAL_POOL, ...settings.customMeals];
    const allRewards = [...REWARD_MEALS, ...settings.customRewards];

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
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <strong className="text-gray-700 dark:text-gray-300">使用步骤:</strong>
                    <ol className="list-decimal list-inside mt-1 space-y-1">
                        <li>下载模板文件</li>
                        <li>用文本编辑器打开并修改</li>
                        <li>导入修改后的JSON文件</li>
                        <li>开启"启用自定义数据"开关</li>
                    </ol>
                </div>
            </div>

            {/* Meal Pool Browser */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center">
                        <Eye size={18} className="mr-2" />
                        餐食池浏览器
                    </h3>
                    <button
                        onClick={() => setShowMealBrowser(!showMealBrowser)}
                        className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        {showMealBrowser ? '收起' : '展开'}
                    </button>
                </div>
                {showMealBrowser && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 px-2">
                            <span>共 {allMeals.length} 个餐食</span>
                            <span>自定义: {settings.customMeals.length}</span>
                        </div>
                        <div className="max-h-96 overflow-y-auto space-y-2">
                            {allMeals.map(meal => (
                                <div key={meal.id} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${meal.type === 'SSR' || meal.type === 'SSR_LOCK' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                                        meal.type === 'SR' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                                                            'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                    }`}>
                                                    {meal.type}
                                                </span>
                                                <span className="font-bold text-sm text-gray-800 dark:text-gray-100">{meal.title}</span>
                                                {meal.isCustom && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">自定义</span>}
                                                {meal.isSpecial && <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded">周{meal.specialDay}特殊</span>}
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                                                <div><span className="text-gray-400 dark:text-gray-500">主:</span> {meal.main}</div>
                                                <div><span className="text-gray-400 dark:text-gray-500">配:</span> {meal.side}</div>
                                                <div className="flex items-center space-x-3 mt-1 text-gray-500 dark:text-gray-400">
                                                    <span>{meal.protein}g蛋白</span>
                                                    <span>¥{meal.cost}</span>
                                                    <span>权重:{meal.weight}</span>
                                                    {meal.location && <span>{meal.location}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        {meal.isCustom && (
                                            <button
                                                onClick={() => deleteCustomMeal(meal.id)}
                                                className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 text-xs font-medium transition-colors"
                                            >
                                                删除
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Current Custom Data Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">当前自定义数据</h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                        <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{settings.customMeals.length}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">自定义餐食</div>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                        <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{settings.customRewards.length}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">自定义奖励</div>
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
                    <li><strong>pointsCost:</strong> 奖励所需积分</li>
                    <li><strong>cooldownDays:</strong> 奖励冷却天数</li>
                </ul>
            </div>
        </div>
    );
};
