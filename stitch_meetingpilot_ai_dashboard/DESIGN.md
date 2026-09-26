---
name: Autonomous Agent Workspace
colors:
  surface: '#111319'
  surface-dim: '#111319'
  surface-bright: '#36393f'
  surface-container-lowest: '#0b0e13'
  surface-container-low: '#191c21'
  surface-container: '#1d2025'
  surface-container-high: '#272a30'
  surface-container-highest: '#32353b'
  on-surface: '#e1e2ea'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e1e2ea'
  inverse-on-surface: '#2e3036'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#111319'
  on-background: '#e1e2ea'
  surface-variant: '#32353b'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.002em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  mono-callout:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  mono-code:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-compact: 0.5rem
  margin: 1.5rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system targets technical operators, engineering leads, founders, and product teams who delegate critical operational workflows to autonomous agents. The aesthetic aligns with high-utility developer platforms and precision software: disciplined, deep dark slate canvases, ultra-crisp structural lines, high-density layouts, and focused atmospheric luminescence.

The system combines **Technical Minimalism** with **Atmospheric Layering**:
- **Utilitarian Discipline:** Interfaces maximize horizontal and vertical density without visual noise. Spacing is tight, metric-driven, and structural.
- **Controlled Luminescence:** Restrained ultraviolet and indigo glows denote active AI execution, tool dispatching, and agent thought streams, replacing intrusive decorative gradients.
- **Engineered Precision:** Crisp 1-pixel borders delineate containers, while subtle translucency and monospace data-readouts give real-time visibility into autonomous workflows.
- **Trust via Transparency:** Clear status states, visual run-logs, explicit diff displays, and deterministic agent-action states evoke absolute dependability and control.

## Colors

The palette is engineered specifically for deep-slate dark mode, avoiding pure black in favor of blue-tinted midnight slates that preserve dimensional contrast and reduce ocular strain over long operating windows.

### Surface System
- **Canvas / Base (`#0A0D12`):** Primary viewport backdrop.
- **Surface Layer 1 (`#10141D`):** Primary workspace cards, sidebar panels, and docked headers.
- **Surface Layer 2 (`#161B26`):** Secondary nested cards, input fields, and elevated rows.
- **Surface Layer 3 (`#1E2535`):** Hover states, interactive row fills, and popover backings.

### Structural Borders
- **Subtle Border (`#232A3B`):** Structural division between adjacent cards, table headers, and layout splits.
- **Prominent Border (`#2E374D`):** Focused states, active timeline bars, and popover perimeters.

### Core & Accent Tones
- **Primary AI Accent (`#6366F1` / Hover `#818CF8` / Deep `#4F46E5`):** Primary triggers, active AI agent traces, tool orchestration, and keyboard command highlights.
- **Execution Cyan (`#06B6D4`):** Active process threads, streaming transcripts, and ongoing integrations.
- **Success Emerald (`#10B981`):** Action executed, meeting items resolved, automated PR or ticket merged.
- **Attention Amber (`#F59E0B`):** Human-in-the-loop intervention required, unconfirmed action item, blocked dependency.
- **Error Rose (`#F43F5E`):** Tool failure, authorization error, dropped audio sync.

### Text & Glyph Hierarchy
- **Text Primary (`#F8FAFC`):** Direct readable text, actionable names, code tokens.
- **Text Secondary (`#94A3B8`):** Meta properties, timeline descriptions, table headers.
- **Text Muted (`#475569`):** Keyboard shortcuts, deactivated controls, structural timestamps.

## Typography

The typographic hierarchy prioritizes rapid scanning, code readability, and technical elegance:

- **Primary Typeface (`Inter`):** Deployed across all UI chrome, headings, lists, conversation transcripts, and modal dialogs. Set tight tracking on headings (`-0.015em` to `-0.025em`) to create the signature modern developer tool punchiness.
- **Technical & Runtime Typeface (`JetBrains Mono`):** Applied exclusively to functional artifacts: payload summaries, API tool execution traces, inline keyboard hotkeys (`⌘K`), raw timestamps, parameter JSON blocks, and autonomous confidence metrics.
- **Pacing & Readability:** Standard text sits at `13px` (`body-md`), favoring modern compact ergonomics over generic corporate web sizes. High contrast is preserved through `#F8FAFC` on darker elements, stepping down to `#94A3B8` for descriptive context.

## Layout & Spacing

The layout model is anchored by a high-density, multi-pane fluid workspace, characteristic of command centers and IDE-grade operational dashboards.

### Grid & Composition
- **Layout Architecture:** Fixed collapsible command rail (64px collapsed, 240px expanded), coupled with a fluid three-pane split view (Active Meeting Stream, Real-time Transcript & Reasoning Tree, Execution Sandbox / Output Staging).
- **Responsive Handling:**
  - **Desktop (>= 1280px):** 3-pane layout, 16px gutter, persistent execution log rail.
  - **Tablet (768px - 1279px):** 2-pane configuration with tabbed execution trace drawer. Gutters scale to 12px.
  - **Mobile (< 768px):** Single-pane linear stack. Command palette shifts to bottom sheet, margins reduce to `0.75rem`, secondary logs collapse behind slide-out drawers.

### Spacing Model
A strict 4px base modular scale governs internal alignment:
- `space-xs` (4px): Inline pill gaps, icon-to-label offsets, and status indicator margins.
- `space-sm` (8px): Button internal padding (vertical), list row density, and form group gaps.
- `space-md` (12px): Card internal content rhythm and sidebar item padding.
- `space-lg` (20px): Primary card body padding and inspector pane splits.
- `space-xl` (32px): Major panel groupings and view-level spacing.

## Elevation & Depth

Visual hierarchy does not use diffuse drop-shadows common in light marketing software. Depth is achieved via **tonal stacking**, **razor-thin borders**, and **localized glow diffusion**.

### Layer Hierarchy
1. **Base Plane (`#0A0D12`):** Ground level. No shadow, absolute black-slate backing.
2. **Structural Plane (`#10141D`):** Bordered with `1px solid #232A3B`. Used for persistent sidebars, cards, and data grids.
3. **Elevated Plane (`#161B26`):** Bordered with `1px solid #2E374D`. Inset shadow `inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`. Used for dropdowns, popovers, and interactive modules.
4. **Overlay Plane (`rgba(16, 20, 29, 0.85)` with `backdrop-filter: blur(12px)`):** Command palettes, quick-actions, and live meeting floatbars.

### Atmospheric Glow & Shadow
- **Passive Shadow:** Elements at Level 3 utilize a razor-sharp contact shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.6)`.
- **AI Agent Aura:** Active execution panels emit a targeted indigo radiance: `box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.35), 0 0 24px -4px rgba(99, 102, 241, 0.15)`.
- **Warning / Blocked State:** Emits an amber aura: `box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.3), 0 0 20px -4px rgba(245, 158, 11, 0.12)`.

## Shapes

The design system enforces a disciplined geometric style with soft corner radiuses (Level 1). Roundedness remains compact to preserve screen density and deliver a surgical, precision-instrument feel.

### Corner Radii Guidelines
- **Base Components (`rounded-sm` / 4px):** Code blocks, tag badges, small buttons, status indicators, and keyboard key prompts (`<kbd>`).
- **Standard Controls (`rounded` / 6px):** Standard buttons, text inputs, list-item hover boxes, dropdown menus, and avatar frames.
- **Containers & Panes (`rounded-md` / 8px):** Main interaction cards, command palette modals, and execution console windows.
- **Pills / Status Dots (`rounded-full` / 9999px):** Live meeting status indicators, autonomous run pulse dots, and participant chips.

## Components

### Buttons
- **Primary AI Execution:** Background `#6366F1`, hover `#818CF8`, text `#FFFFFF`, border `1px solid rgba(255, 255, 255, 0.15)`. Internal top shine `inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`. Padding: `6px 12px`, typography: `label-md`.
- **Secondary / Ghost:** Background `transparent`, hover `#161B26`, text `#94A3B8`, hover text `#F8FAFC`, border `1px solid #232A3B`.
- **Destructive:** Background `rgba(244, 63, 94, 0.08)`, border `1px solid rgba(244, 63, 94, 0.3)`, text `#F43F5E`, hover background `rgba(244, 63, 94, 0.16)`.

### Cards & Container Panels
- Base card background `#10141D` with border `1px solid #232A3B`. 
- Header section uses border-bottom `1px solid #232A3B` with `12px 16px` padding.
- Interactive cards feature hover transition: border shifts to `#2E374D` and background shifts to `#121722`.

### Agent Timeline Nodes & Tool Traces
- **Timeline Rail:** 1px vertical trace in `#232A3B`.
- **Node Status Indicator:** 8px circle with a 2px offset.
  - Active: `#06B6D4` with continuous 1.5s CSS pulse ring.
  - Success/Resolved: `#10B981` solid.
  - Blocked/Needs Attention: `#F59E0B` solid.
- **Code Execution Blocks:** Embedded within timeline with `#0A0D12` background, `JetBrains Mono` at `11px`, subtle border `#232A3B`, and an inline "Copy Diff" action button.

### Badge Pills
- Compact height (`20px`), radius `4px`, padding `0 6px`, typography `label-sm`.
- **AI Processing:** Background `rgba(99, 102, 241, 0.12)`, text `#818CF8`, border `1px solid rgba(99, 102, 241, 0.24)`.
- **Autonomous Action Resolved:** Background `rgba(16, 185, 129, 0.1)`, text `#10B981`, border `1px solid rgba(16, 185, 129, 0.2)`.
- **Human Review Required:** Background `rgba(245, 158, 11, 0.1)`, text `#F59E0B`, border `1px solid rgba(245, 158, 11, 0.2)`.

### Input Fields & Command Palette
- **Text Field:** Height `34px`, background `#10141D`, border `1px solid #232A3B`, text `#F8FAFC`, placeholder `#475569`. Focus: border `#6366F1`, glow `0 0 0 1px #6366F1`.
- **Command Palette (`⌘K`):** Floating overlay, width `640px`, backdrop blur `16px`, background `rgba(16, 20, 29, 0.9)`, border `1px solid #2E374D`, shadow `0 20px 48px -8px rgba(0, 0, 0, 0.7)`. Includes instant search, action preview chips, and keyboard shortcut hints.

### Checkboxes & Action Toggles
- **Checkbox:** Square `14px`, border `1px solid #2E374D`, radius `3px`, background `#0A0D12`. Checked: background `#6366F1`, border `#6366F1`, tick mark in `#FFFFFF`.
- **Agent Auto-Approve Toggle:** 28px width, 16px height track. Off: `#1E2535`. On: `#10B981` with internal white slider knob.