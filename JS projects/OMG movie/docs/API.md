# OMG Movie API Usage

This app uses the OMDb API (http://www.omdbapi.com/) for movie data.

## Authentication

- All requests require an API key via `apikey` query parameter.
- Get a free key: https://www.omdbapi.com/apikey.aspx

## Endpoints Used

### 1) Search Movies

GET `https://www.omdbapi.com/?s=<query>&page=<n>&apikey=<key>`

- `s` (string): Search term. Recommend 3+ characters.
- `page` (1–100): Pagination. Each page returns up to 10 results.
- Response:

```json
{
  "Search": [
    { "Title": "Inception", "Year": "2010", "imdbID": "tt1375666", "Type": "movie", "Poster": "..." }
    // up to 10
  ],
  "totalResults": "147",
  "Response": "True"
}
```

Errors/empty:
```json
{ "Response": "False", "Error": "Movie not found!" }
```

### 2) Movie by IMDb ID

GET `https://www.omdbapi.com/?i=<imdbID>&apikey=<key>`

- Returns full details for a single title.
- Response example (truncated):

```json
{
  "Title": "Inception",
  "Year": "2010",
  "Rated": "PG-13",
  "Released": "16 Jul 2010",
  "Runtime": "148 min",
  "Genre": "Action, Adventure, Sci-Fi",
  "Director": "Christopher Nolan",
  "Writer": "Christopher Nolan",
  "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
  "Plot": "A thief who steals corporate secrets...",
  "Language": "English, Japanese, French",
  "Country": "United States, United Kingdom",
  "Awards": "Won 4 Oscars. Another 158 wins & 220 nominations.",
  "Poster": "https://...",
  "Ratings": [ { "Source": "Internet Movie Database", "Value": "8.8/10" } ],
  "Metascore": "74",
  "imdbRating": "8.8",
  "imdbVotes": "2,500,000",
  "imdbID": "tt1375666",
  "Type": "movie",
  "DVD": "",
  "BoxOffice": "",
  "Production": "",
  "Website": "",
  "Response": "True"
}
```

### 3) Title + Year (Top Picks validation)

GET `https://www.omdbapi.com/?t=<title>&y=<year>&apikey=<key>`

- Used to fetch curated Top Picks reliably.

## Notes and Limits

- Free keys are rate-limited; expect throttling on heavy use.
- Always use `https`.
- Poster may be `N/A`; the app replaces with a placeholder.
- Search is not strictly exact; results may include close matches.

## Error Handling in App

- Spinners show during fetch.
- Friendly messages for empty queries and empty results.
- Toasts used for UX feedback.
- Network errors gracefully handled with fallbacks.
