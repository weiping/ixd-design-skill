# Auxiliary Design Tools

These tools can be used at any point during the workflow, independent of the phase structure.

---

## Tool 1: Competitor Analysis

### When to Use
- User mentions a competitor product
- Need to establish design patterns before starting
- User asks "how does X handle this?"

### Analysis Framework

```markdown
## <<Competitor Name>> — <<Feature Module>> Interaction Analysis

### 1. Information Architecture
- Page hierarchy and structure for this feature
- Navigation patterns

### 2. Core Flows
- Number of steps to complete main task
- Flowchart (Mermaid)

### 3. Interaction Highlights ✅
- Notable interaction details worth borrowing (with specific descriptions)

### 4. Visual Character 🎨
- Color/typography/icon/motion design characteristics
- Visual brand expression approach

### 5. Shortcomings ⚠️
- Interaction and visual issues that could be improved (with improvement suggestions)

### 6. Design Insights
- What we can borrow
- What we need to differentiate
```

---

## Tool 2: Design Heuristic Review

### When to Use
- After completing Phase 4 page specs
- Before finalizing the prototype
- When the user asks "Is this design good enough?"

### Checklist

Run against each page spec:

```markdown
## <<Page Name>> Interaction Walkthrough

### Basic Interactions
- [ ] Do all buttons have clear tap feedback?
- [ ] Do all input fields have validation rules and error messages?
- [ ] Do critical actions have confirmation dialogs?
- [ ] Do irreversible actions have warnings?
- [ ] Do gesture interactions have discoverability hints?

### Page States
- [ ] Does the page cover all states (default/loading/empty/error/partial/edit)?
- [ ] Is there a progress indicator for load times over 1 second?
- [ ] Is there an offline fallback when network is interrupted?
- [ ] Is scroll position and previous state restored when returning to page?

### Navigation and Flow
- [ ] Is the back path clear and predictable?
- [ ] Is current location clearly indicated (highlighted tab/breadcrumb/title)?
- [ ] Can user correctly return after navigating to external pages?
- [ ] Is there draft saving/retention prompt when exiting multi-step flow mid-way?

### Forms and Input
- [ ] Do forms support auto-save draft/exit retention?
- [ ] Do input fields support system autofill?
- [ ] Are long forms grouped or have anchor navigation?
- [ ] Is filled content preserved after submit failure?

### Data Loading
- [ ] Do lists have pagination/load more/infinite scroll strategy?
- [ ] Does pull-to-refresh have clear visual feedback and completion notice?
- [ ] Do cached data have freshness indicators (e.g., "updated 5 minutes ago")?
- [ ] Is virtual scrolling/lazy loading considered for large datasets?

### Content Display
- [ ] Are there truncation rules for long text (single-line ellipsis/multi-line/expand-collapse)?
- [ ] Is there placeholder/fallback for failed image loads?
- [ ] Do empty state messages have call-to-action (CTA button/link)?
- [ ] Is there distinction between "no data" and "data not loaded"?

### Visual and Brand
- [ ] Does text meet WCAG AA contrast requirements?
- [ ] Is visual hierarchy clear (heading > body > secondary text)?
- [ ] Is brand color usage restrained (5-15% area coverage)?
- [ ] Are there dark mode color adaptations?
- [ ] Is dynamic font size supported?

### Touch and Click
- [ ] Are touch targets at least 44×44pt? (Desktop click targets at least 32×32px?)
- [ ] Is there sufficient spacing between adjacent clickable elements (≥8px)?
- [ ] Is clickable area larger than visual area (expanded hit area)?

### Desktop-Exclusive — PC Client
- [ ] Is complete keyboard navigation supported (Tab/Shift+Tab/Enter/Esc)?
- [ ] Is focus indicator clearly visible and consistently styled?
- [ ] Is there hover state visual feedback on all interactive elements?
- [ ] Are context menus provided in reasonable scenarios? Are menu items complete?
- [ ] Does layout respond correctly to window resizing (no overflow/misalignment)?
- [ ] Are system-level shortcuts supported (Cmd/Ctrl+C/V/Z/A/S, etc.)?
- [ ] Do draggable elements have drag handles or cursor change hints?
- [ ] Is there drop zone indication and drag preview during drag?
- [ ] Is data synchronized across multiple windows?
- [ ] Do tooltips have reasonable delay (show 300-500ms / hide on mouse leave)?

### Cross-Platform Consistency — Cross-Platform Products
- [ ] Are operation steps equivalent for same feature on mobile and desktop?
- [ ] Do mobile gestures have corresponding mouse/keyboard alternatives on desktop?
- [ ] Are page states and data synchronized across platforms?
- [ ] Is brand expression (color/icon/illustration) consistent across platforms?
```

### Scoring

After the checklist, generate a summary score:

```markdown
### Walkthrough Score

| Dimension | Pass/Total | Score |
|-----------|------------|-------|
| Basic Interactions | /5 | % |
| Page States | /4 | % |
| Navigation and Flow | /4 | % |
| Forms and Input | /4 | % |
| Data Loading | /4 | % |
| Content Display | /4 | % |
| Visual and Brand | /5 | % |
| Touch and Click | /3 | % |
| Desktop-Exclusive | /10 | % |
| Cross-Platform Consistency | /4 | % |
| **Overall** | **/47** | **%** |

### Priority Fixes
1. <<Most critical issue to fix>>
2. <<Secondary fix item>>
```

---

## Tool 3: A/B Design Comparison

### When to Use
- Complex feature with multiple valid approaches
- Team cannot decide between two directions
- User explicitly asks for alternatives

### Output Format

```markdown
## <<Feature Description>> Interaction Comparison

### Option A: <<Option A Name>> (<<Design Tendency>>)

**Design Rationale**
<<One paragraph describing design philosophy and tradeoffs>>

**User Flow**
(Mermaid flowchart)

**Key Pages**
<<Key page layout descriptions>>

**Visual Differences** (if any)
<<Visual style differences from other options: color/typography/information density/brand expression>>

**Advantages**
- <<Advantage 1>>
- <<Advantage 2>>

**Disadvantages**
- <<Disadvantage 1>>
- <<Disadvantage 2>>

---

### Option B: <<Option B Name>> (<<Design Tendency>>)
(same format as above)

---

### Comparison Analysis

| Dimension | Option A | Option B |
|-----------|----------|----------|
| Task step count | <<N>> steps | <<M>> steps |
| Learning curve | <<High/Medium/Low>> | <<High/Medium/Low>> |
| Operation efficiency | <<Evaluation>> | <<Evaluation>> |
| Information completeness | <<Evaluation>> | <<Evaluation>> |
| Development complexity | <<Evaluation>> | <<Evaluation>> |
| Suitable user segment | <<Description>> | <<Description>> |

### Recommendation
Recommend **Option <<A/B>>**, reason: <<Specific explanation>>
```

---

## Tool 4: Multi-Perspective Review

### When to Use
- Before finalizing a design
- When user wants to stress-test the design
- For complex or high-stakes features

### 6 Perspectives

```markdown
## <<Feature/Page>> Multi-Perspective Review

### 👶 First-time User Perspective
**Question**: Can a first-time user understand and complete the task?
- Praise: <<2 positive points>>
- Improvements: <<2 improvement suggestions>>

### 🏃 Power User Perspective
**Question**: Is it efficient enough for daily use 10+ times?
- Praise: <<2 positive points>>
- Improvements: <<2 improvement suggestions>>

### ♿ Accessibility User Perspective
**Question**: Can users relying on assistive technology use it normally?
- Praise: <<2 positive points>>
- Improvements: <<2 improvement suggestions>>

### 💻 Frontend Developer Perspective
**Question**: Is this design technically feasible and reasonable?
- Praise: <<2 positive points>>
- Improvements: <<2 improvement suggestions>>

### 🧪 QA Engineer Perspective
**Question**: Is the test coverage for this design complete?
- Praise: <<2 positive points>>
- Improvements: <<2 improvement suggestions>>

### 🎨 Brand Designer Perspective
**Question**: Does visual expression match brand tone? Is a unified design language established?
- Praise: <<2 positive points>>
- Improvements: <<2 improvement suggestions>>

### Prioritized Improvements

| Priority | Improvement Item | Source Perspective | Impact Scope |
|----------|------------------|-------------------|--------------|
| P0 (Must) | <<Improvement>> | <<Perspective>> | <<Impact description>> |
| P1 (Important) | <<Improvement>> | <<Perspective>> | <<Impact description>> |
| P2 (Nice to have) | <<Improvement>> | <<Perspective>> | <<Impact description>> |
```

---

## Tool 5: Micro-Interaction Design

### When to Use
- User asks to design a specific interaction detail
- Polishing phase of the prototype
- Designing delightful moments

### Output Format

```markdown
## Micro-Interaction: <<Scenario Name>>

### 1. Trigger Condition
<<What operation triggers this micro-interaction, mobile and desktop separately>>

### 2. Visual Change
1. **Initial state**: <<Description>>
2. **Transition process**: <<Describe color/size/position/opacity changes>>
3. **Final state**: <<Description>>

### 3. Animation Parameters
- Duration: <<ms>>
- Easing: <<Curve name or cubic-bezier value>>
- Delay: <<ms, if any>>
- Loop: <<Whether it loops>>

### 4. Sound/Haptic Feedback
- Mobile haptic: <<None / Light haptic / Standard haptic>>
- Desktop sound: <<None / System sound / Custom sound>>

### 5. State Reversal
<<Is reverse animation different from forward, describe differences>>

### 6. Desktop Additions
- Hover preview state: <<Description>>
- Cursor change: <<Description>>
- Keyboard trigger: <<Description>>

### 7. CSS/Code Pseudocode
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

| Scenario | Trigger | Core Animation |
|----------|---------|----------------|
| Like/Favorite | tap | scale bounce + color fill |
| Pull to refresh | pull | stretch + spin + snap back |
| Swipe to delete | swipe left | reveal action + slide out |
| Loading button | tap submit | width shrink + spinner + expand |
| Drag to reorder | long press + drag | lift shadow + reorder animation |
| Toggle switch | tap toggle | thumb slide + track color transition |

---

## Tool 6: Visual Style Exploration

### When to Use
- Before Phase 6 visual design, when direction is unclear
- User wants to compare multiple visual styles
- Team needs to align on aesthetic direction

### Output Format

```markdown
## <<Product Name>> Visual Style Exploration

### Direction A: <<Style Keywords, e.g., "Tech Minimal">>

**Mood Board Description**
<<3-5 visual images, e.g., silver metallic texture, generous whitespace, geometric lines>>

**Color Scheme**
- Primary: #<<hex>> — <<Description>>
- Secondary: #<<hex>> — <<Description>>
- Neutral: <<Grayscale range>>

**Typography Suggestion**
- Chinese: <<Font name>> — <<Character description>>
- English: <<Font name>> — <<Pairing rationale>>

**Icon Style**
<<Outline/Filled/Duotone>> + <<Description>>

**Home Visual Concept Description**
<<Text description of homepage visual effect and feel>>

**Suitable Audience and Scenarios**
<<Describe applicable user segments and usage scenarios>>

---

### Direction B: <<Style Keywords, e.g., "Warm Humanistic">>
(same format as above)

---

### Direction C: <<Style Keywords, e.g., "Young Trendy">>
(same format as above)

---

### Recommendation
Recommend **Direction <<A/B/C>>**, reason: <<Analysis of match with product positioning and target users>>
```