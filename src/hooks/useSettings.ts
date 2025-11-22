import { useState, useEffect } from 'react';
import { Settings, CustomMeal, CustomReward, CustomPatch, CustomFixedModule } from '../types';

const DEFAULT_SETTINGS: Settings = {
    customMeals: [],
    customRewards: [],
    customPatches: [],
    customFixedModules: [],
    useCustomData: false
};

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const stored = localStorage.getItem('thu_settings');
            return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
        } catch (e) {
            console.error('Failed to load settings', e);
            return DEFAULT_SETTINGS;
        }
    });

    useEffect(() => {
        localStorage.setItem('thu_settings', JSON.stringify(settings));
    }, [settings]);

    const addCustomMeal = (meal: CustomMeal) => {
        setSettings(prev => ({
            ...prev,
            customMeals: [...prev.customMeals, meal]
        }));
    };

    const updateCustomMeal = (id: string, meal: CustomMeal) => {
        setSettings(prev => ({
            ...prev,
            customMeals: prev.customMeals.map(m => m.id === id ? meal : m)
        }));
    };

    const deleteCustomMeal = (id: string) => {
        setSettings(prev => ({
            ...prev,
            customMeals: prev.customMeals.filter(m => m.id !== id)
        }));
    };

    const addCustomReward = (reward: CustomReward) => {
        setSettings(prev => ({
            ...prev,
            customRewards: [...prev.customRewards, reward]
        }));
    };

    const updateCustomReward = (id: string, reward: CustomReward) => {
        setSettings(prev => ({
            ...prev,
            customRewards: prev.customRewards.map(r => r.id === id ? reward : r)
        }));
    };

    const deleteCustomReward = (id: string) => {
        setSettings(prev => ({
            ...prev,
            customRewards: prev.customRewards.filter(r => r.id !== id)
        }));
    };

    const addCustomPatch = (patch: CustomPatch) => {
        setSettings(prev => ({
            ...prev,
            customPatches: [...prev.customPatches, patch]
        }));
    };

    const updateCustomPatch = (id: string, patch: CustomPatch) => {
        setSettings(prev => ({
            ...prev,
            customPatches: prev.customPatches.map(p => p.id === id ? patch : p)
        }));
    };

    const deleteCustomPatch = (id: string) => {
        setSettings(prev => ({
            ...prev,
            customPatches: prev.customPatches.filter(p => p.id !== id)
        }));
    };

    const addCustomFixedModule = (module: CustomFixedModule) => {
        setSettings(prev => ({
            ...prev,
            customFixedModules: [...prev.customFixedModules, module]
        }));
    };

    const updateCustomFixedModule = (id: string, module: CustomFixedModule) => {
        setSettings(prev => ({
            ...prev,
            customFixedModules: prev.customFixedModules.map(m => m.id === id ? module : m)
        }));
    };

    const deleteCustomFixedModule = (id: string) => {
        setSettings(prev => ({
            ...prev,
            customFixedModules: prev.customFixedModules.filter(m => m.id !== id)
        }));
    };

    const toggleUseCustomData = () => {
        setSettings(prev => ({
            ...prev,
            useCustomData: !prev.useCustomData
        }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    const exportSettings = () => {
        const jsonString = JSON.stringify(settings, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `biohack_settings_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const importSettings = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target?.result as string);
                setSettings(imported);
            } catch (error) {
                console.error('Failed to import settings', error);
                alert('导入失败：文件格式不正确');
            }
        };
        reader.readAsText(file);
    };

    return {
        settings,
        addCustomMeal,
        updateCustomMeal,
        deleteCustomMeal,
        addCustomReward,
        updateCustomReward,
        deleteCustomReward,
        addCustomPatch,
        updateCustomPatch,
        deleteCustomPatch,
        addCustomFixedModule,
        updateCustomFixedModule,
        deleteCustomFixedModule,
        toggleUseCustomData,
        resetSettings,
        exportSettings,
        importSettings
    };
}
