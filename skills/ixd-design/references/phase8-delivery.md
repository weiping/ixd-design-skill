# Phase 8: Design Delivery Document

## Objective

Package all design deliverables from Phases 1-7 into a formal, structured document suitable for handoff to development teams, stakeholders, and design reviews. Supports single-platform (mobile-only) and cross-platform (mobile + desktop) projects.

## Output Formats

| Format | Tool | Best For |
|--------|------|----------|
| Markdown (.md) | Direct output | Quick review, version control, wiki |
| Word (.docx) | Use docx skill | Formal delivery, client handoff |
| PDF (.pdf) | Use pdf skill | Read-only distribution |
| HTML report | Single-file HTML | Interactive viewing with embedded diagrams |

Default to Markdown first for review, then convert to .docx if the user needs formal delivery.

---

## Document Structure

```
<<Product Name>> Interaction Design Specification

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cover Page
  - Product name
  - Document type: Interaction Design Specification
  - Version: v1.0
  - Date: <<YYYY-MM-DD>>
  - Author: <<author name>>
  - Status: Draft / Under Review / Finalized
  - Target Platforms: iOS / Android / macOS / Windows / Web (check as applicable)

Revision History
  | Version | Date | Author | Changes |

Table of Contents (auto-generated)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 1: Design Overview
  1.1 Product Background
      → Phase 1: Product design summary
  1.2 Design Goals
      → Phase 1: Goals derived from design challenges
  1.3 Design Principles
      → Phase 1: Design principles list
  1.4 Design Scope
      → Features and pages covered in this design
  1.5 Target Platforms and Cross-Platform Strategy
      - Platform list (iOS / Android / macOS / Windows / Web)
      - Design language baseline (e.g., iOS HIG + Material baseline)
      - Consistency vs differentiation strategy (what stays consistent, what varies by platform)
      - Platform priority (which platform is the primary design baseline)
  1.6 Design References
      → Phase 1: Competitor references and learnings
  1.7 Terminology
      → Product-specific terms and abbreviations

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 2: Information Architecture
  2.1 Product Structure Diagram
      → Phase 2: Mermaid sitemap (convert to image for docx)
  2.2 Page Inventory (exhaustive, covering 22 page types, including desktop-exclusive)
      → Phase 2: Complete page inventory table
  2.3 Navigation Structure
      - Mobile navigation: Tab bar design, nav bar behavior
      - Desktop navigation: Sidebar design, top menu bar behavior
  2.4 Navigation Mapping
      → Mobile nav items ↔ Desktop nav items correspondence
      → Which mobile tabs merge into desktop sidebar groups
      → Desktop-only navigation entries (e.g., menu bar, tray menu)
  2.5 Global Components
      → Phase 2: Global component inventory
  2.6 Exhaustiveness Check
      → Coverage check for all page types
      → Desktop lifecycle pages: install wizard, auto-update, window management, tray menu

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 3: User Flows
  3.1 Core Flows Overview
      → Brief list of all flows
  3.2 Flow Details
      → Phase 3: Expand by flow number
      → Each flow: Mermaid flowchart + step table + decision points
  3.3 Exception Handling Specifications
      → General exception handling rules (network/permission/timeout)
  3.4 Desktop-Exclusive Flows
      - Install/uninstall flow (install wizard steps, uninstall confirmation and data cleanup)
      - Auto-update flow (check update, download, install restart, silent update strategy)
      - Window management flow (multi-window open/close/switch/arrange)
      - Tray behavior (minimize to tray, tray menu items, tray notification bubble)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 4: Page Interaction Specifications
  (Organized by module)

  Note: For cross-platform projects, each page should include mobile and desktop layout annotations

  4.x <<Module Name>>
    4.x.1 P01 <<Page Name>>
      → Phase 4: Complete interaction specification
      → Desktop interaction additions:
          - Hover state: button/card/list item hover feedback
          - Context menu: elements that support right-click and menu items
          - Keyboard shortcuts: supported keyboard shortcuts for this page
          - Drag: draggable elements, drop zones, drag visual feedback
          - Focus order: Tab key focus traversal order
      → Multi-window annotation: whether this page can open as independent window
    4.x.2 P02 <<Page Name>>
      → ...

  Page Onboarding and Walkthrough
      → First-time user onboarding flow
      → New feature introduction overlays
      → Onboarding steps and skip logic

  Micro-interaction Specifications
      → Button tap feedback (ripple/scale/color change)
      → Toggle switch animation
      → Input focus/blur effects
      → List item add/remove animations

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 5: Component Specifications
  5.1 Design Tokens
      → Phase 5: Color/Typography/Spacing/Radius/Shadow/Motion
  5.2 Basic Components
      → Phase 5: Button/Input/Selector, etc.
  5.3 Feedback Components
      → Phase 5: Toast/Dialog/Panel, etc.
  5.4 Desktop-Exclusive Component Specifications
      - Window title bar (custom title bar vs native, draggable area, button layout)
      - Sidebar navigation (expand/collapse, width, grouping, icon+text mode)
      - Context menu (menu item structure, dividers, submenus, disabled state)
      - Toolbar (icon button groups, dividers, overflow menu, custom arrangement)
      - Resizable split pane (drag divider, min/max width, remember last position)
      - Tooltip (trigger: hover delay, position strategy, rich text tooltip)
      - System tray menu (menu items, status icon, notification bubble)
  5.5 Responsive and Platform Adaptation
      → Phase 5: Breakpoint definitions and layout strategy
      → Desktop window specifications:
          - Minimum window size (recommended min width/height)
          - Default window size (first launch size)
          - Fullscreen layout (content max width in fullscreen/maximized)
      → Information density levels:
          - Compact: for professional tool applications
          - Comfortable: default density
          - Spacious: for content consumption applications

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 6: Visual Design
  6.1 Color System
      - Brand colors (Primary / Secondary / Accent)
      - Semantic colors (Success / Warning / Error / Info)
      - Neutral scale (N-900 → N-0)
      - Gradient schemes (if any)
      - Color accessibility check (contrast table)

  6.2 Typography System
      - Font selection (Chinese/English/Numeric/Code monospace + rationale)
      - Desktop font fallback:
          Windows: Microsoft YaHei → SimHei → sans-serif
          macOS: PingFang SC → Hiragino Sans GB → sans-serif
      - Type scale (8 levels with size/line-height/weight)
      - Typography rules (line width/paragraph spacing/mixed content/truncation)

  6.3 Icon System
      - Style definition (outline/filled/duotone/rounded + stroke width/grid)
      - Size specifications (mobile + desktop-exclusive: sidebar/toolbar/tray/menu)
      - Icon library source + custom icon list

  6.4 Illustration System
      - Illustration style (style keywords/character style/color rules)
      - Usage scenarios (empty state/onboarding/success/error/promotional)
      - Asset specifications (size/copy pairing)

  6.5 Shadow and Elevation
      - Elevation Level 0-4 (Light + Dark shadow values)
      - Usage per level

  6.6 Border Radius System
      - Radius scale (none/sm/md/lg/xl/2xl/full)
      - Mapping to component types

  6.7 Spacing and Grid
      - 4px base spacing system
      - Grid (including desktop 12-16 columns / max content width / compact spacing)
      - Page margin rules

  6.8 Key Screen Visual Annotations
      - 3-5 core pages with detailed visual annotations
      - Cross-platform products: separate annotations for mobile and desktop
      - Desktop differences (title bar/sidebar/information density/window chrome)

  6.9 Dark Mode Scheme
      - Adaptation strategy (full/core/follow system)
      - Color mapping table (Light ↔ Dark complete reference)
      - Image processing strategy
      - Desktop: follow system theme auto-switch / Windows high contrast support

  6.10 Motion Visual Specifications
      - Motion principles (2-3 items)
      - Easing curves (Standard / Decelerate / Accelerate / Spring)
      - Duration specifications (micro/component/page/complex/window animation)
      - Desktop motion notes (shorter duration/respect reduced motion setting/drag instant response)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Chapter 7: Global Interaction Specifications
  7.1 Gesture Specifications (Mobile)
      - Pull to refresh, swipe to delete, long press, double tap, pinch to zoom
      - Gesture conflict resolution rules

  7.2 Mouse and Keyboard Interaction Specifications (Desktop)
      - Global keyboard shortcut mapping table (macOS Cmd / Windows Ctrl dual-column reference)
      - Tab focus order rules (focus ring, skip decorative elements, focus trap handling)
      - Context menu specifications (context-relevant menu items, dividers, submenus)
      - Drag specifications (drag handle, drop zones, visual feedback, cancel drag)

  7.3 Transition Animation Specifications
      - Mobile: Push / Present / Slide, spring curves
      - Desktop: Fade / Crossfade, shorter duration, more restrained

  7.4 Feedback Mechanisms
      - Toast: usage scenarios, duration, position
      - Dialog: confirmation dialog, input dialog, permission dialog
      - SnackBar: undo-able operations
      - Loading: in-button / full-page / skeleton screen
      - Desktop system notifications: OS-level notifications (macOS Notification Center / Windows Action Center)

  7.5 Loading Strategy
      - Skeleton screen usage guidelines
      - Pull to refresh behavior
      - Pagination (page number / cursor / trigger condition)
      - Offline caching strategy

  7.6 Exception Handling
      - Network disconnected: <<handling method>>
      - Server error (5xx): <<handling method>>
      - Request timeout: <<handling method>>
      - Data format exception: <<fallback plan>>

  7.7 Permission Management
      - System permission request timing and copy
      - Business permission insufficient handling
      - Login session expired handling

  7.8 Push Notifications
      - Mobile push notifications (notification types, priority, tap actions, in-app notification style)
      - Desktop system notifications (OS notification center integration, Dock/taskbar badge, notification tap behavior)

  7.9 Dark Mode
      - Color mapping rules
      - Image handling (reduce brightness/use dark assets)
      - Special component adaptation
      - Desktop: follow system theme auto-switch

  7.10 Desktop Window Management Specifications
      - Minimize/maximize/fullscreen/split-screen behavior
      - Tray minimization (close window vs minimize to tray strategy)
      - Multi-window management (window list, window switching, window menu)
      - Window position and size memory (restore last window state on next launch)

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Appendix
  A. Prototype Demo
      - Single-platform project: online prototype link
      - Cross-platform project: mobile prototype link + desktop prototype link
      - Or attached prototype files

  B. Visual Style Samples
      - Core page visual mockup thumbnails
      - Light/dark mode comparison
      - Mobile/desktop comparison

  C. Design Asset Inventory
      - Icon library source
      - Illustration assets
      - Font files

  D. Development Handoff Notes
      - Annotation unit explanation (px/pt/dp conversion)
      - Animation implementation suggestions (recommended libraries/frameworks)
      - API data format suggestions
      - Cross-platform shared logic vs differences
      - Platform-specific implementation notes:
          Windows: custom title bar implementation, system tray icon
          macOS: Traffic lights customization, file association
          Web: responsive breakpoint implementation
      - Design Token mapping:
          Web: CSS Custom Properties
          Flutter: ThemeData
          iOS/macOS: Swift Asset Catalog
          Windows: WPF ResourceDictionary

  E. Page Exhaustiveness Checklist (including desktop-exclusive pages)
      → Complete numbered list of all pages, for cross-reference

  F. Keyboard Shortcut Mapping Summary
      → macOS + Windows dual-column reference table
      → Grouped by function: navigation/editing/view/file/help
```

---

## Conversion to .docx

When the user needs a formal Word document:

1. Read the docx skill: `view /mnt/skills/public/docx/SKILL.md`
2. Convert Mermaid diagrams to images first:
   - Use a Mermaid CLI or render to SVG/PNG
   - Embed as images in the document
3. Use the docx skill's table and heading patterns
4. Include a proper Table of Contents

### Mermaid to Image Conversion

```bash
# If mmdc (mermaid-cli) is available:
npx -p @mermaid-js/mermaid-cli mmdc -i diagram.mmd -o diagram.png -t default -b white

# Alternative: render as SVG in HTML, then screenshot
```

### Document Styling Recommendations

- **Font**: PingFang SC (Mac) / Microsoft YaHei (Windows) for Chinese
- **Heading colors**: Use the product's primary brand color
- **Tables**: Alternate row shading for readability
- **Page layout**: A4, 2.5cm margins, page numbers in footer
- **Header**: Product name + document title
- **Footer**: Page number + version + date

---

## Quality Checklist

Final document review:
- [ ] All 7 chapters present and populated
- [ ] Table of contents matches content
- [ ] All Mermaid diagrams rendered (not raw code)
- [ ] Page numbering is correct
- [ ] Cross-references between sections are accurate
- [ ] No placeholder text remaining
- [ ] Version number and date are current
- [ ] Terminology is consistent throughout
- [ ] Document can stand alone (no external context required)
- [ ] Cross-platform: desktop-specific chapters present (Ch3.4, Ch5.4, Ch7.2, Ch7.10)
- [ ] Cross-platform: keyboard shortcut mapping table included (Appendix F)
- [ ] Cross-platform: dual-platform navigation documented (Ch2.3 + Ch2.4)
- [ ] Cross-platform: Design Token mapping in appendix (Appendix D)
- [ ] Desktop: window management specs complete (Ch7.10)
- [ ] Desktop: keyboard interaction specs complete (Ch7.2)
- [ ] Desktop: desktop component specs complete (Ch5.4)

---

## Final Review Gate

After the quality checklist above passes, a **mandatory review gate** must be executed before the workflow is considered complete. See SKILL.md "Phase 8 — Final Review Gate" for the full procedure.

Summary:
1. Run **Interaction Walkthrough** (Tool 2) against 3-5 representative pages
2. Run **Multi-Perspective Review** (Tool 4) against the complete design
3. Save report to `doc/ixd/phase8-review-round-<N>.md`
4. **PASS** if: no walkthrough priority fixes AND no P0/P1 review items
5. **FAIL** → fix source files + document → re-review (max 3 rounds)
6. **BLOCK** after 3 failures → terminate, require human intervention