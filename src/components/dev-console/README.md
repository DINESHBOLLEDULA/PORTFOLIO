# Development Console

A drop-in "Development Console" dashboard, restyled to match this specific
portfolio's own design system: it uses the CSS custom properties already
defined in `index.css` (`--glass`, `--glass-border`, `--text-primary`,
`--text-secondary`, `--text-muted`, `--badge-bg`, `--glass-shadow`) instead
of a separate color palette, so it automatically themes with the existing
`theme === "dark" | "light"` toggle on `<html>` — no Tailwind `dark:` config
needed.

## 1. Install the one dependency

```bash
npm install lucide-react
```

## 2. Copy the folder

Copy `dev-console/` into `src/components/dev-console/` (this matches the
import already in your `App.jsx`).

## 3. Use it

Your `App.jsx` already has:

```jsx
<DevConsole username="DINESHBOLLEDULA" owner="DINESHBOLLEDULA" repo="PORTFOLIO" />
```

Add the one prop it's missing — `theme` — the same state you already pass
to `<Writing theme={theme} />` just above it:

```jsx
<DevConsole username="DINESHBOLLEDULA" owner="DINESHBOLLEDULA" repo="PORTFOLIO" theme={theme} />
```

Props:

- `username` — **required.** Whose contribution calendar to show, and whose
  repos are searched when `owner`/`repo` aren't given.
- `owner` / `repo` — **optional.** Pin one specific repository. Omit both
  and the console automatically shows whichever repo was pushed to most
  recently (via `GET /users/{username}/repos?sort=pushed`). You're currently
  passing both explicitly, which is fine — remove them if you'd rather it
  always reflect your latest activity.
- `theme` — **required.** `"dark"` or `"light"`, same as your other themed
  components. Used only for the contribution-heatmap green scale — every
  other color reads straight from your CSS variables and themes itself.
- `token` — **optional.** A GitHub personal access token to authenticate
  requests. See "Authenticated requests" below.

## Why CSS variables instead of Tailwind `dark:`

Your app toggles theme by adding a `dark` or `light` class to
`<html>` and letting `:root.dark { ... }` / `:root.light { ... }` swap CSS
variable values — not Tailwind's `dark:` variant. So instead of duplicating
your color system with a second Tailwind-driven one, every card here just
reads your variables directly:

| Element | Variable used |
|---|---|
| Card background | `var(--glass)` |
| Card border | `var(--glass-border)` |
| Card hover/ambient shadow | `var(--glass-shadow)` |
| Status pill background | `var(--badge-bg)` |
| Headings / primary text | `var(--text-primary)` |
| Descriptions | `var(--text-secondary)` |
| Small labels, timestamps | `var(--text-muted)` |

This means if you ever tweak those variables in `index.css`, the console
updates with the rest of your site automatically. The only place a plain
`theme` prop is used instead of a variable is the contribution-heatmap
green scale and the terminal card — those need concrete color swatches
rather than a single variable, the same way you handle it inline elsewhere
in `App.jsx` (e.g. the resume button, footer status card).

The terminal (git log) card intentionally stays a dark, opaque terminal in
both themes — like a real terminal window, it doesn't reformat itself for
light mode.

The emerald "Live" dot matches the `bg-emerald-400` you already use for your
hero badge and footer status indicator, so it reads as the same "active/
available" signal across the page.

## How the data flows

`useGithubConsole` (in `hooks/useGithubConsole.js`) is the only place that
talks to the network. On mount, and then every 5 minutes, it calls:

- `https://github-contributions-api.jogruber.de/v4/{username}?y=last` — contribution calendar (a free public mirror of the GitHub profile graph; GitHub's own REST API doesn't expose this, and the real GraphQL `contributionsCollection` field needs a token with broader scopes than you'd want in a browser bundle, so this intentionally doesn't use it).
- `https://api.github.com/users/{username}/repos?sort=pushed` — used only when `owner`/`repo` are omitted, to find the most recently active repo.
- `https://api.github.com/repos/{owner}/{repo}` — repo metadata (stars, forks, description, updated time) — used when `owner`/`repo` are given explicitly, as yours currently are.
- `https://api.github.com/repos/{owner}/{repo}/languages` — language byte counts, turned into percentages for the donut.
- `https://api.github.com/repos/{owner}/{repo}/commits?per_page=1` — latest commit, for the terminal card.

Current streak, longest streak, and "active days this year" are all
computed client-side from the contribution calendar.

## Authenticated requests

GitHub's REST API allows 60 unauthenticated requests/hour per IP. Pass a
token to raise that to 5,000/hour:

```jsx
<DevConsole username="DINESHBOLLEDULA" owner="DINESHBOLLEDULA" repo="PORTFOLIO" theme={theme} token={import.meta.env.VITE_GITHUB_TOKEN} />
```

or just set the env var and skip the prop — the hook picks up
`VITE_GITHUB_TOKEN` automatically:

```
# .env.local
VITE_GITHUB_TOKEN=github_pat_xxxxxxxx
```

**Important:** Vite bakes `VITE_`-prefixed env vars into the client bundle
at build time, so this token is visible to anyone who views your site's
source. Only ever use a **fine-grained personal access token scoped to
"Public Repositories (read-only)"** with no other permissions — never a
classic token or one with write/private-repo access. The contributions
calendar endpoint never receives this token; it doesn't need one.

If you'd rather not expose any token to the browser at all, the safer
long-term option is a small serverless function that holds the token
server-side and proxies these requests — happy to help wire that up if
you want it.

## Caching & the live/cached/offline states

Every successful fetch is written to `localStorage` via `lib/githubCache.js`
alongside a timestamp. If a fetch fails (offline, rate limit, a typo'd
username, etc.), the hook:

1. Falls back to the last cached snapshot, if one exists, and shows an
   amber **"Cached"** badge with "Updated Xm/h/d ago".
2. If there's no cache yet (first-ever load with no network), falls back to
   bundled demo data and shows a red **"Offline"** badge.
3. On any successful fetch, the badge returns to green **"Live"**.

Pass `pollMs` to `useGithubConsole` to change the polling interval
(default: 5 minutes).

## Responsive behavior

The contribution graph scrolls horizontally on narrow screens (heatmaps
don't compress well below a certain width). Everything else — the header,
the streak/graph row, and the repo/terminal row — stacks to a single column
below the `lg` breakpoint.
