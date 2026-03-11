# Phase 1: Product Context

## Objective

Establish a complete design context so that all subsequent phases have a solid foundation. This is the equivalent of a design kick-off meeting.

## Step A: Socratic Discovery

Before producing any deliverable, the Socratic questioning step (defined in SKILL.md) analyzes user input and asks 0-8 targeted questions to fill critical gaps across 8 info dimensions (platform, features, users, visual style, tech stack, design system, references, positioning).

See SKILL.md "Phase 1 Step A: Socratic Discovery" for the full question generation algorithm, templates, and flow.

## Step B: Information Gathering & Deliverable Generation

### Information to Gather

Use the answers from Step A combined with the user's original input. If they provide a PRD or requirements doc, extract this information from it instead of asking.

### Required Information

| Category | Details to Collect |
|----------|-------------------|
| Product basics | Name, type (App/Web/Mini-program/PC Client/Cross-platform), target platform (iOS/Android/Web/Windows/macOS/Linux/Flutter/RN/Electron/Tauri) |
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

### How to Ask (Superseded by Socratic Discovery)

The structured questioning is now handled by SKILL.md Step A. If Step A was skipped (N=0) and the user hasn't provided a brief, use this fallback structure to fill remaining gaps:

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
## Product Design Summary

**<<product_name>>** is a <<product_type>> designed for <<target_users>>,
solving the problem of <<user_pain_point>>. Built on <<tech_platform>>,
following <<design_system>> design language, with <<N>> core modules:
<<module_list>>.
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
## Design Challenges

1. **<<challenge_name>>**: <<description, why this is a design difficulty>>
2. **<<challenge_name>>**: <<description>>
...
```

### Design Principles

Derive 3-5 design principles that will guide all subsequent decisions. Good principles are:
- Specific to this product (not generic "user-friendly")
- Actionable (can be used to resolve design debates)
- Memorable (short enough to recall)

Format:
```markdown
## Design Principles

1. **<<principle_name>>**: <<one-line explanation + specific meaning in this product>>
2. **<<principle_name>>**: <<explanation>>
...
```

Example:
```
1. **Three-Step Access**: Core features must be reachable within 3 steps from any page.
   Reflected in navigation structure design and shortcut entry placement.
```

### Design References

```markdown
## Design References

| Reference Product | Reference Dimension | Reason |
|-------------------|--------------------| -------|
| <<product_name>> | <<IA/interaction pattern/visual style/specific feature>> (must cover both interaction and visual dimensions) | <<specific explanation>> |
```

### Visual Direction Suggestions

```markdown
## Visual Direction Suggestions

- **Color Tendency**: <<primary color direction, emotional expression intent>>
- **Typography Personality**: <<font style direction, e.g., modern minimal / warm humanistic / professional rigorous>>
- **Visual Style Keywords (3-5)**: <<e.g., restrained, whitespace, rounded, tech-forward, natural>>
```

## Quality Checklist

Before moving to Phase 2, verify:
- [ ] Product positioning is clear and specific
- [ ] All user roles are identified with their primary scenarios
- [ ] Core features are scoped (not too broad, not too narrow)
- [ ] Design constraints are documented
- [ ] Design principles are specific enough to guide decisions