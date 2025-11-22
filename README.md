# BioHackOS (THU-BodyRefactor)

BioHackOS 是一个专为理工科学生设计的**"生物机能重构系统"**。它将健康管理降维成低认知负荷的"执行程序"，通过随机算法、强制约束和游戏化反馈，帮助用户建立稳定的饮食和训练习惯。

## ✨ 核心功能

*   **🎲 随机餐食引擎**: 解决"吃什么"的决策疲劳，支持 SSR/SR/R 等级分类与权重配置。
*   **🔒 强制锁定机制**: 周五/周六自动锁定特定功能餐（内脏/深海鱼），确保微量元素摄入。
*   **🏋️ 极简训练追踪**: 专注于三大项 (Bench, Squat, Pull) 的重量记录与渐进负荷。
*   **💰 积分经济系统**: 完美执行获得积分，违规扣分，积分可用于兑换"放纵餐"。
*   **📊 数据可视化**: 内置积分趋势图与周统计，直观展示执行情况。
*   **⚙️ 高度可配置**: 支持 JSON 导入/导出，自定义餐食池、奖励和补丁。
*   **📱 PWA 支持**: 可安装至手机桌面，支持离线使用与暗色模式。

## 🛠️ 技术栈

*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **State Management**: React Hooks + LocalStorage (Local-First)
*   **PWA**: Vite Plugin PWA

## 🚀 快速开始

### 本地开发

```bash
npm install
npm run dev
```

### 构建部署

```bash
npm run build
```

本项目配置为可直接部署至 [Vercel](https://vercel.com)。

## 📄 License

MIT

---

**Made with 💪 by a THU Student**