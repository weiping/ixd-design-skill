# Phase 4: Page Interaction Specs

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

### Section 1: Page Overview（页面概述）

[English]
```markdown
## P<<ID>> <<Page Name>>

**Function**: <<one-sentence description of this page's role in the product>>
**Module**: <<module name>>
**Upstream Pages**: <<pages that can navigate here>> (<<entry action>>)
**Downstream Pages**: <<pages that can be navigated to>> (<<trigger action>>)
**User Goal**: <<what the user wants to accomplish on this page>>
```

[中文]
```markdown
## P<<编号>> <<页面名称>>

**功能定位**：<<一句话描述本页面在产品中的角色>>
**所属模块**：<<模块名>>
**上游页面**：<<从哪些页面可以进入>> （<<入口操作>>）
**下游页面**：<<可以跳转到哪些页面>> （<<触发操作>>）
**用户目标**：<<用户在这个页面要完成什么>>
```

### Section 2: Layout Structure（页面布局）

Use ASCII art to describe the page regions. Choose the appropriate template based on target platform:

**Mobile Layout** (App / Mini-program), top to bottom:

[English]
```
┌──────────────────────────────────┐
│  Top Region: Status Bar + Nav Bar │
├──────────────────────────────────┤
│  Content Region A: <<description>> │
├──────────────────────────────────┤
│  Content Region B: <<description>> │
├──────────────────────────────────┤
│  Bottom Region: Action Bar / Tab Bar │
└──────────────────────────────────┘
```

[中文]
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


**Desktop Layout** (Windows / macOS native app, Flutter/Electron desktop), multi-panel:

[English]]
```
┌──────────────────────────────────────────────────────────┐
│  Title Bar: App icon + Title + Window controls (min/max/close) │
│  (macOS: Left traffic lights + draggable area; Windows: Right buttons) │
├──────────────────────────────────────────────────────────┤
│  Menu Bar / Toolbar: <<menu items / tool buttons / search / user avatar>> │
├────────────┬─────────────────────────┬───────────────────┤
│  Sidebar    │  Main Content Area      │  Auxiliary Panel (optional) │
│  (collapsible) │                         │  (properties/details/preview) │
│             │  Content Region A: <<description>> │                   │
│  Nav Menu   │                         │  <<description>> │
│  Tree View  │  Content Region B: <<description>> │                   │
│  File List  │                         │                   │
│             │                         │                   │
│  <<width>>  │  <<flexible width>>     │  <<width>>        │
├────────────┴─────────────────────────┴───────────────────┤
│  Bottom Status Bar: <<status info / progress / quick actions>> │
└──────────────────────────────────────────────────────────┘
```

[中文]
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

**Desktop Layout Notes**:
- Sidebar: Collapsed width <<48-64px>>, expanded width <<200-280px>>, supports drag resize
- Auxiliary panel: Width <<240-360px>>, can close/drag resize, hide when not needed
- Split pane divider: <<supports user drag resize?>>
- Window minimum size degradation: <<sidebar auto-collapse / auxiliary panel auto-hide>>
- Multi-tab: <<supports content area tab switching like browser tabs?>>

**Cross-platform products** need to describe both mobile and desktop layouts, including breakpoint and transition strategy.

Note for each region:
- Fixed or scrollable?
- Relative height or fixed height?
- Background color/style

### Section 3: Component Inventory（组件清单）

[English]
```markdown
| ID | Component Name | Component Type | Region | Interaction | Trigger Condition | Notes |
|----|----------------|----------------|--------|-------------|-------------------|-------|
| C01 | Back Button | Icon Button | Nav Bar - Left | Tap to go back | Always visible | - |
| C02 | Search Bar | Input Field | Content Area A | Tap to go to search | Always visible | Placeholder: "Search..." |
| C03 | Content Card | Card | Content Area B | Tap to view detail | When data exists | Supports swipe-left to delete |
| C04 | Submit Button | Primary Button | Bottom Action Bar | Tap to submit form | When form validation passes | Disabled when validation fails |
```

[中文]
```markdown
| 编号 | 组件名称 | 组件类型 | 所在区域 | 交互行为 | 触发条件 | 备注 |
|------|---------|---------|---------|---------|---------|------|
| C01 | 返回按钮 | 图标按钮 | 导航栏-左 | 点击返回上一页 | 始终显示 | - |
| C02 | 搜索栏 | 输入框 | 内容区A | 点击跳转搜索页 | 始终显示 | 占位文本: "搜索..." |
| C03 | 内容卡片 | 卡片 | 内容区B | 点击进入详情 | 有数据时 | 支持左滑删除 |
| C04 | 提交按钮 | 主按钮 | 底部操作栏 | 点击提交表单 | 表单校验通过 | 校验未通过时禁用 |
```

Component types reference:
- **Button**: Primary button, Secondary button, Text button, Icon button, FAB
- **Input**: Text field, Password field, Search field, Textarea, Number input
- **Selection**: Radio, Checkbox, Switch, Dropdown, Date picker, Region picker
- **Display**: Card, List item, Tag, Badge, Avatar, Image
- **Feedback**: Toast, Dialog, Bottom Sheet, Progress bar, Skeleton screen
- **Navigation**: Nav bar, Tab bar, Breadcrumb, Segmented control, Step indicator

### Section 4: Interaction Behaviors（交互行为详述）

For each interactive component, document:

[English]
```markdown
### C<<ID>> <<Component Name>>

**Tap / Touch**
- Behavior: <<specific response>>
- Feedback: <<visual/haptic/sound feedback>>
- Example: Tap submit button → button grays out + shows loading → on success, navigate to result page

**Long Press** (if applicable)
- Trigger time: 500ms
- Behavior: <<response>>
- Feedback: <<haptic feedback + overlay/menu>>

**Swipe** (if applicable)
- Direction: <<left/right/up/down>>
- Behavior: <<response>>
- Threshold: <<trigger distance>>

**Hover (Desktop)** (if applicable)
- Hover state change: <<background color change/shadow deepen/text color>>
- Tooltip display: <<content/delay/position>>
- Cursor: <<pointer/default/text/grab>>

**Context Menu (Desktop)** (if applicable)
- Context menu items: <<menu item list>>
- Shortcut hints: <<shortcuts for each menu item>>
- Divider position: <<before dangerous actions>>

**Keyboard (Desktop)** (if applicable)
- Tab focus: <<focus order>>
- Enter confirm: <<confirm behavior>>
- Esc cancel: <<cancel/close behavior>>
- Shortcuts: <<custom shortcuts>>

**Drag & Drop (Desktop)** (if applicable)
- Drag behavior: <<reorder/move/copy>>
- Drag area indicator: <<drag handle/full area>>
- Drop target: <<highlight style/insertion line>>
- Forbidden zone: <<cursor: not-allowed>>

**Input** (form components)
- Input type: <<text/number/email/phone/password>>
- Keyboard type: <<default/numeric/email/URL>>
- Max length: <<character count>>
- Real-time validation: <<validation rules and error messages>>
- Formatting: <<auto-format, e.g., phone xxx xxxx xxxx>>

**Disabled State**
- Condition: <<when disabled>>
- Style: <<reduced opacity / grayed out color>>
- Behavior: <<no response on tap / Toast explaining reason on tap>>

**Loading State** (if applicable)
- Style: <<spinner inside button / text change / skeleton screen>>
- During behavior: <<prevent duplicate taps / cancellable>>
```

[中文]
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

### Section 5: State Machine（页面状态流转）

Every page must cover these 7 states (skip if truly not applicable):

[English]
```markdown
| State | Trigger Condition | Visual Display | Available Actions |
|-------|-------------------|----------------|-------------------|
| Default | Data loaded successfully | Normal content display | All normal interactions |
| Loading | Enter page / Pull to refresh | Skeleton screen or spinner | Wait / Can go back |
| Empty | Request successful but no data | Empty illustration + guide text + optional CTA | Tap CTA / Pull to refresh |
| Error | Network exception / Server error | Error illustration + error description + retry button | Tap retry / Go back |
| No Access | Not logged in / Insufficient permissions | Permission prompt + guide button | Go to login / Request access / Go back |
| Partial | Some data succeeded / Some failed | Success area displayed + error message in failed area | Retry failed part |
| Edit | Enter edit mode | Edit toolbar appears, components become editable | Edit / Save / Cancel |
```

[中文]
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
    [*] --> Loading : Enter page
    Loading --> Default : Load success
    Loading --> Empty : No data
    Loading --> Error : Request failed
    Loading --> NoAccess : No permission

    Default --> Loading : Pull to refresh
    Error --> Loading : Tap retry
    Empty --> Loading : Pull to refresh
    NoAccess --> Loading : Return after permission granted
```

### Section 6: Motion Specs（动效说明）

[English]
```markdown
### Page Transitions
- **Enter method**: <<push right / present bottom / fade / custom>>
- **Exit method**: <<pop left / dismiss down / fade>>
- **Duration**: <<300ms>>
- **Easing**: <<ease-in-out / spring(damping: 0.8)>>

### Element Animations
| Element | Animation Type | Trigger | Parameters |
|---------|---------------|---------|------------|
| Content card | Fade in + slide up | Page load complete | duration: 300ms, delay: index*50ms |
| Favorite button | Scale bounce | Tap favorite | scale: 1→1.3→1, duration: 200ms |
| Toast | Slide in from bottom | Action feedback | duration: 200ms, stay 2s then fade out |

### Gesture Interactions
| Gesture | Area | Behavior | Threshold/Parameters |
|---------|------|----------|----------------------|
| Pull down | Content area | Pull to refresh | Pull 60px to trigger, bounce back on release |
| Swipe left | List item | Reveal delete button | Swipe >80px, snap on release |
| Inertial scroll | Content area | Standard iOS/Android bounce | System default |
```

[中文]
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

### Section 7: Data Loading Strategy（数据策略）

[English]
```markdown
### Data Loading
- **First load**: <<full load / pagination / lazy load>>
- **Pagination rules**: <<N>> items per page, triggered by <<scroll to bottom / tap load more>>
- **Refresh**: <<pull to refresh / polling(interval) / WebSocket real-time>>
- **Cache**: <<cache enabled / cache TTL / use cache when offline + prompt>>

### Data State
- List sorting: <<default sort rules>>
- Real-time updates: <<which data needs real-time / polling interval>>
- Optimistic updates: <<which operations update UI first then wait for backend confirmation>>
```

[中文]
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

### Section 8: Adaptation Rules（适配说明）

[English]
```markdown
### PC Client Adaptation (Desktop)
- **Window minimum size**: <<width × height>>
- **Drag resizable**: <<which panels support drag resize>>
- **Panel layout response rules**:
  | Window Width | Layout Change | Sidebar State | Special Handling |
  |--------------|---------------|---------------|------------------|
  | < 960px (small) | <<single column/full-width content>> | Collapsed (icon mode 56px) | <<description>> |
  | 960–1280px (medium) | <<two columns>> | Expanded 200px | <<description>> |
  | ≥ 1280px (standard) | <<two/three columns>> | Expanded 240px | <<description>> |
- **Title bar style**: <<native / custom>>

### PC Browser Adaptation
- <<PC / desktop browser layout changes>>

### Large Screen Adaptation (iPad/Tablet)
- <<two-column layout / dialog becomes side panel / wider content area>>

### Small Screen Adaptation (SE/Small phones)
- <<text truncation rules / button stacking / hide secondary info>>

### Landscape
- <<supported? / landscape layout changes>>

### Dark Mode
- Background color: <<dark background value>>
- Card color: <<card background value>>
- Text color: <<primary/secondary text values>>
- Special handling: <<reduce image brightness / shadow becomes border>>
- Desktop: <<follow system theme / in-app independent setting>>

### Accessibility
- VoiceOver/TalkBack labels: <<announcement text for key components>>
- Touch targets: minimum 44×44pt
- Dynamic type: <<supports system font size adjustment?>>
- Contrast ratio: <<meets WCAG AA standard>>
- Keyboard focus indicator (desktop): <<:focus-visible style, e.g., 2px blue outline>>

### Multi-window (Desktop)
- <<supports multiple windows / inter-window communication / window position memory>>
```

[中文]
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


### Section 9: Interaction Walkthrough(交互走查) (Mandatory, Self-check Before Output)

After completing sections 1-8 and before outputting this page's interaction spec, perform a self-check against the **Interaction Walkthrough Checklist** (see auxiliary-tools.md Tool 2).
Attach the walkthrough results as a table at the end of the page interaction spec:

[English]
```markdown
| Walkthrough Item | Result | Notes |
|------------------|--------|-------|
| All buttons have clear tap feedback | ✅ Pass | — |
| Page covers all states | ⚠️ Partial | Missing partial loading state, added |
| ... | ... | ... |
```

[中文]
```markdown
| 走查项 | 结果 | 备注 |
|--------|------|------|
| 所有按钮是否有明确的点击反馈 | ✅ 通过 | — |
| 页面是否覆盖了所有状态 | ⚠️ 部分 | 缺少部分加载态，已补充 |
| ... | ... | ... |


If any items fail, revise the corresponding content in sections 1-8 before outputting the final version.

### Section 10: Micro-interaction Specifications(特定场景微交互说明)

Identify scenarios on this page that require detailed micro-interaction design (e.g., like, favorite, delete, submit success, toggle, drag reorder, etc.), and describe each using the following template (see auxiliary-tools.md Tool 5):

[English]
```markdown
**Micro-interaction Scenario: <<scenario name, e.g., "Favorite Button">>**
1. Trigger condition: <<user taps favorite icon>>
2. Visual change: <<icon changes from outline to filled, color from N-500 to primary, size scales 120% then bounces back to 100%>>
3. Animation parameters: <<duration 300ms, Spring curve, delay 0ms>>
4. Sound/Haptic feedback: <<light haptic (mobile) / none (desktop)>>
5. State reversal: <<tap again to unfavorite, icon from filled to outline, color reverts, no bounce animation, 200ms ease-out>>
6. CSS/Code pseudo-code: <<keyframe pseudo-code>>
```

[中文]
```markdown
**微交互场景：<<场景名，如"收藏按钮">>**
1. 触发条件：<<用户点击收藏图标>>
2. 视觉变化：<<图标从线性→填充，颜色从 N-500→主色，尺寸先放大 120% 再回弹至 100%>>
3. 动效参数：<<时长 300ms，Spring 曲线，延迟 0ms>>
4. 声音/震动反馈：<<轻触震动（移动端）/ 无（桌面端）>>
5. 状态反转：<<再次点击取消收藏，图标从填充→线性，颜色回退，无弹性动画，200ms ease-out>>
6. CSS/代码伪代码：<<关键帧伪代码>>
```

If this page has no micro-interactions (e.g., static legal page), note "No specific micro-interaction scenarios on this page."

---

## Resume Logic

When resuming Phase 4 after a break, follow this process:

### Step 1: Read Progress State

```js
// Read from progress.json
const phase4Status = progress.phases['4'];
const completedPages = phase4Status.pagesCompleted || [];
const pagesTotal = phase4Status.pagesTotal || 0;
```

### Step 2: Calculate Remaining Pages

```js
// Read Phase 2 page inventory
const expectedPages = readPageInventory('docs/ixd/phase2-architecture.md');
// Returns: [{ id: 'P01', name: 'Home', type: 'Hub' }, ...]

// Calculate remaining
const remainingPages = expectedPages.filter(p => !completedPages.includes(p.id));
```

### Step 3: Resume Decision

```
IF remainingPages.length > 0:
  OUTPUT: "## Phase 4 Resume

  **Completed**: <<M>>/<<total>> pages
  **Remaining**: <<K>> pages to process

  | Page ID | Page Name | Page Type |
  |---------|-----------|-----------|
  | <<P04>> | <<Product Detail>> | Detail |
  | ... | ... | ... |

  Resuming from **<<first remaining page>>**."

  → Process remaining pages in batches of 3-5
  → Update pagesCompleted after each batch

ELSE (remainingPages.length === 0):
  → Run Completeness Check (Step 4)
```

### Step 4: Completeness Check (when all pages marked complete)

Even when `pagesCompleted.length === pagesTotal`, verify actual files:

```js
// Scan docs/ixd/phase4-page-specs/ for actual specs
const actualSpecs = scanDirectory('docs/ixd/phase4-page-specs/');
// Extract page IDs from each spec file header: "## P<<ID>>"

// Compare with Phase 2 inventory
const missingPages = expectedPages.filter(p => !actualSpecs.includes(p.id));
```

**Result Handling**:
```
IF missingPages.length === 0:
  OUTPUT: "✅ Completeness check passed, all <<N>> page specs confirmed. Proceeding to Phase 5."
  → Set phase 4 status to "done"
  → Proceed to Phase 5

ELSE:
  OUTPUT: "⚠️ Found <<N>> missing pages: <<page name list>>

  Will supplement these page interaction specs first."
  → Generate missing page specs
  → Re-run completeness check
  → Then proceed to Phase 5
```

---

## Batch Processing Prompt

When processing multiple pages:

```
Follow the interaction spec template (sections 1-10), output complete interaction specs for the following pages:

**Current Batch: <<module name>> Module**
1. P<<ID>> <<Page Name>>
2. P<<ID>> <<Page Name>>
3. P<<ID>> <<Page Name>>

Each page includes all 10 sections. If a section doesn't apply, mark it as "N/A" and explain why.

⚠️ Each page must include Section 9 "Interaction Walkthrough" results table and Section 10 "Micro-interaction Specs".
Items that fail walkthrough must be fixed before output.
```

---

## Quality Checklist

### Per-Page Verification (Mandatory)

For each page spec in the batch:
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

### Per-Page Verification Procedure

For each batch of pages generated, perform the following verification **for every page**:

1. **Read Page Spec**: `docs/ixd/phase4-page-specs/<page-id>.md` (e.g., `page-P01.md`, `page-P02.md`)

2. **Check Each Page**:
   - [ ] All 10 sections present and complete
   - [ ] Section 9 (Interaction Walkthrough) score ≥ 80%
   - [ ] Section 10 (Micro-interactions) documented

3. **Batch Summary**:
   ```markdown
   ## Phase 4 Batch N Per-Page Verification Report

   **Batch**: Pages X, Y, Z
   **Date**: YYYY-MM-DD

   ### Per-Page Check

   | Page ID | Page Name | 10 Sections | Walkthrough | Micro-interactions |
   |---------|-----------|-------------|-------------|-------------------|
   | P01 | Home | ✅ | 95% | ✅ |
   | P02 | List | ✅ | 88% | ✅ |
   | P03 | Detail | ⚠️ | 75% | ❌ Missing |

   ### Issues Found
   - Page P03: Missing Section 10 micro-interactions
   - Page P03: Walkthrough score below 80%

   ### Verdict
   ✅ All pages pass - Continue to next batch
   ❌ Some pages need fixes - Fix and re-verify
   ```

4. **Update Progress**:
   - Mark pages as verified in `progress.json`
   - If any page fails: fix issues, re-verify before proceeding

---

## Page Completeness Check

After all page specs are generated, perform a **completeness check** against the Phase 2 page inventory:

### Step 1: Read Page Inventory

```js
// Read from docs/ixd/phase2-architecture.md
// Extract the page list table to get all expected pages
const expectedPages = [
  { id: 'P01', name: 'Home', type: 'Hub', module: 'Core' },
  { id: 'P02', name: 'Product List', type: 'List', module: 'Product' },
  { id: 'P03', name: 'Product Detail', type: 'Detail', module: 'Product' },
  // ... all pages from Phase 2
];
```

### Step 2: Check Completed Page Specs

Scan `docs/ixd/phase4-page-specs/` directory to identify which pages have been documented:

```js
const completedPages = []; // List of page IDs from existing spec files

// Check each page spec file (e.g., page-P01.md, page-P02.md)
// Each spec file should start with "## P<<ID>> <<Page Name>>"
```

### Step 3: Identify Missing Pages

```js
const missingPages = expectedPages.filter(p => !completedPages.includes(p.id));

if (missingPages.length > 0) {
  console.log(`⚠️ Missing ${missingPages.length} page specs:`, missingPages);
  // Proceed to Step 4
} else {
  console.log('✅ All page specs completed');
}
```

### Step 4: Generate Missing Page Specs

For each missing page:
1. Check if the page exists in Phase 3 user flows — extract interaction details
2. Generate the 10-section spec using the template above
3. Save as a new page spec file: `docs/ixd/phase4-page-specs/page-<ID>.md`
4. Ensure cross-references to related pages are updated

### Step 5: Update Progress

```json
// Update progress.json
{
  "4": {
    "status": "done",
    "file": "phase4-page-specs/",
    "summary": "Completed <<N>>/<<total>> page interaction specs; all pages done",
    "pagesCompleted": ["P01", "P02", "P03", "..."],
    "pagesTotal": 15
  }
}
```

### Completeness Report Template

After the check, output a brief report:

```
## Phase 4 Page Completeness Check

**Phase 2 Total Pages**: <<N>>
**Page Specs Output**: <<M>>

| Status | Page ID | Page Name | Page Type | Module |
|--------|---------|-----------|-----------|--------|
| ✅ | P01 | Home | Hub | Core |
| ✅ | P02 | Product List | List | Product |
| ⚠️ | P05 | Settings | Settings | System | ← Needs supplement |
| ... | ... | ... | ... | ... |

**Missing Page Specs**: <<N-M>>
<<If none missing, write "None, all page specs output">>

<<If missing>>
### Supplement Plan
Will supplement missing page specs in this order:
1. <<Page Name>> (<<Page ID>>) — <<Page Type>>
2. <<Page Name>> (<<Page ID>>) — <<Page Type>>
...
```

---

## Batch Completeness Strategy

When processing in batches, track progress across batches:

**After each batch**:
1. Record completed page IDs in a running list
2. Update `progress.json` with current batch progress
3. Briefly mention: `"Completed batch <<N>>: <<page name list>>, cumulative <<M>>/<<total>>"`

**Before starting a new batch**:
1. Check which pages remain from Phase 2 inventory
2. Group remaining pages by module for coherent batches
3. Prioritize: core pages → high-traffic pages → secondary pages

**Final batch**:
1. Process any remaining pages
2. Run the completeness check above
3. Confirm all pages are documented before marking Phase 4 as complete
