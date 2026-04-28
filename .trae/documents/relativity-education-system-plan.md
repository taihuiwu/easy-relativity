# 相对论教育展示系统 - 实施计划

## 项目概述

开发一个面向高中生的相对论教育展示系统，包含狭义相对论和广义相对论的完整教学内容，配合 3D 可视化动画演示。

## 目标用户

- 中国高中生（16-18岁）
- 物理基础：高中物理必修知识
- 从零开始学习相对论概念

## 核心功能需求

### 1. 教学内容结构（线性章节）

#### 第一部分：狭义相对论
- **第1章：光速的奥秘**
  - 光速不变原理
  - 迈克尔逊-莫雷实验简介
  - 3D场景：光速飞船场景

- **第2章：时间的魔法**
  - 时间膨胀效应
  - 双生子佯谬
  - 生活化比喻：运动的时钟走得慢
  - 交互：调节飞船速度观察时间变化

- **第3章：空间的变形**
  - 长度收缩效应
  - 洛伦兹变换入门
  - 交互：观察不同速度下的长度变化

- **第4章：质能方程**
  - E=mc² 的含义
  - 核能应用
  - 交互：质量-能量转换计算器

#### 第二部分：广义相对论
- **第5章：等效原理**
  - 加速度与引力的等效
  - 电梯思想实验
  - 生活化比喻：电梯里的苹果

- **第6章：时空弯曲**
  - 质量弯曲时空
  - 3D场景：时空弯曲网格
  - 交互：放置不同质量物体观察弯曲程度

- **第7章：引力透镜**
  - 光线弯曲现象
  - 3D场景：引力透镜效果
  - 实际天文观测案例

- **第8章：黑洞探秘**
  - 黑洞的形成
  - 事件视界
  - 3D场景：黑洞可视化
  - 时间冻结效应

### 2. 3D 可视化场景

| 场景 | 技术实现 | 交互方式 |
|------|----------|----------|
| 光速飞船 | Three.js 粒子系统 + 后处理 | 速度滑块调节 |
| 时空弯曲网格 | Three.js 网格变形 Shader | 拖拽质量球体 |
| 引力透镜 | Three.js 后处理扭曲效果 | 调节天体质量 |
| 黑洞 | Three.js 粒子吸积盘 + Shader | 观察者位置调节 |

### 3. 交互功能

- **参数调节器**：每个场景提供直观的参数控制面板
- **小测验/练习**：每章结束后的知识点检测（选择题、判断题）
- **学习进度保存**：LocalStorage 存储进度，支持断点续学
- **生活化比喻解释**：每个概念配有通俗易懂的类比说明

### 4. 部署方式

- **Web 应用**：React SPA，可部署到 Vercel/Netlify
- **Electron 桌面应用**：打包为 Windows/macOS/Linux 可执行文件

## 技术架构

### 前端技术栈

```
React 18 + TypeScript
├── Vite (构建工具)
├── Tailwind CSS (样式)
├── shadcn/ui (UI组件库)
├── Three.js (3D渲染)
│   ├── @react-three/fiber (React封装)
│   ├── @react-three/drei (辅助工具)
│   └── @react-three/postprocessing (后处理)
├── Framer Motion (动画)
├── Zustand (状态管理)
└── React Router (路由)
```

### 项目结构

```
relativity-edu/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui 组件
│   │   ├── layout/                # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── chapter/               # 章节组件
│   │   │   ├── ChapterNav.tsx
│   │   │   ├── ChapterContent.tsx
│   │   │   └── Quiz.tsx
│   │   └── common/                # 通用组件
│   │       ├── ParameterSlider.tsx
│   │       ├── ProgressBar.tsx
│   │       └── AnalogyBox.tsx
│   ├── scenes/                    # 3D场景
│   │   ├── LightSpeedShip.tsx
│   │   ├── SpacetimeCurvature.tsx
│   │   ├── GravitationalLens.tsx
│   │   └── BlackHole.tsx
│   ├── pages/                     # 页面
│   │   ├── Home.tsx
│   │   ├── Chapter.tsx
│   │   └── Progress.tsx
│   ├── store/                     # 状态管理
│   │   ├── progressStore.ts
│   │   └── settingsStore.ts
│   ├── data/                      # 教学内容
│   │   ├── chapters/
│   │   │   ├── chapter1.ts
│   │   │   └── ...
│   │   └── quizzes/
│   │       ├── quiz1.ts
│   │       └── ...
│   ├── hooks/                     # 自定义Hooks
│   │   ├── useProgress.ts
│   │   └── useThreeScene.ts
│   ├── lib/                       # 工具函数
│   │   ├── storage.ts
│   │   └── physics.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── models/                    # 3D模型资源
├── electron/                      # Electron配置
│   ├── main.ts
│   └── preload.ts
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 实施步骤

### 阶段一：项目初始化（第1步）
1. 使用 web-artifacts-builder 初始化 React 项目
2. 配置 Three.js 相关依赖
3. 设置 Tailwind CSS 和 shadcn/ui
4. 配置项目路由

### 阶段二：基础架构（第2-3步）
2. 创建布局组件（Header、Sidebar、Footer）
3. 实现章节导航系统
4. 设置状态管理（Zustand）
5. 实现进度保存功能（LocalStorage）

### 阶段三：3D场景开发（第4-7步）
4. 开发光速飞船场景（Three.js粒子系统）
5. 开发时空弯曲网格场景（Shader变形）
6. 开发引力透镜效果（后处理扭曲）
7. 开发黑洞可视化场景（吸积盘+事件视界）

### 阶段四：教学内容（第8-9步）
8. 编写8章教学内容数据
9. 创建每章的小测验

### 阶段五：交互功能（第10步）
10. 实现参数调节器组件
11. 实现测验系统
12. 添加生活化比喻解释组件

### 阶段六：打包部署（第11步）
11. Web版本打包测试
12. Electron桌面应用配置
13. 多平台打包脚本

## 关键技术决策

### 1. 3D渲染方案
- **选择**：Three.js + React Three Fiber
- **原因**：React生态成熟，组件化开发，性能优秀

### 2. 状态管理
- **选择**：Zustand
- **原因**：轻量级，TypeScript友好，适合中小型应用

### 3. 动画方案
- **选择**：Framer Motion
- **原因**：声明式API，与React集成良好

### 4. 进度存储
- **选择**：LocalStorage
- **原因**：无需后端，离线可用，适合学习进度

## 验收标准

1. **功能完整性**
   - 8个章节内容完整呈现
   - 4个3D场景可正常交互
   - 测验系统正常工作
   - 进度保存/恢复功能正常

2. **用户体验**
   - 页面加载时间 < 3秒
   - 3D场景帧率 > 30fps
   - 界面响应流畅
   - 中文界面完整无误

3. **兼容性**
   - Chrome/Firefox/Safari 最新版
   - Electron 支持 Windows/macOS/Linux

## 文件清单

### 需要创建的核心文件

1. **配置文件**
   - `package.json` - 项目依赖配置
   - `vite.config.ts` - Vite构建配置
   - `tailwind.config.js` - Tailwind配置
   - `tsconfig.json` - TypeScript配置

2. **入口文件**
   - `index.html` - HTML入口
   - `src/main.tsx` - React入口
   - `src/App.tsx` - 应用根组件

3. **布局组件**
   - `src/components/layout/Header.tsx`
   - `src/components/layout/Sidebar.tsx`
   - `src/components/layout/Footer.tsx`

4. **3D场景**
   - `src/scenes/LightSpeedShip.tsx`
   - `src/scenes/SpacetimeCurvature.tsx`
   - `src/scenes/GravitationalLens.tsx`
   - `src/scenes/BlackHole.tsx`

5. **页面组件**
   - `src/pages/Home.tsx`
   - `src/pages/Chapter.tsx`
   - `src/pages/Progress.tsx`

6. **状态管理**
   - `src/store/progressStore.ts`
   - `src/store/settingsStore.ts`

7. **教学内容数据**
   - `src/data/chapters/chapter1-8.ts`
   - `src/data/quizzes/quiz1-8.ts`

8. **Electron配置**
   - `electron/main.ts`
   - `electron/preload.ts`

## 风险与缓解

| 风险 | 缓解措施 |
|------|----------|
| 3D场景性能问题 | 使用LOD、实例化渲染、限制粒子数量 |
| 教学内容准确性 | 参考权威教材，添加免责声明 |
| 浏览器兼容性 | 提供WebGL降级方案 |
| 打包体积过大 | 代码分割、懒加载、资源压缩 |
