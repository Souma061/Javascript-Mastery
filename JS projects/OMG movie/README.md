# OMG Movie

A fast, modern movie finder built with vanilla JavaScript and Bootstrap. Search the OMDb database, browse paginated results, view rich details, and curate a personal favorites list that persists in your browser. Includes a polished dark/light theme, accessibility features, and graceful error handling.

## Features

- Powerful movie search via OMDb API
- Pagination with Prev/Next and total pages indicator
- Details page with poster, rating, genres, and plot
- Favorites system backed by localStorage with clear-all
- "Top Picks" curated shelf (validated by title + year)
- Elegant toasts for feedback (Bootstrap Toasts)
- Theme toggle (dark/light) persisted across sessions
- Responsive layout and smooth micro-interactions
- Accessibility: focus styles, ARIA labels, keyboard use
- Robust error states, spinners, and placeholder images

## Screens

- Home (search, results, pagination, Top Picks, Favorites)
- Details (deep dive for a selected film)

## Tech Stack

- HTML5, CSS3 (custom theming)
- JavaScript (ES6+), fetch API
- Bootstrap 5 (layout, components, toast)
- OMDb API (data source)

## Project Structure

```
OMG movie/
├─ index.html        # Main UI (search, results, top picks, favorites)
├─ details.html      # Movie details view
├─ script.js         # App logic (API, pagination, favorites, theme)
├─ style.css         # Theming and component styles
└─ docs/
   ├─ API.md         # API usage details and response shapes
   └─ ACCESSIBILITY.md  # Keyboard and ARIA notes
```

## Getting Started

1) Get an OMDb API key (free) at: https://www.omdbapi.com/apikey.aspx

2) Open `script.js` and replace the placeholder with your key:

```js
const apiKey = "YOUR_OMDB_API_KEY";
```

3) Run locally (recommended to use a static server so navigation works):

```bash
# From the OMG movie folder
python3 -m http.server 8080
# Then open http://localhost:8080
```

You can also open `index.html` directly in a browser, but using a local server ensures consistent relative navigation to `details.html`.

## Usage

- Search: Enter a movie title and press Enter or click Search.
- Pagination: Use Prev/Next buttons to move between pages. The app shows current/total pages.
- Favorites: Click the ☆/★ on a card to toggle. Count appears in the navbar; clear all from the Favorites section.
- Details: Click a card to open the dedicated details view.
- Top Picks: Curated classics are fetched by title + year to avoid mismatches.
- Theme: Toggle the moon/sun button; preference is saved.

## Data Sources

- OMDb API: https://www.omdbapi.com
  Endpoints used include `?s=` (search), `?i=` (by IMDb ID), and `?t=&y=` (title + year). See `docs/API.md` for parameters and sample responses.

## Accessibility

- Clear focus outlines for keyboard users
- ARIA labels on actionable elements
- `aria-pressed` state on favorites toggles
- Keyboard activation on movie cards (Enter/Space)
- High color contrast in both themes

Details and tips in `docs/ACCESSIBILITY.md`.

## Error Handling

- Loading spinners during network calls
- User-friendly messages for empty results and failures
- Placeholder poster used when images are missing

## Privacy

- Favorites and theme are stored locally in your browser via `localStorage`.
- No user data leaves your device unless your browser directly requests data from OMDb.

## Troubleshooting

- Empty results: Check spelling, try broader terms. OMDb requires 3+ character queries for consistent results.
- API errors or limits: Free OMDb keys are rate-limited. Try again later, or upgrade your key.
- Mixed-content warnings: Always use `https` for the OMDb endpoint.

## Contributing

See `CONTRIBUTING.md` for guidelines, commit conventions, and development tips.

## License

MIT © 2025 Soumabrata. See `LICENSE` for details.
