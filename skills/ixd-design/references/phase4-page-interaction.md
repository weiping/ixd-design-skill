# Phase 4: Page Interaction Specs （逐页交互说明）

## Objective

Produce developer-ready interaction specifications for each page. This is the core deliverable, equivalent to Modao's "interaction annotations" — the document developers actually build from.

## Processing Strategy

- Process pages in batches of **3-5 pages per module**
- Start with the most complex or critical pages
- Confirm each batch with the user before proceeding
- Cross-reference page specs with the user flows from Phase 3

---

## Per-Page Template

For each page, produce all 10 sections below. Skip sections that don't apply (e.g., no gestures on a simple settings page).

### Section 1: Page Overview （页面概述）

```markdown
## P<<编号>> <<页面名称>>

**功能定位**：<<一句话描述本页面在产品中的角色>>
**所属模块**：<<模块名>>
**上游页面**：<<从哪些页面可以进入>> （<<入口操作>>）
**下游页面**：<<可以跳转到哪些页面>> （<<触发操作>>）
**用户目标**：<<用户在这个页面要完成什么>>
```

### Section 2: Layout Structure （页面布局）

Use ASCII art to describe the page regions. Choose the appropriate template based on target platform:

**移动端布局**（App / 小程序），从上到下：

```
┌──────────────────────────────────┐
│  顶部区域：状态栏 + 导航栏        │
├──────────────────────────────────┤
│  内容区域A：<<描述>>              │
├──────────────────────────────────┤
│  内容区域B：<<描述>>              │
├──────────────────────────────────┤
│  底部区域：操作栏 / Tab栏         │
└──────────────────────────────────┘
```

**桌面端布局**（Windows / macOS 原生应用、Flutter/Electron 桌面端），多面板分栏：

```
┌──────────────────────────────────────────────────────────┐
│  标题栏：应用图标 + 标题 + 窗口控制按钮(最小化/最大化/关闭) │
│  (macOS: 左侧红绿灯 + 可拖拽区域; Windows: 右侧按钮)      │
├──────────────────────────────────────────────────────────┤
│  菜单栏/工具栏：<<菜单项 / 工具按钮 / 搜索框 / 用户头像>>   │
├────────────┬─────────────────────────┬───────────────────┤
│  侧边栏     │  主内容区                │  辅助面板(可选)    │
│  (可折叠)   │                         │  (属性/详情/预览)  │
│             │  内容区域A：<<描述>>      │                   │
│  导航菜单    │                         │  <<描述>>          │
│  树形结构    │  内容区域B：<<描述>>      │                   │
│  文件列表    │                         │                   │
│             │                         │                   │
│  <<宽度>>   │  <<弹性宽度>>            │  <<宽度>>          │
├────────────┴─────────────────────────┴───────────────────┤
│  底部状态栏：<<状态信息 / 进度指示 / 快捷操作>>              │
└──────────────────────────────────────────────────────────┘
```

**桌面端布局补充说明**：
- 侧边栏：折叠态宽度 <<48-64px>>，展开态宽度 <<200-280px>>，支持拖拽调整
- 辅助面板：宽度 <<240-360px>>，可关闭/可拖拽调整，不需要时隐藏
- 分栏拖拽分割线：<<是否支持用户拖拽调整各区域宽度>>
- 窗口最小尺寸下的降级：<<侧边栏自动折叠 / 辅助面板自动隐藏>>
- 多 Tab/多标签页：<<是否支持内容区多标签切换，类似浏览器 Tab>>

**跨平台产品**需同时描述移动端和桌面端两套布局，并说明布局切换的断点和过渡策略。

Note for each region:
- Fixed or scrollable?
- Relative height or fixed height?
- Background color/style

### Section 3: Component Inventory （组件清单）

```markdown
| 编号 | 组件名称 | 组件类型 | 所在区域 | 交互行为 | 触发条件 | 备注 |
|------|---------|---------|---------|---------|---------|------|
| C01 | 返回按钮 | 图标按钮 | 导航栏-左 | 点击返回上一页 | 始终显示 | - |
| C02 | 搜索栏 | 输入框 | 内容区A | 点击跳转搜索页 | 始终显示 | 占位文本: "搜索..." |
| C03 | 内容卡片 | 卡片 | 内容区B | 点击进入详情 | 有数据时 | 支持左滑删除 |
| C04 | 提交按钮 | 主按钮 | 底部操作栏 | 点击提交表单 | 表单校验通过 | 校验未通过时禁用 |
```

Component types reference:
- **Button**: 主按钮、次按钮、文字按钮、图标按钮、FAB
- **Input**: 输入框、密码框、搜索框、多行输入、数字输入
- **Selection**: 单选、多选、开关、下拉选择、日期选择、地区选择
- **Display**: 卡片、列表项、标签、徽标(Badge)、头像、图片
- **Feedback**: Toast、弹窗(Dialog)、底部面板(Sheet)、进度条、骨架屏
- **Navigation**: 导航栏、Tab栏、面包屑、分段控制器、步骤指示器

### Section 4: Interaction Behaviors （交互行为详述）

For each interactive component, document:

```markdown
### C<<编号>> <<组件名称>>

**点击/触摸 (Tap)**
- 行为：<<具体响应>>
- 反馈：<<视觉/触觉/声音反馈>>
- 示例：点击提交按钮 → 按钮变灰+显示loading → 请求成功跳转结果页

**长按 (Long Press)**（如有）
- 触发时间：500ms
- 行为：<<响应>>
- 反馈：<<震动反馈 + 浮层/菜单>>

**滑动 (Swipe)**（如有）
- 方向：<<左/右/上/下>>
- 行为：<<响应>>
- 阈值：<<触发距离>>

**悬停（桌面端）(Hover)**（如有）
- hover 状态变化：<<背景色变化/阴影加深/文字颜色>>
- Tooltip 显示：<<内容/延迟时间/位置>>
- Cursor：<<pointer/default/text/grab>>

**右键菜单（桌面端）(Context Menu)**（如有）
- 上下文菜单项：<<菜单项列表>>
- 快捷键提示：<<各菜单项对应快捷键>>
- 分割线位置：<<危险操作前>>

**键盘操作（桌面端）(Keyboard)**（如有）
- Tab 聚焦：<<焦点顺序>>
- Enter 确认：<<确认行为>>
- Esc 取消：<<取消/关闭行为>>
- 快捷键：<<自定义快捷键>>

**拖拽（桌面端）(Drag & Drop)**（如有）
- 拖拽行为：<<排序/移动/复制>>
- 拖拽区域指示：<<拖拽手柄/全区域>>
- 放置目标：<<高亮样式/插入线>>
- 禁止区域：<<cursor: not-allowed>>

**输入 (Input)**（表单组件）
- 输入类型：<<text/number/email/phone/password>>
- 键盘类型：<<默认/数字/邮箱/URL>>
- 最大长度：<<字符数>>
- 实时校验：<<校验规则和错误文案>>
- 格式化：<<自动格式，如手机号 xxx xxxx xxxx>>

**禁用态 (Disabled)**
- 条件：<<何时禁用>>
- 样式：<<透明度降低 / 颜色变灰>>
- 行为：<<点击无响应 / 点击弹Toast提示原因>>

**加载态 (Loading)**（如有）
- 样式：<<按钮内转圈 / 文字变化 / 骨架屏>>
- 期间行为：<<禁止重复点击 / 可取消>>
```

### Section 5: State Machine （页面状态流转）

Every page must cover these 7 states (skip if truly not applicable):

```markdown
| 状态 | 触发条件 | 视觉表现 | 可执行操作 |
|------|---------|---------|-----------|
| 默认态 (Default) | 数据加载成功 | 正常展示内容 | 所有正常交互 |
| 加载态 (Loading) | 进入页面 / 下拉刷新 | 骨架屏 或 spinner | 等待 / 可返回 |
| 空态 (Empty) | 请求成功但数据为空 | 空态插图 + 引导文案 + 可选CTA | 点击CTA / 下拉刷新 |
| 错误态 (Error) | 网络异常 / 服务端错误 | 错误插图 + 错误描述 + 重试按钮 | 点击重试 / 返回 |
| 无权限态 (No Access) | 未登录 / 权限不足 | 权限提示 + 引导按钮 | 去登录 / 去申请 / 返回 |
| 部分加载态 (Partial) | 部分数据成功/部分失败 | 成功区域展示 + 失败区域错误提示 | 重试失败部分 |
| 编辑态 (Edit) | 进入编辑模式 | 编辑工具栏出现、组件变为可编辑 | 编辑/保存/取消 |
```

State transition diagram (optional Mermaid):
```mermaid
stateDiagram-v2
    [*] --> Loading : 进入页面
    Loading --> Default : 加载成功
    Loading --> Empty : 数据为空
    Loading --> Error : 请求失败
    Loading --> NoAccess : 无权限

    Default --> Loading : 下拉刷新
    Error --> Loading : 点击重试
    Empty --> Loading : 下拉刷新
    NoAccess --> Loading : 权限获取后返回
```

### Section 6: Motion Specs （动效说明）

```markdown
### 页面转场
- **进入方式**：<<push right / present bottom / fade / custom>>
- **退出方式**：<<pop left / dismiss down / fade>>
- **时长**：<<300ms>>
- **曲线**：<<ease-in-out / spring(damping: 0.8)>>

### 元素动画
| 元素 | 动画类型 | 触发时机 | 参数 |
|------|---------|---------|------|
| 内容卡片 | 淡入+上移 | 页面加载完成 | duration: 300ms, delay: index*50ms |
| 收藏按钮 | 缩放弹跳 | 点击收藏 | scale: 1→1.3→1, duration: 200ms |
| Toast | 从底部滑入 | 操作反馈 | duration: 200ms, 停留2s后淡出 |

### 手势交互
| 手势 | 区域 | 行为 | 阈值/参数 |
|------|------|------|----------|
| 下拉 | 内容区 | 下拉刷新 | 下拉60px触发，松手后回弹 |
| 左滑 | 列表项 | 露出删除按钮 | 滑动>80px，松手吸附 |
| 惯性滚动 | 内容区 | 标准iOS/Android弹性 | 系统默认 |
```

### Section 7: Data Loading Strategy （数据策略）

```markdown
### 数据加载
- **首次加载**：<<全量加载 / 分页加载 / 懒加载>>
- **分页规则**：每页 <<N>> 条，<<滚动到底部 / 点击加载更多>> 触发
- **刷新**：<<下拉刷新 / 定时轮询(间隔) / WebSocket实时>>
- **缓存**：<<是否缓存 / 缓存时效 / 离线时使用缓存+提示>>

### 数据状态
- 列表排序：<<默认排序规则>>
- 实时更新：<<哪些数据需要实时 / 轮询间隔>>
- 乐观更新：<<哪些操作先更新UI再等后端确认>>
```

### Section 8: Adaptation Rules （适配说明）

```markdown
### PC 客户端适配（桌面端）
- **窗口最小尺寸**：<<宽度×高度>>
- **可拖拽调整**：<<哪些分栏支持拖拽调整宽度>>
- **分栏布局响应规则**：
  | 窗口宽度 | 布局变化 | 侧边栏状态 | 特殊处理 |
  |---------|---------|-----------|---------|
  | < 960px（小窗） | <<单栏/内容区全宽>> | 折叠（图标模式56px） | <<说明>> |
  | 960–1280px（中窗）| <<双栏>> | 展开200px | <<说明>> |
  | ≥ 1280px（标准） | <<双栏/三栏>> | 展开240px | <<说明>> |
- **标题栏样式**：<<原生 / 自绘>>

### PC 浏览器适配
- <<PC / 电脑浏览器的布局变化>>

### 大屏适配 (iPad/平板)
- <<双栏布局 / 弹窗变侧边面板 / 内容区加宽>>

### 小屏适配 (SE/小屏手机)
- <<文字截断规则 / 按钮堆叠 / 隐藏次要信息>>

### 横屏
- <<是否支持 / 横屏布局变化>>

### 深色模式
- 背景色：<<深色背景值>>
- 卡片色：<<卡片背景值>>
- 文字色：<<主文字/次文字色值>>
- 特殊处理：<<图片降低亮度 / 阴影变为border>>
- 桌面端：<<跟随系统主题切换 / 应用内独立设置>>

### 无障碍
- VoiceOver/TalkBack 标签：<<关键组件的朗读文案>>
- 触摸目标：最小 44×44pt
- 动态字体：<<是否支持系统字号调节>>
- 对比度：<<满足 WCAG AA 标准>>
- 键盘焦点指示（桌面端）：<<:focus-visible 样式，如 2px 蓝色外描边>>

### 多窗口（桌面端）
- <<是否支持多窗口 / 窗口间通信 / 窗口记忆位置>>
```

### Section 9: 交互走查（必做，输出前自查）

完成上述 1-8 节后、正式输出本页交互说明之前，请对照 **交互走查清单**（参见 auxiliary-tools.md Tool 2）逐项自查。
将走查结果以表格形式附在页面交互说明末尾：

```markdown
| 走查项 | 结果 | 备注 |
|--------|------|------|
| 所有按钮是否有明确的点击反馈 | ✅ 通过 | — |
| 页面是否覆盖了所有状态 | ⚠️ 部分 | 缺少部分加载态，已补充 |
| ... | ... | ... |
```

如发现不通过项，需先回溯修改 1-8 节的对应内容，再输出最终版本。

### Section 10: 特定场景微交互说明

识别本页面中需要精细微交互设计的场景（如点赞、收藏、删除、提交成功、开关切换、拖拽排序等），
按以下模板逐个描述（参见 auxiliary-tools.md Tool 5）：

```markdown
**微交互场景：<<场景名，如"收藏按钮">>**
1. 触发条件：<<用户点击收藏图标>>
2. 视觉变化：<<图标从线性→填充，颜色从 N-500→主色，尺寸先放大 120% 再回弹至 100%>>
3. 动效参数：<<时长 300ms，Spring 曲线，延迟 0ms>>
4. 声音/震动反馈：<<轻触震动（移动端）/ 无（桌面端）>>
5. 状态反转：<<再次点击取消收藏，图标从填充→线性，颜色回退，无弹性动画，200ms ease-out>>
6. CSS/代码伪代码：<<关键帧伪代码>>
```

如本页面无需微交互（如纯静态协议页），标注"本页面无特定微交互场景"即可。

---

## Batch Processing Prompt

When processing multiple pages:

```
请按照交互说明模板（1-10 节），依次输出以下页面的完整交互说明：

**当前批次：<<模块名>> 模块**
1. P<<编号>> <<页面名>>
2. P<<编号>> <<页面名>>
3. P<<编号>> <<页面名>>

每个页面包含全部 10 个 Section。如果某个 Section 不适用，标注"不适用"并说明原因。

⚠️ 每个页面必须包含第 9 节「交互走查」结果表和第 10 节「微交互说明」。
走查不通过的项需先修正再输出。
```

---

## Quality Checklist

For each page spec:
- [ ] All 10 sections addressed (or explicitly marked N/A)
- [ ] Every interactive component has documented behavior
- [ ] Desktop components include hover, keyboard, right-click, and drag behaviors where applicable
- [ ] All 7 page states defined with visual description
- [ ] Motion specs include timing and easing values
- [ ] Data loading strategy is specific (not generic)
- [ ] Adaptation rules cover PC client, dark mode, accessibility, and multi-window (desktop)
- [ ] PC: Window resize behavior (small/medium/large window) defined
- [ ] Section 9 walkthrough completed — all items pass or fixed before output
- [ ] Section 10 micro-interactions documented (or explicitly marked as none needed)
- [ ] Cross-references to user flows (Phase 3) are consistent
- [ ] Developer could implement this page from the spec alone
