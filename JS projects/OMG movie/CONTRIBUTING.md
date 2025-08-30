# Contributing Guide

Thanks for your interest in improving OMG Movie! 🎬

## Development Setup

1. Fork the repo and clone locally.
2. Work inside `JS projects/OMG movie/`.
3. Use any static server for local testing (e.g. `python3 -m http.server`).

## Commit Conventions

- Use clear, conventional messages:
  - feat: add top picks pagination
  - fix: prevent navigation on favorite click
  - style: improve card spacing
  - docs: update README with troubleshooting
  - refactor: extract theme helpers

## Pull Requests

- Keep PRs focused and small when possible.
- Describe the change and include before/after if UI-related.
- Ensure no console errors.

## Coding Style

- Vanilla JS (ES6+), minimal globals.
- Use `const`/`let`, async/await, and template literals.
- Prefer readable names and early returns.

## Tests / QA

- Manual QA checklist:
  - Search happy/empty paths
  - Pagination prev/next
  - Details page loads via card click
  - Favorites add/remove and clear all
  - Theme toggle persists
  - Top Picks loads and links work

## Issues

- Use GitHub Issues to report bugs or request features.
- Include repro steps and environment info.
