# 相对论探索之旅 🚀

面向高中生的相对论教育展示系统，通过精美的 3D 动画和生动的比喻，让你轻松理解爱因斯坦的相对论。

![相对论探索之旅](https://img.shields.io/badge/React-19-blue) ![Three.js](https://img.shields.io/badge/Three.js-0.184-green) ![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)

## ✨ 功能特性

- 📚 **8章完整教学内容** - 狭义相对论(4章) + 广义相对论(4章)
- 🎮 **8个独特3D场景** - 每章配备专属可视化动画
- 📝 **交互式测验** - 每章配套选择题，即时反馈
- 💾 **进度保存** - 自动保存学习进度，支持断点续学
- 🎯 **生活化比喻** - 每个概念配有通俗易懂的类比说明
- 🌐 **Web + 桌面应用** - 支持网页访问和 Electron 桌面应用

## 📖 课程大纲

### 狭义相对论
| 章节 | 标题 | 3D场景 | 核心内容 |
|------|------|--------|----------|
| 第1章 | 光速的奥秘 | 光速飞船 | 光速不变原理、迈克尔逊-莫雷实验 |
| 第2章 | 时间的魔法 | 时间膨胀时钟 | 时间膨胀效应、双生子佯谬 |
| 第3章 | 空间的变形 | 长度收缩飞船 | 长度收缩效应、洛伦兹变换 |
| 第4章 | 质能方程 | 能量转换核心 | E=mc²、核能应用 |

### 广义相对论
| 章节 | 标题 | 3D场景 | 核心内容 |
|------|------|--------|----------|
| 第5章 | 等效原理 | 电梯思想实验 | 引力与加速度等效 |
| 第6章 | 时空弯曲 | 时空网格变形 | 质量弯曲时空 |
| 第7章 | 引力透镜 | 光线弯曲效果 | 光线弯曲、爱因斯坦环 |
| 第8章 | 黑洞探秘 | 黑洞吸积盘 | 事件视界、霍金辐射 |

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 8
- **样式**: Tailwind CSS + shadcn/ui
- **3D渲染**: Three.js + React Three Fiber + Drei
- **状态管理**: Zustand
- **动画**: Framer Motion
- **路由**: React Router 7
- **桌面应用**: Electron

## 📦 安装部署

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐) 或 npm >= 9.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/taihuiwu/easy-relativity.git
cd easy-relativity

# 安装依赖
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev
```

访问 http://localhost:5173 即可查看应用。

### 构建生产版本

```bash
# 构建 Web 版本
pnpm build

# 预览构建结果
pnpm preview
```

构建产物位于 `dist/` 目录。

## 🌐 部署到 Web 服务器

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动检测 Vite 项目，点击部署

### Netlify 部署

1. 构建项目: `pnpm build`
2. 将 `dist/` 目录拖放到 Netlify
3. 或连接 GitHub 仓库自动部署

### 静态服务器部署

```bash
# 构建
pnpm build

# 将 dist/ 目录上传到任意静态服务器
# 如 Nginx, Apache, GitHub Pages 等
```

## 🖥️ 打包桌面应用

### 安装 Electron 依赖

```bash
pnpm add -D electron electron-builder concurrently wait-on
```

### 开发模式

```bash
# 同时启动 Web 开发服务器和 Electron
pnpm electron:dev
```

### 打包应用

```bash
# 打包 Windows 版本
pnpm electron:build:win

# 打包 macOS 版本
pnpm electron:build:mac

# 打包 Linux 版本
pnpm electron:build:linux

# 打包所有平台
pnpm electron:build
```

打包后的应用位于 `release/` 目录。

## 📁 项目结构

```
relativity-edu/
├── src/
│   ├── components/          # React 组件
│   │   ├── layout/          # 布局组件 (Header, Sidebar)
│   │   ├── chapter/         # 章节组件 (Quiz)
│   │   └── common/          # 通用组件 (AnalogyBox)
│   ├── scenes/              # 3D 场景
│   │   ├── LightSpeedShip.tsx
│   │   ├── TimeDilation.tsx
│   │   ├── LengthContraction.tsx
│   │   ├── MassEnergy.tsx
│   │   ├── EquivalencePrinciple.tsx
│   │   ├── SpacetimeCurvature.tsx
│   │   ├── GravitationalLens.tsx
│   │   └── BlackHole.tsx
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx
│   │   ├── Chapter.tsx
│   │   └── Progress.tsx
│   ├── store/               # 状态管理
│   │   ├── progressStore.ts
│   │   └── settingsStore.ts
│   ├── data/                # 教学内容
│   │   ├── chapters/        # 章节数据
│   │   └── quizzes/         # 测验数据
│   ├── App.tsx
│   └── main.tsx
├── public/                  # 静态资源
├── electron/                # Electron 配置
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎮 使用说明

### 基本操作

1. **首页**: 查看课程大纲，点击"开始探索"进入学习
2. **章节页面**: 
   - 左侧显示教学内容
   - 右侧显示 3D 可视化场景
   - 使用"上一节/下一节"导航
3. **3D 场景交互**:
   - 鼠标拖动旋转视角
   - 滚轮缩放
   - 自动旋转展示
4. **测验**: 完成章节学习后进行知识点检测
5. **进度页面**: 查看学习进度和测验成绩

### 学习建议

- 按章节顺序学习，循序渐进
- 仔细观看 3D 动画演示
- 阅读生活化比喻加深理解
- 完成每章测验巩固知识

## 🔧 开发命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 预览
pnpm preview

# 代码检查
pnpm lint

# Electron 开发
pnpm electron:dev

# Electron 打包
pnpm electron:build
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送分支: `git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [React](https://react.dev/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

⭐ 如果这个项目对你有帮助，请给一个 Star！
