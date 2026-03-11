# IxD Design Skill v1.0 — Quick Reference

## 8-Phase Workflow

```
P1 → P2 → P3 → P4 → P5 → P6 → P7 → P8
上下文 架构  流程  交互说明 组件  视觉  原型  交付
```

## Natural Language Quick-Start

| User says | Start Phase |
|-----------|-------------|
| 从阶段N开始 | Phase N |
| 帮我设计一个App | Phase 1 |
| 我有PRD了 | Phase 2 |
| 画用户流程图 | Phase 3 |
| 设计这个页面 | Phase 4 |
| 整理组件规范 | Phase 5 |
| 做视觉方案/配色 | Phase 6 |
| 做可点击原型 | Phase 7 |
| 写设计文档 | Phase 8 |

## File Map

```
ixd-design/
├── SKILL.md                       ← 主入口
├── INSTALL.md                     ← 安装说明
├── references/
│   ├── phase1-context.md          ← 产品上下文
│   ├── phase2-architecture.md     ← 信息架构（22类页面）
│   ├── phase3-userflow.md         ← 用户流程
│   ├── phase4-page-interaction.md ← 页面交互说明（10节交互规格）
│   ├── phase5-components.md       ← 组件规范
│   ├── phase6-visual.md           ← 视觉设计（10维度）
│   ├── phase7-prototype.md        ← 原型代码模式
│   ├── phase8-delivery.md         ← 交付文档
│   ├── auxiliary-tools.md         ← 辅助工具
│   └── quickref.md                ← 本文件
└── templates/
    └── prototype-shell.js         ← 原型框架
```

## Key Numbers

| Metric | Value |
|--------|-------|
| Touch target (mobile) | ≥ 44×44pt |
| Click target (desktop) | ≥ 32×32px |
| Contrast ratio | ≥ 4.5:1 (WCAG AA) |
| Page depth | ≤ 4 levels |
| Core task reach | ≤ 3 taps |
| Loading indicator | > 1s |
| Timeout | 10s |
| Toast duration | 2s |
| Debounce | 300ms |
| Brand color area | 5-15% |
| Micro animation | 100-200ms |
| Page transition | 300-400ms |
| Page types | 22 types |
| Page states | 7 states |
| Walkthrough sections | 10 |
| Visual dimensions | 10 |

## Cross-Platform Note

跨平台产品（移动端 + 桌面端）需为每个页面输出双端原型，确保交互对等、数据同步、品牌统一。
