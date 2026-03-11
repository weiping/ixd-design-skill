# Auxiliary Design Tools （辅助设计工具）

These tools can be used at any point during the workflow, independent of the phase structure.

---

## Tool 1: Competitor Analysis （竞品交互分析）

### When to Use
- User mentions a competitor product
- Need to establish design patterns before starting
- User asks "how does X handle this?"

### Analysis Framework

```markdown
## <<竞品名称>> — <<功能模块>> 交互分析

### 1. 信息架构
- 该功能的页面层级和结构
- 导航模式

### 2. 核心流程
- 完成主要任务的步骤数
- 流程图（Mermaid）

### 3. 交互亮点 ✅
- 值得借鉴的交互细节（附具体描述）

### 4. 视觉特色 🎨
- 色彩/字体/图标/动效的设计特点
- 视觉品牌表达方式

### 5. 不足之处 ⚠️
- 可以改进的交互和视觉问题（附改进建议）

### 6. 设计启发
- 我们可以借鉴什么
- 我们需要差异化什么
```

---

## Tool 2: Design Heuristic Review （交互走查清单）

### When to Use
- After completing Phase 4 page specs
- Before finalizing the prototype
- When the user asks "Is this design good enough?"

### Checklist

Run against each page spec:

```markdown
## <<页面名>> 交互走查

### 基础交互
- [ ] 所有按钮是否有明确的点击反馈？
- [ ] 所有输入框是否有校验规则和错误提示？
- [ ] 关键操作是否有二次确认？
- [ ] 不可逆操作是否有警告？
- [ ] 手势操作是否有发现性提示？

### 页面状态
- [ ] 页面是否覆盖了所有状态（默认/加载/空/错误/部分加载/编辑态）？
- [ ] 加载时间超过 1 秒是否有进度指示？
- [ ] 网络中断时是否有离线降级方案？
- [ ] 页面返回后是否恢复滚动位置和之前的状态？

### 导航与流程
- [ ] 返回路径是否清晰且符合预期？
- [ ] 当前位置是否有清晰指示（高亮Tab/面包屑/标题）？
- [ ] 跳转到外部页面后能否正确返回？
- [ ] 多步流程中途退出是否有草稿保存/挽留提示？

### 表单与输入
- [ ] 表单是否支持草稿自动保存/离开挽留？
- [ ] 输入框是否支持系统自动填充（autofill）？
- [ ] 长表单是否有分组或锚点导航？
- [ ] 提交失败后已填内容是否保留？

### 数据加载
- [ ] 列表是否有分页/加载更多/触底加载策略？
- [ ] 下拉刷新是否有明确的视觉反馈和完成提示？
- [ ] 缓存数据是否有时效标识（如"5分钟前更新"）？
- [ ] 大数据量下是否考虑虚拟滚动/懒加载？

### 内容展示
- [ ] 文字过长是否有截断规则（单行省略/多行省略/展开收起）？
- [ ] 图片加载失败是否有占位/降级方案？
- [ ] 空态文案是否有引导行动（CTA 按钮/跳转链接）？
- [ ] 数据为零和数据未加载是否做了区分？

### 视觉与品牌
- [ ] 文字是否满足 WCAG AA 对比度要求？
- [ ] 视觉层级是否清晰（标题 > 正文 > 辅助文字）？
- [ ] 品牌色使用是否克制（5-15% 面积占比）？
- [ ] 深色模式下是否有配色适配？
- [ ] 是否支持动态字体大小？

### 触摸与点击
- [ ] 触摸目标是否不小于 44×44pt？（桌面端点击目标不小于 32×32px？）
- [ ] 相邻可点击元素之间是否有足够间距（≥8px）？
- [ ] 可点击区域是否大于视觉区域（扩大热区）？

### 桌面端专属 — PC 客户端适用
- [ ] 是否支持完整的键盘导航（Tab/Shift+Tab/Enter/Esc）？
- [ ] 焦点指示器是否清晰可见且样式统一？
- [ ] 悬停态是否在所有可交互元素上有视觉反馈？
- [ ] 右键菜单是否在合理场景提供？菜单项是否完整？
- [ ] 窗口缩放后布局是否正常响应（不溢出/不错位）？
- [ ] 是否支持系统级快捷键（Cmd/Ctrl+C/V/Z/A/S 等）？
- [ ] 可拖拽元素是否有拖拽手柄或光标变化提示？
- [ ] 拖拽过程中是否有放置区域指示和拖拽预览？
- [ ] 多窗口场景下数据是否同步？
- [ ] Tooltip 是否有合理延迟（显示 300-500ms / 移开即消失）？

### 跨平台一致性 — 跨平台产品适用
- [ ] 同一功能在移动端和桌面端的操作步骤是否对等？
- [ ] 移动端手势操作在桌面端是否有对应的鼠标/键盘替代？
- [ ] 两端的页面状态和数据是否同步一致？
- [ ] 品牌表达（色彩/图标/插图）在两端是否统一？
```

### Scoring

After the checklist, generate a summary score:

```markdown
### 走查评分

| 维度 | 通过/总数 | 得分 |
|------|----------|------|
| 基础交互 | /5 | % |
| 页面状态 | /4 | % |
| 导航与流程 | /4 | % |
| 表单与输入 | /4 | % |
| 数据加载 | /4 | % |
| 内容展示 | /4 | % |
| 视觉与品牌 | /5 | % |
| 触摸与点击 | /3 | % |
| 桌面端专属 | /10 | % |
| 跨平台一致性 | /4 | % |
| **综合** | **/47** | **%** |

### 优先修复项
1. <<最需要修复的问题>>
2. <<次要修复项>>
```

---

## Tool 3: A/B Design Comparison （交互方案对比）

### When to Use
- Complex feature with multiple valid approaches
- Team cannot decide between two directions
- User explicitly asks for alternatives

### Output Format

```markdown
## <<功能描述>> 交互方案对比

### 方案 A: <<方案A名称>>（<<设计倾向>>）

**设计思路**
<<一段话描述设计理念和取舍>>

**用户流程**
（Mermaid 流程图）

**关键页面**
<<关键页面的布局描述>>

**视觉差异说明**（如有）
<<与其他方案在视觉风格上的差异：配色/字体/信息密度/品牌表达>>

**优势**
- <<优势1>>
- <<优势2>>

**劣势**
- <<劣势1>>
- <<劣势2>>

---

### 方案 B: <<方案B名称>>（<<设计倾向>>）
（同上格式）

---

### 对比分析

| 维度 | 方案 A | 方案 B |
|------|--------|--------|
| 任务步骤数 | <<N>> 步 | <<M>> 步 |
| 学习成本 | <<高/中/低>> | <<高/中/低>> |
| 操作效率 | <<评价>> | <<评价>> |
| 信息完整度 | <<评价>> | <<评价>> |
| 开发复杂度 | <<评价>> | <<评价>> |
| 适合用户群 | <<描述>> | <<描述>> |

### 推荐
推荐 **方案 <<A/B>>**，理由：<<具体说明>>
```

---

## Tool 4: Multi-Perspective Review （多角色评审）

### When to Use
- Before finalizing a design
- When user wants to stress-test the design
- For complex or high-stakes features

### 6 Perspectives

```markdown
## <<功能/页面>> 多角色评审

### 👶 新手用户视角 (First-time User)
**问题**：第一次使用，能否理解并完成任务？
- 赞同：<<2个赞同点>>
- 改进：<<2个改进建议>>

### 🏃 重度用户视角 (Power User)
**问题**：每天使用10+次，是否足够高效？
- 赞同：<<2个赞同点>>
- 改进：<<2个改进建议>>

### ♿ 无障碍用户视角 (Accessibility User)
**问题**：依赖辅助技术，能否正常使用？
- 赞同：<<2个赞同点>>
- 改进：<<2个改进建议>>

### 💻 前端开发视角 (Frontend Developer)
**问题**：这个设计在技术上是否可行且合理？
- 赞同：<<2个赞同点>>
- 改进：<<2个改进建议>>

### 🧪 QA 测试视角 (QA Engineer)
**问题**：这个设计的测试覆盖是否完整？
- 赞同：<<2个赞同点>>
- 改进：<<2个改进建议>>

### 🎨 品牌设计师视角 (Brand Designer)
**问题**：视觉表达是否与品牌调性一致？是否建立了统一的设计语言？
- 赞同：<<2个赞同点>>
- 改进：<<2个改进建议>>

### 综合改进优先级

| 优先级 | 改进项 | 来源视角 | 影响范围 |
|--------|--------|---------|---------|
| P0 (必须) | <<改进项>> | <<视角>> | <<影响描述>> |
| P1 (重要) | <<改进项>> | <<视角>> | <<影响描述>> |
| P2 (建议) | <<改进项>> | <<视角>> | <<影响描述>> |
```

---

## Tool 5: Micro-Interaction Design （微交互设计）

### When to Use
- User asks to design a specific interaction detail
- Polishing phase of the prototype
- Designing delightful moments

### Output Format

```markdown
## 微交互：<<场景名称>>

### 1. 触发条件
<<什么操作触发这个微交互，移动端和桌面端分别说明>>

### 2. 视觉变化
1. **初始状态**：<<描述>>
2. **过渡过程**：<<描述颜色/大小/位置/透明度的变化>>
3. **终态**：<<描述>>

### 3. 动效参数
- 时长：<<ms>>
- 缓动：<<曲线名称或 cubic-bezier 值>>
- 延迟：<<ms，如有>>
- 循环：<<是否循环>>

### 4. 声音/震动反馈
- 移动端震动：<<无 / 轻微震动 / 标准震动>>
- 桌面端音效：<<无 / 系统音效 / 自定义音效>>

### 5. 状态反转
<<反转动效是否与正向不同，描述差异>>

### 6. 桌面端补充
- hover 预览态：<<描述>>
- 光标变化：<<描述>>
- 快捷键触发：<<描述>>

### 7. CSS/代码伪代码
```css
.element {
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.element:active {
  transform: scale(0.95);
}
.element.liked {
  animation: heartBeat 400ms ease-in-out;
}
@keyframes heartBeat {
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
```
```

### Common Scenes

| 场景 | 触发 | 核心动效 |
|------|------|---------|
| 点赞/收藏 | tap | scale bounce + color fill |
| 下拉刷新 | pull | stretch + spin + snap back |
| 删除滑动 | swipe left | reveal action + slide out |
| 加载按钮 | tap submit | width shrink + spinner + expand |
| 拖拽排序 | long press + drag | lift shadow + reorder animation |
| 开关切换 | tap toggle | thumb slide + track color transition |

---

## Tool 6: Visual Style Exploration （视觉风格探索）

### When to Use
- Before Phase 6 visual design, when direction is unclear
- User wants to compare multiple visual styles
- Team needs to align on aesthetic direction

### Output Format

```markdown
## <<产品名称>> 视觉风格探索

### 方向 A：<<风格关键词，如"科技极简">>

**情绪板描述 (Mood Board)**
<<3-5 个视觉意象，如：银色金属质感、大面积留白、几何线条>>

**色彩方案**
- 主色：#<<hex>> — <<描述>>
- 辅助色：#<<hex>> — <<描述>>
- 中性色：<<灰度范围>>

**字体建议**
- 中文：<<字体名>> — <<气质描述>>
- 英文：<<字体名>> — <<搭配理由>>

**图标风格**
<<线性/面性/双色>> + <<描述>>

**首页视觉概念描述**
<<文字描述首页的视觉效果和感受>>

**适合人群和场景**
<<描述适用的用户群和使用场景>>

---

### 方向 B：<<风格关键词，如"温暖人文">>
（同上格式）

---

### 方向 C：<<风格关键词，如"年轻潮流">>
（同上格式）

---

### 推荐
推荐 **方向 <<A/B/C>>**，理由：<<与产品定位和目标用户的匹配分析>>
```
