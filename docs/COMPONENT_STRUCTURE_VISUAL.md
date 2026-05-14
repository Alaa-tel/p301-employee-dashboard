# Component Structure Visual Guide

## Component Hierarchy Diagram

```
┌──────────────────────────────────────────────────────────┐
│                     Dashboard.vue                        │
│                   (Main Page Layout)                     │
└──────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
            ┌─────────┐  ┌─────────┐  ┌──────────────┐
            │ Header  │  │   KPIs  │  │  Workspace  │
            └─────────┘  └─────────┘  │   (Grid)    │
                                      └──────┬───────┘
                                             │
                        ┌────────────────────┼────────────────────┐
                        │                    │                    │
                        ▼                    ▼                    │
              ┌──────────────────┐  ┌──────────────────┐          │
              │   LeftPanel      │  │   RightPanel    │          │
              │   (70% width)    │  │   (30% width)   │          │
              └──────┬───────────┘  └────────┬────────┘          │
                     │                       │                   │
         ┌───────────┴──────────┐   ┌────────┴─────────┐         │
         │                      │   │                  │         │
         ▼                      ▼   ▼                  ▼         │
      SLAAlerts            MyCases  FollowUpTasks  StatsPanel   │
                                                               │
                                                        ▼
                                            ┌──────────────────┐
                                            │ BottomSection    │
                                            │ (Full Width)     │
                                            └────────┬─────────┘
                                                     │
                         ┌───────────────────────────┼───────────────────────────┐
                         │                           │                           │
                         ▼                           ▼                           ▼
                   ┌────────────┐             ┌─────────────┐          ┌──────────────────┐
                   │ QueueStatus│             │DailyMetrics │          │RecentTouchpoints │
                   │ (Chart)    │             │ (Chart)     │          │ (Timeline)       │
                   └────────────┘             └─────────────┘          └──────────────────┘
```

---

## Desktop Layout (1024px+)

```
┌─────────────────────────────────────────────────────────┐
│  Dashboard Header (Full Width)                          │
│  "Good afternoon, Sarah" | Current Time                 │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│          KPI Cards (4 cards across)                     │
│  [Active Cases] [SLA Risk] [Follow-ups] [Queue Wait]   │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│            Workspace (2-Column Grid)                    │
│  ┌──────────────────────────┬──────────────┐           │
│  │                          │              │           │
│  │   LeftPanel (70%)        │ RightPanel   │           │
│  │   ┌──────────────────┐   │ (30%)        │           │
│  │   │ SLA Alerts       │   │ ┌──────────┐ │           │
│  │   │ Panel            │   │ │ Tasks    │ │           │
│  │   └──────────────────┘   │ │ Panel    │ │           │
│  │                          │ └──────────┘ │           │
│  │   ┌──────────────────┐   │ ┌──────────┐ │           │
│  │   │ My Cases Table   │   │ │ Quick    │ │           │
│  │   │                  │   │ │ Stats    │ │           │
│  │   └──────────────────┘   │ └──────────┘ │           │
│  └──────────────────────────┴──────────────┘           │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│           BottomSection (Full Width)                    │
│  ┌─────────────────────┬──────────────────────────┐    │
│  │                     │                          │    │
│  │  QueueStatus        │   DailyMetrics           │    │
│  │  (Bar Chart)        │   (Line Chart)           │    │
│  │                     │                          │    │
│  └─────────────────────┴──────────────────────────┘    │
│  ┌────────────────────────────────────────────────┐    │
│  │  RecentTouchpoints (Timeline)                  │    │
│  │  [Email] [Call] [Chat] [Email] [Support]      │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## Tablet Layout (768px-1023px)

```
┌──────────────────────────────────────┐
│  Dashboard Header (Full Width)       │
│  "Good afternoon, Sarah"             │
│  Current Time                        │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│    KPI Cards (2 cards per row)       │
│  [Active Cases] [SLA Risk]           │
│  [Follow-ups] [Queue Wait]           │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  LeftPanel (Full Width)              │
│  ┌────────────────────────────────┐ │
│  │ SLA Alerts Panel               │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │ My Cases Table                 │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  RightPanel (Full Width)             │
│  ┌────────────────────────────────┐ │
│  │ FollowUpTasks Panel            │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │ Quick Stats Panel              │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│  BottomSection (Full Width)          │
│  ┌────────────────────────────────┐ │
│  │ QueueStatus (Single Column)    │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │ DailyMetrics (Single Column)   │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │ RecentTouchpoints              │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

---

## Mobile Layout (≤480px)

```
┌────────────────────┐
│ Dashboard Header   │
│ "Good afternoon"   │
│ Current Time       │
└────────────────────┘
┌────────────────────┐
│ KPI Cards (1 wide) │
│ [Active Cases]     │
│ [SLA Risk]         │
│ [Follow-ups]       │
│ [Queue Wait]       │
└────────────────────┘
┌────────────────────┐
│ LeftPanel          │
│ ┌────────────────┐ │
│ │ SLA Alerts     │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ My Cases       │ │
│ └────────────────┘ │
└────────────────────┘
┌────────────────────┐
│ RightPanel         │
│ ┌────────────────┐ │
│ │ Tasks          │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Quick Stats    │ │
│ └────────────────┘ │
└────────────────────┘
┌────────────────────┐
│ BottomSection      │
│ ┌────────────────┐ │
│ │ QueueStatus    │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ DailyMetrics   │ │
│ └────────────────┘ │
│ ┌────────────────┐ │
│ │ Touchpoints    │ │
│ └────────────────┘ │
└────────────────────┘
```

---

## Component Props Flow

### Dashboard → LeftPanel
```
Dashboard
  │
  props: {
    cases: Case[],
    alerts: Alert[]
  }
  │
  ▼
LeftPanel
  ├─→ SLAAlerts
  └─→ MyCases
```

### Dashboard → RightPanel
```
Dashboard
  │
  props: {
    tasks: Task[],
    dailyMetrics: DailyMetric[],
    avgQueueWait: number
  }
  │
  emit: @toggle-task
  ▲
  │
  ▼
RightPanel
  ├─→ FollowUpTasks (receives tasks)
  └─→ Stats display (uses dailyMetrics)
```

### Dashboard → BottomSection
```
Dashboard
  │
  props: {
    queues: QueueMetric[],
    metrics: DailyMetric[],
    touchpoints: Touchpoint[]
  }
  │
  ▼
BottomSection
  ├─→ QueueStatus (uses queues)
  ├─→ DailyMetrics (uses metrics)
  └─→ RecentTouchpoints (uses touchpoints)
```

---

## Component Communication

### Data Down (Props)

```
Dashboard.vue
    ↓ cases, alerts
LeftPanel.vue
    ↓ cases
  MyCases.vue
    ↓ alerts
  SLAAlerts.vue

Dashboard.vue
    ↓ tasks, dailyMetrics, avgQueueWait
RightPanel.vue
    ↓ tasks
  FollowUpTasks.vue
    ↓ stats
  StatsPanel

Dashboard.vue
    ↓ queues, metrics, touchpoints
BottomSection.vue
    ↓ queues
  QueueStatus.vue
    ↓ metrics
  DailyMetrics.vue
    ↓ touchpoints
  RecentTouchpoints.vue
```

### Events Up (Emits)

```
FollowUpTasks.vue
    ↑ @toggle-task
RightPanel.vue
    ↑ @toggle-task
Dashboard.vue
    ↑ toggleTask()
      (updates task state)
```

---

## File Organization Tree

```
src/
├── pages/
│   └── Dashboard.vue
│       ├── Imports:
│       │   ├── KPICard
│       │   ├── LeftPanel
│       │   ├── RightPanel
│       │   └── BottomSection
│       ├── Data:
│       │   ├── cases
│       │   ├── tasks
│       │   ├── touchpoints
│       │   ├── alerts
│       │   ├── queues
│       │   └── dailyMetrics
│       ├── Template:
│       │   ├── header
│       │   ├── kpi-section
│       │   ├── workspace (grid)
│       │   │   ├── LeftPanel
│       │   │   └── RightPanel
│       │   └── BottomSection
│       └── CSS:
│           └── Workspace layout
│
├── components/
│   ├── KPICard.vue
│   ├── MyCases.vue
│   ├── SLAAlerts.vue
│   ├── FollowUpTasks.vue
│   ├── QueueStatus.vue
│   ├── DailyMetrics.vue
│   ├── RecentTouchpoints.vue
│   │
│   └── panels/ (NEW)
│       ├── LeftPanel.vue
│       │   ├── Imports:
│       │   │   ├── SLAAlerts
│       │   │   └── MyCases
│       │   ├── Props:
│       │   │   ├── cases
│       │   │   └── alerts
│       │   └── CSS:
│       │       ├── left-column layout
│       │       ├── panel styling
│       │       └── responsive overrides
│       │
│       ├── RightPanel.vue
│       │   ├── Imports:
│       │   │   └── FollowUpTasks
│       │   ├── Props:
│       │   │   ├── tasks
│       │   │   ├── dailyMetrics
│       │   │   └── avgQueueWait
│       │   ├── Emits:
│       │   │   └── toggleTask
│       │   ├── Computed:
│       │   │   └── dailyMetricsTotal
│       │   └── CSS:
│       │       ├── right-column layout
│       │       ├── stats styling
│       │       └── responsive overrides
│       │
│       └── BottomSection.vue
│           ├── Imports:
│           │   ├── QueueStatus
│           │   ├── DailyMetrics
│           │   └── RecentTouchpoints
│           ├── Props:
│           │   ├── queues
│           │   ├── metrics
│           │   └── touchpoints
│           └── CSS:
│               ├── full-width layout
│               ├── charts-grid
│               └── responsive overrides
│
└── types/
    └── index.ts (Type definitions)
```

---

## Responsive Breakpoint Grid

```
Breakpoint      Width      Padding    Gap     Layout
─────────────────────────────────────────────────────────
1600px+         Ultra-wide  3rem     2rem    2-col workspace
1200-1599px     Desktop     2rem     1.5rem  2-col workspace
1024-1199px     Med-desk    1.5rem   1.25rem 2-col workspace
768-1023px      Tablet      1.25rem  1rem    1-col workspace*
481-767px       Sm-tablet   1rem     0.875rem 1-col workspace*
≤480px          Mobile      0.75rem  0.75rem  1-col workspace*

* Workspace changes to single column
```

---

## Component Dependency Map

```
Package:
  - vue
  - vuetify
  - chart.js

Dashboard.vue
  └─ Depends on:
      ├─ LeftPanel.vue
      │   └─ Depends on:
      │       ├─ SLAAlerts.vue
      │       │   └─ Alert[] type
      │       └─ MyCases.vue
      │           └─ Case[] type
      ├─ RightPanel.vue
      │   └─ Depends on:
      │       ├─ FollowUpTasks.vue
      │       │   └─ Task[] type
      │       └─ DailyMetric[] type
      └─ BottomSection.vue
          └─ Depends on:
              ├─ QueueStatus.vue
              │   └─ QueueMetric[] type
              ├─ DailyMetrics.vue
              │   └─ DailyMetric[] type
              └─ RecentTouchpoints.vue
                  └─ Touchpoint[] type

Mock Data Service
  └─ mockData.ts
      ├─ mockCases
      ├─ mockTasks
      ├─ mockAlerts
      ├─ mockQueueMetrics
      ├─ mockDailyMetrics
      ├─ mockTouchpoints
      └─ Helper functions
```

---

## Testing Structure

```
Dashboard/
├── Dashboard.vue
│   ├── Unit: Test data flows to panels
│   ├── Integration: Test event handling
│   └── E2E: Test full workflow
│
├── Panels/
│   ├── LeftPanel.vue
│   │   ├── Unit: Test alert/case rendering
│   │   └── Visual: Test responsive layout
│   │
│   ├── RightPanel.vue
│   │   ├── Unit: Test stats calculation
│   │   ├── Interaction: Test task toggle emit
│   │   └── Visual: Test responsive layout
│   │
│   └── BottomSection.vue
│       ├── Unit: Test chart rendering
│       ├── Visual: Test chart responsiveness
│       └── Visual: Test touchpoint display
```

---

**Status**: ✅ Component Refactoring Complete
