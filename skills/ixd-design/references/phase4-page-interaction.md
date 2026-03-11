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

### Section 1: Page Overview

```markdown
## P<<ID>> <<Page Name>>

**Function**: <<one-sentence description of this page's role in the product>>
**Module**: <<module name>>
**Upstream Pages**: <<pages that can navigate here>> (<<entry action>>)
**Downstream Pages**: <<pages that can be navigated to>> (<<trigger action>>)
**User Goal**: <<what the user wants to accomplish on this page>>
```

### Section 2: Layout Structure

Use ASCII art to describe the page regions. Choose the appropriate template based on target platform:

**Mobile Layout** (App / Mini-program), top to bottom:

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

**Desktop Layout** (Windows / macOS native app, Flutter/Electron desktop), multi-panel:

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

### Section 3: Component Inventory

```markdown
| ID | Component Name | Component Type | Region | Interaction | Trigger Condition | Notes |
|----|----------------|----------------|--------|-------------|-------------------|-------|
| C01 | Back Button | Icon Button | Nav Bar - Left | Tap to go back | Always visible | - |
| C02 | Search Bar | Input Field | Content Area A | Tap to go to search | Always visible | Placeholder: "Search..." |
| C03 | Content Card | Card | Content Area B | Tap to view detail | When data exists | Supports swipe-left to delete |
| C04 | Submit Button | Primary Button | Bottom Action Bar | Tap to submit form | When form validation passes | Disabled when validation fails |
```

Component types reference:
- **Button**: Primary button, Secondary button, Text button, Icon button, FAB
- **Input**: Text field, Password field, Search field, Textarea, Number input
- **Selection**: Radio, Checkbox, Switch, Dropdown, Date picker, Region picker
- **Display**: Card, List item, Tag, Badge, Avatar, Image
- **Feedback**: Toast, Dialog, Bottom Sheet, Progress bar, Skeleton screen
- **Navigation**: Nav bar, Tab bar, Breadcrumb, Segmented control, Step indicator

### Section 4: Interaction Behaviors

For each interactive component, document:

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

### Section 5: State Machine

Every page must cover these 7 states (skip if truly not applicable):

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

### Section 6: Motion Specs

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

### Section 7: Data Loading Strategy

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

### Section 8: Adaptation Rules

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

### Section 9: Interaction Walkthrough (Mandatory, Self-check Before Output)

After completing sections 1-8 and before outputting this page's interaction spec, perform a self-check against the **Interaction Walkthrough Checklist** (see auxiliary-tools.md Tool 2).
Attach the walkthrough results as a table at the end of the page interaction spec:

```markdown
| Walkthrough Item | Result | Notes |
|------------------|--------|-------|
| All buttons have clear tap feedback | ✅ Pass | — |
| Page covers all states | ⚠️ Partial | Missing partial loading state, added |
| ... | ... | ... |
```

If any items fail, revise the corresponding content in sections 1-8 before outputting the final version.

### Section 10: Micro-interaction Specifications

Identify scenarios on this page that require detailed micro-interaction design (e.g., like, favorite, delete, submit success, toggle, drag reorder, etc.), and describe each using the following template (see auxiliary-tools.md Tool 5):

```markdown
**Micro-interaction Scenario: <<scenario name, e.g., "Favorite Button">>**
1. Trigger condition: <<user taps favorite icon>>
2. Visual change: <<icon changes from outline to filled, color from N-500 to primary, size scales 120% then bounces back to 100%>>
3. Animation parameters: <<duration 300ms, Spring curve, delay 0ms>>
4. Sound/Haptic feedback: <<light haptic (mobile) / none (desktop)>>
5. State reversal: <<tap again to unfavorite, icon from filled to outline, color reverts, no bounce animation, 200ms ease-out>>
6. CSS/Code pseudo-code: <<keyframe pseudo-code>>
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
const expectedPages = readPageInventory('doc/ixd/phase2-architecture.md');
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
// Scan doc/ixd/phase4-page-specs/ for actual specs
const actualSpecs = scanDirectory('doc/ixd/phase4-page-specs/');
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

---

## Page Completeness Check

After all page specs are generated, perform a **completeness check** against the Phase 2 page inventory:

### Step 1: Read Page Inventory

```js
// Read from doc/ixd/phase2-architecture.md
// Extract the page list table to get all expected pages
const expectedPages = [
  { id: 'P01', name: 'Home', type: 'Hub', module: 'Core' },
  { id: 'P02', name: 'Product List', type: 'List', module: 'Product' },
  { id: 'P03', name: 'Product Detail', type: 'Detail', module: 'Product' },
  // ... all pages from Phase 2
];
```

### Step 2: Check Completed Page Specs

Scan `doc/ixd/phase4-page-specs/` directory to identify which pages have been documented:

```js
const completedPages = []; // List of page IDs from existing spec files

// Check each batch file for page IDs
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
3. Append to the appropriate batch file or create a new batch
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
