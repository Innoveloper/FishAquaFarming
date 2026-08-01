---
name: Oceanic Abundance
colors:
  surface: '#111124'
  surface-dim: '#111124'
  surface-bright: '#38374b'
  surface-container-lowest: '#0c0c1e'
  surface-container-low: '#1a1a2c'
  surface-container: '#1e1e31'
  surface-container-high: '#28283b'
  surface-container-highest: '#333347'
  on-surface: '#e2e0fa'
  on-surface-variant: '#bec7d3'
  inverse-surface: '#e2e0fa'
  inverse-on-surface: '#2f2f42'
  outline: '#88929d'
  outline-variant: '#3e4851'
  surface-tint: '#93ccff'
  primary: '#93ccff'
  on-primary: '#003351'
  primary-container: '#00aaff'
  on-primary-container: '#003c5d'
  inverse-primary: '#006398'
  secondary: '#c4c3eb'
  on-secondary: '#2d2d4d'
  secondary-container: '#464667'
  on-secondary-container: '#b6b5dc'
  tertiary: '#91cdfe'
  on-tertiary: '#003350'
  tertiary-container: '#6ca8d7'
  on-tertiary-container: '#003c5c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#e1dfff'
  secondary-fixed-dim: '#c4c3eb'
  on-secondary-fixed: '#181837'
  on-secondary-fixed-variant: '#434465'
  tertiary-fixed: '#cbe6ff'
  tertiary-fixed-dim: '#91cdfe'
  on-tertiary-fixed: '#001e30'
  on-tertiary-fixed-variant: '#004b72'
  background: '#111124'
  on-background: '#e2e0fa'
  surface-variant: '#333347'
  ocean-white: '#E0E0E0'
  glass-border: rgba(255, 255, 255, 0.15)
  water-glow: '#00CCFF'
typography:
  headline-display:
    fontFamily: Sora
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.5'
    letterSpacing: 0.1em
  stat-number:
    fontFamily: Sora
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 2rem
  section-padding: 8rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

The design system is engineered for an elite aquaculture brand that merges high-science precision with the raw majesty of the ocean. It targets high-net-worth investors and international partners, evoking a sense of "Cinematic Transparency"—where professional rigor meets an immersive, high-end digital experience.

The visual direction is a fusion of **Glassmorphism** and **Modern Corporate** aesthetics. The UI utilizes depth, motion, and translucent layers to simulate the clarity of high-quality water. Elements should feel like they are floating in a deep-sea environment, supported by smooth, inertia-based scrolling and organic transitions that mimic aquatic movement. 

Key visual principles:
- **Depth:** Multi-layered frosted surfaces with varying degrees of blur.
- **Precision:** Ultra-sharp typography and thin, glowing borders.
- **Atmosphere:** Subtle background gradients and reactive "ripple" motion triggers.

## Colors

The palette is anchored in a "Deep Dark & Blue Water" theme. The primary background utilizes the near-black of the deep ocean (`#050516`) to provide maximum contrast for oceanic cyan accents. 

- **Primary Cyan:** Used for interactive elements, call-to-actions, and "active" growth states.
- **Deep Navy:** Employed for card backgrounds and container surfaces to create a tiered hierarchy of depth.
- **Ocean White:** A crisp, slightly cool gray used for all primary body text and UI labels to reduce eye strain against the dark background while maintaining high legibility.
- **Glass Surfaces:** Components should utilize semi-transparent backgrounds (`rgba(6, 6, 37, 0.7)`) with a high-intensity backdrop blur (20px+) to achieve the premium frosted effect.

## Typography

This design system uses a high-contrast typographic hierarchy to balance editorial elegance with technical data.

- **Headlines (Sora):** A modern, geometric sans-serif that feels futuristic and bold. Display sizes use tight tracking to emphasize the "High-Performance" agency feel.
- **Body (Hanken Grotesk):** A sharp, contemporary face designed for readability. It maintains a professional tone for long-form investment details and technical specs.
- **Technical Labels (Space Mono):** Used for data points, business statistics, and small metadata. The monospaced nature evokes scientific precision and government compliance.

**Scaling:** On mobile, display headings should scale aggressively (approx 40-50% reduction) to ensure the immersive background remains the focal point.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous margins to allow the 3D underwater animations to breathe.

- **Desktop:** A 12-column grid with a wide 32px (2rem) gutter. Content is often center-aligned or offset to create an asymmetrical, cinematic flow.
- **Sectioning:** Large vertical spacing (`8rem`) is used between major story beats (e.g., egg to juvenile fish) to ensure scroll-triggered animations have enough runway to execute.
- **Mobile:** Transition to a 4-column grid with 16px margins. Stacked layouts are preferred to maintain the legibility of the glassmorphic cards.

## Elevation & Depth

Hierarchy is established through **Backdrop Blur** and **Tonal Layering** rather than traditional drop shadows.

1.  **Base Layer:** The immersive 3D/Video environment.
2.  **Mid Layer (Floating):** Navigation bars and secondary cards. These use a 15% opacity navy tint with a 12px blur.
3.  **Top Layer (Focus):** Primary investment cards and modals. These use a 30% opacity navy tint, a 40px blur, and a 1px "inner glow" border (white at 15% opacity) to separate the element from the background.

Shadows, when used, should be "Ambient Glows"—highly diffused cyan or navy glows that make elements appear to emit light within the water.

## Shapes

The shape language is "Sophisticated Softness." While the brand is professional and technical, the use of hard 90-degree angles is avoided to mimic the organic nature of aquatic life.

- **Standard Elements:** Buttons and input fields use a `0.5rem` radius for a modern, balanced feel.
- **Container Cards:** Investment and Species cards use `1rem` (rounded-lg) to feel like smooth, weathered sea glass.
- **Interactive Triggers:** Small UI accents (like "scroll-down" indicators or play buttons) may use pill-shapes to invite interaction.

## Components

### Buttons
- **Primary:** Solid Cyan (`#00AAFF`) with black text. On hover, a subtle cyan outer glow (water-glow) expands.
- **Secondary:** Glassmorphic background with a 1px white border (15% opacity). Text in white.

### Glass Cards
- Used for Species and Statistics. Background: `rgba(6, 6, 37, 0.4)`. Backdrop Filter: `blur(24px)`. Border: 1px solid `rgba(255, 255, 255, 0.1)`.

### Inputs & Forms
- Dark, translucent fields. The bottom border glows cyan when the field is focused. Labels use `Space Mono` for a "Data Entry" feel.

### Species Timeline
- A vertical or horizontal line with "nodes" representing lifecycle stages. Active nodes glow and trigger a localized ripple effect.

### Luxury Status Indicators
- For Government Compliance and ROI stats, use thin-stroke icons with high-contrast labels. Use the `stat-number` typography style for high-impact metrics.

### Interactive Cursor
- A custom "bubble" cursor that expands when hovering over interactive elements and leaves a faint, short-lived "wake" or trail on the background.