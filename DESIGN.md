---
name: Academic Excellence System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#44464f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#757781'
  outline-variant: '#c4c6d1'
  surface-tint: '#455d95'
  primary: '#000d2c'
  on-primary: '#ffffff'
  primary-container: '#002157'
  on-primary-container: '#738ac6'
  inverse-primary: '#b0c6ff'
  secondary: '#176c40'
  on-secondary: '#ffffff'
  secondary-container: '#a0f1b9'
  on-secondary-container: '#1d7044'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca830'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001946'
  on-primary-fixed-variant: '#2c457c'
  secondary-fixed: '#a3f4bc'
  secondary-fixed-dim: '#88d8a1'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522d'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  title-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is engineered for a premium educational institution that balances traditional academic rigor with modern technological fluency. The brand personality is authoritative yet accessible, positioning the institution as a prestigious gateway to professional success. 

The visual style is **Corporate Modern** with a focus on **Minimalism**. It utilizes expansive white space to denote clarity of thought, accented by deep, trustworthy blues and high-performance greens reminiscent of professional productivity tools. The inclusion of gold accents elevates the experience, signaling achievement and excellence. The UI should feel structured, precise, and high-value, evoking the same sense of reliability one finds in industry-standard professional software.

## Colors
The palette is anchored by **Deep Navy (#002157)**, providing an institutional foundation of trust and permanence. **Excel Green (#217346)** is used for primary actions and growth-related indicators, bridging the gap between education and professional utility. 

**Premium Gold (#D4AF37)** is reserved strictly for high-value moments: badges, certification headers, and "Aspire" milestones. Backgrounds should remain predominantly **White (#FFFFFF)** or **Off-White (#F8F9FA)** to maintain a clean, academic atmosphere. Text contrast must always meet AAA standards against these light surfaces to ensure maximum readability for educational content.

## Typography
This design system employs a dual-font strategy. **Montserrat** is used for headlines to convey confidence and modern authority; its geometric nature feels structured and stable. **Inter** is used for all body copy and UI elements to ensure peak legibility across dense educational data and long-form reading.

For mobile, headlines scale down aggressively to prevent awkward line breaks, while body sizes remain constant to preserve accessibility. Use "label-caps" for small metadata tags or category identifiers above headings to create a clear information hierarchy.

## Layout & Spacing
The system follows a **Fixed Grid** philosophy for desktop to maintain a scholarly, "journal-like" structure, centering content within a 1200px max-width container. A strict 8px spacing scale (Base 8) ensures mathematical harmony between elements.

- **Desktop:** 12-column grid with 24px gutters. Large vertical gaps (stack-lg) are used between major content sections to prevent visual fatigue.
- **Mobile:** Single column with 16px side margins. Elements should be "stacked" with consistent 24px vertical rhythm (stack-md).
- **Alignment:** All text-heavy components should be left-aligned to mimic traditional academic layouts, while "Hero" sections may use centered alignment for impact.

## Elevation & Depth
To maintain a clean and professional look, depth is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Surface):** The main background, pure white or light grey.
- **Level 1 (Card):** Defined by a subtle 1px border (#E2E8F0) rather than a shadow. This keeps the interface looking "flat" and modern.
- **Level 2 (Active/Hover):** A very soft, diffused ambient shadow (0px 4px 12px, 5% opacity navy) is used only when an element is interactive or needs to be brought to the user's attention.
- **Dividers:** Use thin, 1px horizontal lines in light grey to separate curriculum modules or list items, maintaining a structured, tabular feel.

## Shapes
A **Soft (0.25rem)** roundedness is applied across the system. This subtle rounding removes the harshness of sharp corners—making the brand feel approachable—while remaining sufficiently "square" to look professional and institutional. 

- **Buttons & Inputs:** Use the standard 4px (0.25rem) radius.
- **Feature Cards:** Use 8px (0.5rem) to provide a slightly softer container for imagery or student testimonials.
- **Badges:** Can use a full "pill" shape to distinguish them from interactive buttons.

## Components
- **Buttons:** Primary buttons use the Excel Green (#217346) with white text. Secondary buttons use the Navy (#002157) as an outline or text color. Ghost buttons are reserved for tertiary actions.
- **Input Fields:** Clean, rectangular boxes with 1px light grey borders. On focus, the border transitions to Navy (#002157) with a subtle 2px outer glow.
- **Cards:** White backgrounds with a 1px #E2E8F0 border. For "Premium" course cards, add a 2px top-border in Gold (#D4AF37).
- **Chips/Badges:** Small, caps-locked Inter font. Use Navy-tinted backgrounds for general tags and Gold-tinted backgrounds for awards or "Elite" status.
- **Lists:** Curriculum lists should look tabular and organized, with clear "Progress" indicators using the Status Success green (#107C41).
- **Navigation:** A top-bar navigation using Navy text on a White background, employing a 2px Navy bottom-border on the active link for a "tabbed" professional feel.