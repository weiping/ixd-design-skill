# Phase 1: Product Context （产品上下文建立）

## Objective

Establish a complete design context so that all subsequent phases have a solid foundation. This is the equivalent of a design kick-off meeting.

## Information to Gather

Ask the user for the following. If they provide a PRD or requirements doc, extract this information from it instead of asking.

### Required Information

| Category | Details to Collect |
|----------|-------------------|
| Product basics | Name, type (App/Web/Mini-program/PC客户端/Cross-platform), target platform (iOS/Android/Web/Windows/macOS/Linux/Flutter/RN/Electron/Tauri) |
| Positioning | One-sentence value proposition |
| Target users | Primary user roles (2-3), core usage scenarios, tech literacy level, age range |
| Core features | 3-7 feature modules with brief descriptions |
| Design constraints | Design system (MD3/HIG/Ant Design/Fluent Design/macOS HIG/custom), brand colors, existing design assets, tech framework (including desktop: Flutter/Electron/Tauri/Swift/WPF), performance requirements |
| References | 1-3 competitor products with specific aspects to reference |

### Optional but Valuable

- Business model (affects monetization touchpoints in the design)
- Launch timeline (affects design complexity decisions)
- Team size and capabilities (affects component granularity)
- Existing user research or personas

## How to Ask

If the user hasn't provided a brief, guide them with this structure:

```
To design the best interaction experience, I need some product context.
You can answer in any format — bullet points, stream of consciousness, or even paste an existing PRD.

1. What's the product? (name, platform, one-line description)
2. Who uses it? (main user roles and their scenarios)
3. What are the core features? (3-7 key modules)
4. Any design constraints? (design system, brand, tech stack)
5. Any products to reference? (competitors or inspirations)
```

If the user provides partial info, ask targeted follow-up questions for the gaps.

## Output Format

### Product Design Brief

```markdown
## 产品设计摘要

**<<产品名称>>** 是一款面向 <<目标用户>> 的 <<产品类型>>，
核心解决 <<用户痛点>> 的问题。产品基于 <<技术平台>> 构建，
遵循 <<设计规范>> 设计语言，主要包含 <<N>> 个功能模块：
<<模块列表>>。
```

### Design Challenges

Identify 3-5 key design challenges specific to this product. Think about:
- User complexity (multiple roles with different needs?)
- Information density (too much data to display?)
- Task complexity (multi-step workflows?)
- Platform constraints (cross-platform consistency?)
- Competitive differentiation (how to stand out?)

Format:
```markdown
## 设计挑战

1. **<<挑战名称>>**：<<具体描述，为什么这是一个设计难点>>
2. **<<挑战名称>>**：<<具体描述>>
...
```

### Design Principles

Derive 3-5 design principles that will guide all subsequent decisions. Good principles are:
- Specific to this product (not generic "user-friendly")
- Actionable (can be used to resolve design debates)
- Memorable (short enough to recall)

Format:
```markdown
## 设计原则

1. **<<原则名称>>**：<<一句话解释 + 在本产品中的具体含义>>
2. **<<原则名称>>**：<<解释>>
...
```

Example:
```
1. **三步可达**：核心功能从任何页面出发，3 步内必须可以触达。
   体现在导航结构设计和快捷入口的设置上。
```

### Design References

```markdown
## 设计参考

| 参考产品 | 参考维度 | 借鉴理由 |
|---------|---------|---------|
| <<产品名>> | <<信息架构/交互模式/视觉风格/特定功能>>（需涵盖交互和视觉两个维度） | <<具体说明>> |
```

### 视觉方向建议

```markdown
## 视觉方向建议

- **色彩倾向**：<<主色调方向、情感表达意图>>
- **字体气质**：<<字体风格方向，如现代简约/人文温暖/专业严谨>>
- **视觉风格关键词（3-5 个）**：<<如：克制、留白、圆润、科技感、自然>>
```

## Quality Checklist

Before moving to Phase 2, verify:
- [ ] Product positioning is clear and specific
- [ ] All user roles are identified with their primary scenarios
- [ ] Core features are scoped (not too broad, not too narrow)
- [ ] Design constraints are documented
- [ ] Design principles are specific enough to guide decisions

