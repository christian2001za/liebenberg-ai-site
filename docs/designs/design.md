# Design System Specification: The Quiet Curator

## 1. Overview & Creative North Star
This design system is anchored by a philosophy of **"Architectural Serenity."** Moving away from the cluttered, high-velocity patterns of standard SaaS, this system adopts the posture of a high-end editorial look—think of a physical monograph or a secluded limestone gallery.

The **Creative North Star** is "The Quiet Curator." Every element must feel intentional, stationary, and premium. We achieve this by rejecting "default" UI elements like heavy drop shadows and 1px borders in favor of tonal layering, expansive negative space, and a rigid, sharp-edged geometry (0px border radius). The experience should feel like walking through a gallery where the art is the focus, and the architecture is a silent, supportive frame.

---

## 2. Colors & Surface Philosophy
The palette is intentionally monochromatic and rooted in the tactile warmth of `#fafae9`. This is not a sterile "digital white"; it is the color of vellum or sun-bleached stone.

### The "No-Line" Rule
Explicitly, **1px solid borders are prohibited for sectioning.** To define a new content area, you must use background color shifts.
- **Example:** A hero section using `surface` transitions into a feature section using `surface-container-low`. The boundary is defined by the shift in tone, not a line.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of paper or stone slabs.
- **Base Layer:** `surface` (#fafae9)
- **Primary Depth:** Use `surface-container-lowest` (#ffffff) for the most prominent "lifted" content (like a featured card).
- **Secondary Depth:** Use `surface-container-high` (#e9e9d9) or `highest` (#e3e4d3) for recessed utility areas like sidebars or footers.

### The "Glass & Gradient" Rule
To elevate CTAs beyond flat boxes, use a subtle linear gradient from `primary` (#000000) to `primary-container` (#3c3b3b). For floating navigation or overlays, use `surface` with a **70% opacity and a 20px backdrop-blur**. This creates a "frosted glass" effect that allows the underlying cream warmth to bleed through, maintaining a sense of place.

---

## 3. Typography: The Editorial Voice
The tension between the serif Newsreader and the sans-serif Manrope provides the system’s character.

- **Display & Headlines (Newsreader):** Used for large-scale storytelling. This is your "Masthead." Headlines should have a slightly tighter letter-spacing (-0.02em) to feel authoritative and bespoke.
- **Titles & Labels (Manrope):** The functional layer. For `label-md` and `label-sm`, increase letter-spacing to 0.08em and use uppercase for a "technical luxury" aesthetic.
- **Body Text (Manrope):** Set with generous line-height (1.6) to ensure the monochromatic palette remains readable and breathable.

---

## 4. Elevation & Depth
In a world without heavy borders and shadows, depth is a game of nuance.

- **The Layering Principle:** Avoid elevation shadows for standard components. Instead, place a `surface-container-lowest` card on a `surface-container-low` section. The contrast between #ffffff and #f5f5e4 provides a "soft lift" that feels architectural.
- **Ambient Shadows:** Only use shadows for high-priority floating elements (e.g., Modals). Shadows must be:
- **Color:** A tinted version of `on-surface` (#1b1d12) at 4% opacity.
- **Blur:** 40px to 60px spread.
- **Purpose:** To mimic natural, ambient light diffusion, not a digital "drop shadow."
- **The "Ghost Border":** If accessibility requires a container boundary, use the `outline-variant` token (#c6c6c6) at **15% opacity**. It should be barely perceptible—a "ghost" of a line.

---

## 5. Components

### Buttons
- **Primary:** Solid `primary` (#000000) background, `on-primary` (#e5e2e1) text. **0px border radius.** No hover shadows; instead, shift background to `primary-container` (#3c3b3b).
- **Secondary:** `surface` background with a 1px "Ghost Border" (outline-variant at 20%).
- **Tertiary:** Text-only in `primary` with a 2px underline that appears only on hover.

### Input Fields
- **Styling:** Never use a four-sided box. Use a `surface-container-low` background with a 1px "Ghost Border" on the bottom only.
- **Focus State:** The bottom border becomes `primary` (#000000) 1px solid.

### Cards & Lists
- **Strict Prohibition:** No divider lines between list items. Use `spacing-4` (1.4rem) or `spacing-5` (1.7rem) to create separation through "white space."
- **Nesting:** Place a list of `surface-container-low` tiles on a `surface` background to create a grid of "stone blocks."

### Chips
- Used for filtering. Rectangular (0px radius). Unselected chips should be `surface-container-high`. Selected chips should be `primary` with `on-primary` text.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Align a headline to the left but a body paragraph to a 60% offset column to mimic high-end magazine layouts.
- **Use "Oversized" Padding:** If you think a section has enough padding, add 20% more. Space is a luxury in this design system.
- **Stick to 0px:** Any rounded corner (even 2px) breaks the architectural integrity of the system.

### Don't:
- **Never use Pure Blue or "AI Purples":** These colors conflict with the serene, natural warmth of the cream palette.
- **Avoid 100% Opaque Borders:** High-contrast lines are too "loud" for this aesthetic.
- **No Traditional Grids:** While the spacing scale is rigid, the layout should feel "found" rather than "forced." Avoid filling every grid cell; leave gaps to let the `surface` color breathe.

---

## 7. Spacing Utility
All spacing must strictly follow the provided scale. For major section breaks, use **spacing-20 (7rem)** or **spacing-24 (8.5rem)** to create a sense of significant "tempo" change between content blocks. This reinforces the gallery-like pacing of the experience.