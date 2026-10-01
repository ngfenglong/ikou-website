# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Ikou is a community-driven travel app (browse/recommend places, plan trips). This repo is the **frontend only** — a Create React App (react-scripts 5) TypeScript SPA styled with TailwindCSS. The API lives in a separate repo, [ikou-backend](https://github.com/ngfenglong/ikou-backend). Deployed to Netlify (`public/_redirects` rewrites all paths to `index.html` for client-side routing).

## Working Rules

These are the project owner's standing instructions. They override default habits.

### Development

- **Never assume behavior.** If the expected behavior or a business rule is unclear, stop and interview the owner before writing code. A wrong assumption is more expensive than a question.
- **No comment noise.** Do not pepper the code with explanatory comments. Anything worth documenting — rationale, edge cases, decisions — belongs in the task doc, not inline. Comment only where the code genuinely cannot speak for itself.
- **Names carry the explanation.** Components, variables, and methods get meaningful, self-explanatory names. A good name removes the need for the comment.
- **Document design corrections.** When a technical design changes or is corrected mid-task, record it in a doc so it can be referred back to. Keep the entry concise — the decision and the why, not a narrative.

### Commits and PRs

- **One objective per commit.** Each commit delivers exactly one main task, kept granular so a reviewer can vet it quickly.
- **Every delivered task includes a verification result** in the commit message: concise, plain-language, written for a human reader (what was checked, what the outcome was) — not raw tool output.
- **One branch per PR**, created off `master` with a meaningful branch name describing the work.
- **Verify before raising.** Read back through the implementation to confirm it does what it claims, and that the commit stands alone as working code.

## Commands

```sh
npm install
npm start                 # dev server, http://localhost:3000
npm run build             # production build to build/
npm run lint              # eslint over src/**/*.{js,jsx,ts,tsx}
npm test                  # react-scripts test (jest, watch mode)
npm test -- --testPathPattern=Foo --watchAll=false   # run a single test file, once
```

`npm start` / `npm run build` also run CRA's own `react-app` eslint preset (from `package.json`'s `eslintConfig`), which is separate from `.eslintrc.json` used by `npm run lint`. Type checking happens through `react-scripts` (`tsconfig.json` is `noEmit`); there is no standalone typecheck script — use `npx tsc --noEmit`.

There are currently **no test files** in `src/`; testing-library and jest are installed but unused.

## Environment

`.env.local` at the repo root must define:

```
REACT_APP_IKOU_API_BASEURL=<API base URL>
```

Missing it silently yields `baseURL: ""` in the axios instance, so every request 404s against the dev server rather than failing loudly.

## Architecture

### Routing and app shell

All routes are declared inline in `src/App.tsx`; path strings live in `src/constants/routes.ts` (imported as `* as ROUTES`). Two groups:

- Routes nested under `<Route element={<Layout />}>` get the `Header`/`Footer` chrome (`src/pages/root/Layout.tsx` renders them around an `<Outlet />`).
- `/login`, `/signup`, `/forget-password` sit outside `Layout` deliberately — no header/footer.

Provider nesting in `App.tsx` matters: `AuthProvider > AlertProvider > NotificationProvider > BrowserRouter`. Contexts are outside the router, so they cannot use router hooks directly — hence the two null-rendering helpers mounted inside `BrowserRouter`:

- `ScrollToTop` — resets scroll on pathname change.
- `NavigateSetter` — assigns `useNavigate()` to the module-global `History.navigate` in `src/utils/navigate-helper.ts`, which is how **non-React code (the axios interceptor) redirects**. If you need to navigate from a service or interceptor, use `History.push(...)`, not a hook.

`src/pages/root/RouterInfo.tsx` and `Permission.constant.tsx` describe a permission/route-metadata scheme that is **not wired into `App.tsx`** — aspirational, don't assume it's enforced.

### API layer

`src/services/middleware/api-config.ts` exports a single configured axios instance as default. **Every service module imports it** (`import api from "./middleware/api-config"`) — never call bare `axios`, or you lose:

- **Request interceptor**: attaches `Authorization: Bearer <localStorage access_token>`.
- **Response interceptor**: retries `502/503/504` once (`__isRetryRequest` flag); on `401` calls `handle401Error`.
- **Token refresh**: `handle401Error` POSTs `/auth/refresh-token`. Concurrent 401s are parked in `failedQueue` while `isRefreshing`, then replayed with the new token. If refresh returns 400, both tokens are cleared, an `alert()` fires, and the user is pushed to `/login` via `History.navigate`.

Tokens live in `localStorage` under `access_token` / `refresh_token`.

Service functions (`src/services/*-service.ts`) follow one shape: `await api.<verb>(...)`, throw on unexpected status (compared against `src/constants/http-statuses.ts`), return `response.data`. Note the inconsistency: most calls interpolate `${process.env.REACT_APP_IKOU_API_BASEURL}` into the path even though the instance already sets `baseURL` (which works because axios ignores `baseURL` for absolute URLs). Prefer relative paths (`api.get("/places")`, as in `getAllPlaces`) for new code.

### Data shapes: dto → model → mapper

- `src/dto/` — snake_case shapes as the API returns them.
- `src/model/` — app-facing entities. Partially migrated: `model/place.ts` still mixes `placeName` with `image_url`/`average_rating`.
- `src/model-mapper/` — DTO→model translation. Only `code-decode-mapper.ts` exists; other services return `response.data` untranslated and cast at the call site. When adding an endpoint whose DTO differs from the model, add a mapper here rather than casting in the page.

### Auth state

`src/context/AuthContext.tsx` owns `user` / `isAuthenticated` plus `login`, `logout`, `register`. Two different ways `user` gets populated, and they don't produce identical objects — be careful when reading `user` fields:

- `login()` builds `user` from the login response's `data.user`.
- On mount, if an `access_token` exists, the user is rehydrated by spreading `jwtDecode(token)` claims.

Consume via `useAuth()` (`src/hooks/useAuth.ts`). The hooks in `src/hooks/` are thin `useContext` wrappers whose "throw if no context" branches are empty TODOs — a missing provider yields the context default (no-op functions), not an error.

### Feedback: alerts vs notifications

Two parallel systems, both keyed off `ALERT_TYPE` in `src/constants/theme-config.tsx`, which maps each type to Tailwind classes + a Heroicon:

- **Alert** (`AlertContext` / `useAlert` / `components/alert/Alert.tsx`) — inline, rendered by the page.
- **Notification** (`NotificationContext` / `useNotification`) — toast, rendered once app-wide by `components/notification/NotificationPortal.tsx` in `App.tsx`; `triggerNotification` auto-dismisses after 3s.

### Styling

Tailwind (`tailwind.config.js` scans `src/**/*.{js,jsx,ts,tsx}`) with a small theme extension (`blue.primary` `#5271FF`, `gray.base`/`background`/`primary`). In practice most components hardcode stock palette classes (`indigo-600`, `gray-*`) and the custom tokens are barely used — match the file you're editing rather than assuming the theme tokens are the convention. PrimeReact + primeicons CSS is imported globally in `App.tsx`; Headless UI and Heroicons/FontAwesome are also available. Loading states are hand-rolled `animate-pulse` divs in some pages and `react-loading-skeleton` components (`components/skeleton/`) in others.

## Conventions

- Pages are `src/pages/<kebab-case-feature>/` with either `index.tsx` or PascalCase files; reusable pieces are `src/components/<kebab-case-category>/PascalCase.tsx`. Components are function declarations with a default export.
- Code is formatted with default Prettier settings (double quotes, 2-space indent, trailing commas) — prettier is installed but there is no config file, so don't reformat to a different style.
- `@typescript-eslint/no-explicit-any` and `react/prop-types` are off; `strict: true` in tsconfig is on.
