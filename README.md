# BioHackOS (THU-BodyRefactor) v2.0 

**新增功能 ✨**
- 🌙 **暗色模式**: 支持系统级暗色主题，自动适配
- 📊 **数据可视化**: 积分趋势图、周统计卡片
- 🔔 **Toast 通知**: 现代化的通知系统
- 📱 **PWA 支持**: 可安装到手机主屏幕，支持离线使用
- 🎨 **UI 优化**: 全面的移动端体验优化

## 1. 项目哲学 (Philosophy)

BioHackOS 是一个专为理工科学生设计的**"生物机能重构系统"**。
它不是一个简单的卡路里计算器，而是一个基于规则的决策引擎。它承认人类意志力的有限性，通过随机算法（抽卡）、强制约束（特定日锁定）和游戏化反馈（积分系统），将健康管理降维成低认知负荷的"执行程序"。

**核心信条:**
*   **Data over Feeling**: 相信数据，而非感觉。
*   **System over Willpower**: 依赖系统，而非意志力。
*   **Local First**: 数据属于用户，存储在本地。

## 2. 技术栈 (Tech Stack)

*   **Framework**: React 18 + TypeScript
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS (Dark Mode Support)
*   **Icons**: Lucide React
*   **Persistence**: LocalStorage API (Custom Hook)
*   **Charts**: Recharts
*   **Notifications**: React Hot Toast
*   **PWA**: Vite Plugin PWA + Workbox

## 3. 核心功能 (Features)

### 营养子系统 (Nutrition)
*   **自动结算 (Auto-Settlement)**: 利用时间戳差值算法。用户无需手动"提交"，系统检测到日期变更自动结算昨日积分。
*   **失败标记 (Failure Mode)**: 允许标记某顿饭为"失败 (❌)"，该餐段积分归零，但这不会打断系统的连续性。
*   **双槽位引擎 (Dual-Slot Gacha)**: 午餐/晚餐独立随机，支持去重逻辑。
*   **强制锁定 (Hard Lock)**: 周五/周六自动锁定特定功能餐（内脏/深海鱼）。

### 训练子系统 (Training)
*   **极简记录**: 仅追踪三大项 (Bench, Squat, Pull)。
*   **状态持久化**: 自动记忆上次使用的重量，无需重复输入。
*   **积分挖掘**: 训练是获取系统货币 (Bio-Points) 的唯一主动途径。

### 数据可视化 (NEW ✨)
*   **积分趋势图**: 近14天积分变化曲线
*   **周统计卡片**: 当前积分、周获取积分、完美执行天数、周训练次数
*   **数据导出**: 支持导出 JSON 格式的完整日志

### 经济系统 (Tokenomics)
*   **收入**: 完美执行一顿饭 (+30 PTS), 完成一次训练 (+50 PTS)
*   **支出**: 热汤面 (-50 PTS), 1kg 酸奶 (-150 PTS), 麻辣香锅 (-500 PTS)

## 4. 安装与部署 (Deployment)

### 本地开发
\`\`\`bash
npm install
npm run dev
\`\`\`

### 生产构建
\`\`\`bash
npm run build
npm run preview
\`\`\`

### 部署到 Vercel
1. **推送代码到 GitHub**:
   \`\`\`bash
   git init
   git add .
   git commit -m "feat: BioHackOS v2.0 with PWA and dark mode"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   \`\`\`

2. **在 Vercel 部署**:
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - Import 你的 GitHub 仓库
   - Framework Preset 会自动检测为 `Vite`
   - 点击 Deploy

3. **部署成功后**，你会获得一个 URL (例如: `https://biohackos.vercel.app`)

### 手机端 PWA 安装 📱

#### iOS (Safari)
1. 在 Safari 中打开部署后的链接
2. 点击底部分享按钮 ⬆️
3. 选择 "添加到主屏幕"
4. 点击"添加"

#### Android (Chrome)
1. 在 Chrome 中打开部署后的链接
2. 点击右上角菜单 (三个点)
3. 选择 "安装应用" 或 "添加到主屏幕"
4. 点击"安装"

安装后，应用将以独立窗口运行，支持离线使用！

## 5. 后续迭代方向 (Roadmap)

### 已完成 ✅
- [x] v1.0: 工程化重构 (Vite + TS)
- [x] v1.1: 数据导出功能 (JSON)
- [x] v2.0: PWA 支持 + 暗色模式 + 数据可视化 + Toast 通知

### 计划中 📋
- [ ] v2.1: **库存管理功能** - 金枪鱼/牛奶剩余量监控
- [ ] v2.2: **提醒系统** - 补剂提醒、喝水提醒
- [ ] v2.3: **云端同步** - 可选的数据备份
- [ ] v2.4: **体重/体脂追踪** - 身体数据记录模块
- [ ] v2.5: **训练计划** - 渐进式超负荷建议

## 6. 开发者说明

### 项目结构
\`\`\`
src/
├── components/      # 可复用组件
│   ├── MealCard.tsx
│   ├── PointsChart.tsx
│   ├── StatsCard.tsx
│   └── TabButton.tsx
├── contexts/        # React Context
│   └── ThemeContext.tsx
├── data/            # 数据配置
│   └── meals.ts
├── hooks/           # 自定义 Hooks
│   ├── useAutoSettlement.ts
│   ├── usePersistentState.ts
│   └── useTheme.ts
├── pages/           # 页面组件
│   ├── EatTab.tsx
│   ├── StatsTab.tsx
│   └── TrainTab.tsx
├── types/           # TypeScript 类型
│   └── index.ts
├── utils/           # 工具函数
│   └── statsCalculator.ts
├── App.tsx          # 主应用
└── main.tsx         # 入口文件
\`\`\`

### 技术亮点
- **TypeScript 类型安全**: 完整的类型定义
- **自定义 Hooks**: `usePersistentState` 实现 LocalStorage 持久化
- **自动结算系统**: `useAutoSettlement` 实现跨日自动积分计算
- **主题系统**: Context API + LocalStorage 实现主题持久化
- **PWA 离线支持**: Service Worker + Workbox 缓存策略

## 7. License

MIT

---

**Made with 💪 by a THU Student**