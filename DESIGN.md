---
name: Grand Atelier
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c2c8c4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8c928e'
  outline-variant: '#424845'
  surface-tint: '#b5ccc2'
  primary: '#b5ccc2'
  on-primary: '#20342d'
  primary-container: '#061a14'
  on-primary-container: '#6f857c'
  inverse-primary: '#4e635b'
  secondary: '#e4c098'
  on-secondary: '#422c0f'
  secondary-container: '#5b4223'
  on-secondary-container: '#d2af88'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#171717'
  on-tertiary-container: '#81807f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d1e8dd'
  primary-fixed-dim: '#b5ccc2'
  on-primary-fixed: '#0b1f19'
  on-primary-fixed-variant: '#374b43'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#e4c098'
  on-secondary-fixed: '#2a1701'
  on-secondary-fixed-variant: '#5b4223'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 44px
    fontWeight: '600'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style
The design system embodies the "Grand Atelier" aesthetic—a fusion of high-fashion editorial prestige and modern architectural precision. It is designed for an audience that values exclusivity, craftsmanship, and quiet luxury.

The style is **Neo-Minimalist with Luxury Accents**, characterized by:
- **Atmospheric Depth:** A foundation of deep, expansive dark tones punctuated by luminous, high-contrast surfaces.
- **Editorial Composition:** Extreme use of whitespace (negative space) to frame content as if it were a curated gallery piece.
- **Precision Detailing:** Micro-interactions and borders that mimic fine jewelry or high-end horology.
- **Tactile Elegance:** A sense of physical weight achieved through deliberate typographic pacing and subtle tonal layering.

## Colors
The palette is built on high-contrast sophistication, moving away from standard blacks and whites toward more pigmented, luxurious hues.

- **Midnight Emerald (#061a14):** The primary canvas. Use this for deep backgrounds to evoke mystery and prestige.
- **Burnished Gold (#c5a37d):** The accent of craftsmanship. Reserved for critical interactive elements, icons, and signature borders. It should be used sparingly to maintain its value.
- **Luminous Alabaster (#fcf9f8):** The secondary surface. Used for high-contrast "moments"—cards, panels, or sections that need to stand out against the dark primary background.
- **Text & UI Tones:** Main body text on dark surfaces should use Alabaster at 90% opacity. On Alabaster surfaces, use Midnight Emerald for maximum legibility.

## Typography
Typography is the cornerstone of this design system, utilizing a sharp contrast between classical serif forms and technical sans-serifs.

- **Headlines:** Use **Bodoni Moda**. It provides high-contrast strokes that feel like a fashion masthead. It should be typeset with tight tracking for a modern, aggressive look in larger sizes.
- **UI Elements & Body:** Use **Hanken Grotesk**. This refined sans-serif should be widely tracked (0.05em to 0.15em) when used for labels and navigation to evoke a sense of airy, premium space.
- **Scale:** Maintain a dramatic scale difference between titles and body text to emphasize the editorial nature of the layout.

## Layout & Spacing
The layout follows a **Fixed-Width Editorial Grid** centered in the viewport.

- **Rhythm:** An 8px base unit is used, but large-scale components should favor "Macro-spacing." Section gaps of 120px to 160px are encouraged to give content breathing room.
- **Grid:** A 12-column grid for desktop with wide 32px gutters. Elements should often be offset (e.g., a 6-column text block centered with 3 empty columns on either side) to mimic magazine layouts.
- **Mobile:** Transition to a 4-column grid. Margins compress, but vertical breathing room (section-gap) should remain significant to preserve the premium feel.

## Elevation & Depth
In this design system, depth is achieved through **Material Contrast** rather than traditional shadows.

- **Layering:** Midnight Emerald is the base level. Luminous Alabaster surfaces sit "above" it. 
- **Borders:** Instead of heavy shadows, use ultra-thin (0.5px - 1px) borders in Burnished Gold or a 10% Alabaster tint to define edges.
- **Glassmorphism:** Use sparingly for navigation overlays. A heavy backdrop blur (20px+) with a 5% Alabaster tint creates a "frosted crystal" effect that feels expensive.
- **Shadows:** If required for utility (e.g., floating buttons), use an ambient, highly diffused shadow (30px-50px blur) with a color tint derived from the Midnight Emerald background to avoid a "muddy" appearance.

## Shapes
The shape language is **Architectural and Sharp**.

- **Corners:** 0px radius (Sharp) is the default for all primary containers, buttons, and input fields. This conveys a sense of rigorous, bespoke tailoring.
- **Interactive Elements:** While containers are sharp, inner elements like small tags or chips may use a subtle 1px radius to prevent a "hostile" feel, but 0px remains the signature look of the design system.
- **Dividers:** Use hairline-thin horizontal and vertical rules to separate content, echoing the structure of a blueprint or a high-end editorial spread.

## Components
- **Buttons:** Primary buttons use a solid Burnished Gold background with Midnight Emerald text. Typography must be `label-caps`. Secondary buttons are "Ghost" style with a 1px Burnished Gold border and no fill.
- **Cards:** Use Luminous Alabaster for cards when they need to stand out, or a subtle tonal shift (Midnight Emerald at 105% brightness) for a stealthier look. Borders should be strictly 1px.
- **Input Fields:** Bottom-border only. When focused, the border transitions from a muted emerald to Burnished Gold. Use `label-caps` for floating labels.
- **Lists:** High vertical padding (24px+) between items. Use Burnished Gold "hairline" dividers between list items.
- **Navigation:** Top navigation should be minimal. Use the wide-tracked Hanken Grotesk for links. The active state is indicated by a simple Burnished Gold dot or a fine underline.
- **Imagery:** Photos should have a consistent desaturated or high-contrast grade to match the emerald and gold palette.