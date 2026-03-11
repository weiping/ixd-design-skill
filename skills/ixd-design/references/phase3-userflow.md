# Phase 3: User Flows

## Objective

Design task-oriented flow diagrams for 3-5 core user scenarios. This is the equivalent of Modao's "flow connector" feature.

## How to Identify Core Tasks

Ask the user or derive from the feature list. Good core tasks are:
- **High frequency**: Tasks users perform most often
- **High value**: Tasks that directly deliver the product's value proposition
- **High complexity**: Tasks with multiple steps or decision points
- **Onboarding**: First-time user experience

Example task patterns:
- New user: Register → Onboard → Complete first core action
- Returning user: Search → Browse → Take action → See result
- Transaction: Select → Configure → Confirm → Pay → Track
- Desktop cold start: Download → Install wizard → First launch → Config wizard → Main workspace
- Desktop auto-update: Check update → Prompt user → Background download → Install → Restart

---

## Deliverable 1: Mermaid Flowchart

For each core task, produce a `flowchart TD` diagram.

### Flowchart Conventions

```
Node shapes:
  ([  ]) = Start / End (stadium shape)
  [  ]   = Page / Screen
  {  }   = Decision point
  [[  ]] = System process (backend)
  >  ]   = Async event / notification

Arrow types:
  -->    = Normal flow (solid)
  -.->   = Error / alternative path (dashed)
  ==>    = Highlighted / critical path (thick)

Labels:
  -->|label| = Condition on the arrow
```

### Example Flowchart

```mermaid
flowchart TD
    Start([User opens App]) --> A{Logged in?}
    A -->|Yes| B[Home]
    A -->|No| C[Login Page]

    C --> D{Login method}
    D -->|Phone| E[Enter phone number]
    E --> F[Enter verification code]
    F --> G{Verification passed?}
    G -->|Yes| H{New user?}
    G -->|No| F
    G -.->|3 failures| I[Account locked message]

    H -->|Yes| J[Complete profile]
    H -->|No| B
    J --> B

    B --> K[Browse content list]
    K --> L[Content detail]
    L --> M{Action choice}
    M -->|Save| N[[Save to favorites]]
    M -->|Share| O[Share panel]
    M -->|Back| K

    N --> P[Toast: Saved successfully]
    P --> L

    End([Flow ends])
```

### Flowchart Patterns to Cover

For each task, the flowchart must show:

1. **Happy path** (solid arrows): The ideal flow when everything works
2. **Error paths** (dashed arrows): Network failure, validation error, permission denied
3. **Decision branches**: Login state, user role, data conditions
4. **Loading states**: Where the system needs time to respond (mark with `[[process]]`)
5. **Exit points**: Where users might abandon the flow

---

## Deliverable 2: Step Table

For each flowchart, provide a detailed step table:

```markdown
| Step | Page/Component | User Action | System Response | Exception Handling | Time Estimate |
|------|----------------|-------------|-----------------|-------------------|---------------|
| 1 | App Launch | Tap app icon | Show splash → Check login state | - | < 2s |
| 2 | Login Page | Enter phone number | Real-time format validation | Format error: red hint | - |
| 3 | Login Page | Tap get code | Send SMS + 60s countdown | Network fail: Toast, retry | < 1s |
| 4 | Login Page | Enter code | Auto-submit verification | Code error: clear + hint | < 2s |
| 5 | Home | - | Load home data (skeleton) | Load fail: error state + retry | < 3s |
```

### Time Estimate Guidelines

| Operation Type | User Expectation | Timeout Handling |
|----------------|------------------|------------------|
| Page transition | < 300ms | No loading needed |
| Local data load | < 1s | Skeleton screen |
| Network request | < 3s | Skeleton + loading indicator |
| Complex calc/upload | < 10s | Progress bar |
| Background process | > 10s | Polling / Push notification |

---

## Deliverable 3: Key Decision Points

For each decision node in the flowchart, document the business logic:

```markdown
## Key Decision Points

### Decision Point 1: Login State Check
- **Condition**: Check if local token exists and is not expired
- **Yes**: Go directly to home
- **No**: Redirect to login page
- **Edge case**: Token expired but refresh token exists → Silent refresh

### Decision Point 2: New/Returning User Check
- **Condition**: Server returns is_new_user field
- **New user**: Enter onboarding flow (complete profile → tutorial)
- **Returning user**: Go directly to home
- **Edge case**: Returning user on new device → Not counted as new user
```

---

## Common Flow Templates

### Registration / Onboarding
```
Start → Login method selection → Credential input → Verification →
  → New user? → Yes: Profile setup → Tutorial → Home
              → No: Home
```

### Search & Browse
```
Start → Search input → Search results → Filter/sort →
  → Item detail → Action (save/share/purchase) → Result feedback
```

### Transaction / Purchase
```
Start → Item selection → Cart/configuration → Confirm order →
  → Payment method → Payment processing → Success/Failure →
  → Order tracking
```

### Content Creation / Publishing
```
Start → Create/Edit → Preview → Submit →
  → Review status → Published / Revision needed
```

### Desktop Installation & Update
```
Start → Download installer → Run installer → Installation options →
  → Installing (progress) → First launch → Config wizard → Main workspace

Update: Check for updates → Update available prompt →
  → User accepts → Background download → Ready to install →
  → Restart & apply → Updated workspace
```

---

## Quality Checklist

Before moving to Phase 4:
- [ ] 3-5 core tasks covered with flowcharts
- [ ] Happy path is clearly marked for each flow
- [ ] At least 2 error/exception paths per flow
- [ ] Every decision node has documented business logic
- [ ] Step table includes time estimates
- [ ] No dead-end nodes (every path reaches an end or loops back)
- [ ] Mermaid flowcharts render correctly