# Accessibility Notes

OMG Movie includes several accessibility best practices:

## Keyboard Navigation

- Movie cards are focusable (`tabindex="0"`) and activate on Enter/Space.
- Clear, high-contrast focus outlines for keyboard users.
- Favorite buttons are focusable and prevent accidental navigation.

## ARIA and Semantics

- `aria-label` added to actionable controls (search, favorite, theme).
- Favorite toggles use `aria-pressed` to announce state.
- Toasts use `aria-live="assertive"` for timely messaging.

## Color and Contrast

- Dark and light themes respect contrast guidelines.
- Muted text reserved for non-essential info; main content uses strong contrast.

## Motion and Feedback

- Subtle animations with short durations; no parallax or large-motion effects.
- CSS transitions are lightweight and do not impede usability.

## Images

- Poster images include `alt` text.
- On image load error, either a placeholder is shown or the card is removed (Top Picks).

If you find any accessibility gaps, please open an issue or submit a PR.
