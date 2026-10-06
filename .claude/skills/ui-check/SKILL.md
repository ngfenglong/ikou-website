---
name: ui-check
description: Validate rendered UI in a real browser by spawning a Playwright-MCP subagent that judges the page against the criteria given in the prompt and returns a pass/fail report. Use when asked to UI check, visually verify, validate the UI, check responsive layout or breakpoints, confirm a page or component renders correctly, check a page for console errors, or verify a flow still works after a change.
disable-model-invocation: true
---

# UI check

The browser work happens in the `ui-validator` subagent, which is the point: its ~25 Playwright
tools and every snapshot it reads stay out of this session. This file is the mechanism; the
other two are read only when needed.

## What to test comes from the prompt

Two things are needed per run:

1. **The route** — mandatory. If the prompt does not imply one, ask. Never pick a page.
2. **What "correct" means** — from the prompt, in the user's own words.

If criteria are missing, or too vague to be falsifiable, **ask before opening a browser** and
offer the baseline sweep in [TESTING-NOTES.md](TESTING-NOTES.md) as the one-word default. Do
not infer criteria from the diff or from what the page looks like.

## Preflight

In order. Each has one fix — apply it rather than reporting it.

1. `mcp__playwright__*` tools exist. If not, `.mcp.json` is not loaded: tell the user to
   restart Claude Code and approve the project server, and stop here.
2. `.ui-check/accounts.env` exists. The server reads it with `readFileSync` and **throws at
   startup if it is missing**, so recreate it with an `IKOU_DEMO_USERNAME` / `IKOU_DEMO_PASSWORD`
   pair — the demo values are the ones `src/pages/login/index.tsx` seeds its form state with.
3. `curl -sf -o /dev/null http://localhost:3000` — if down, `npm start` in the background,
   poll until it answers, and leave it running.
4. `grep -q '^REACT_APP_IKOU_API_BASEURL=' .env.local` — commented out yields `baseURL: ""`,
   so every API call 404s and data-dependent criteria fail for the wrong reason.
5. `ls ~/Library/Caches/ms-playwright | grep -q chromium` — if absent,
   `npx @playwright/mcp@latest install-browser chromium`.
6. `rm -rf .ui-check/output` — the run being judged should be the only evidence on disk.

## Spawn

One `ui-validator` per run, `subagent_type: "ui-validator"`. Pass:

- base URL and the route(s)
- the criteria, numbered, in the user's wording
- viewports, if specified — otherwise it uses the defaults from TESTING-NOTES.md
- which role to log in as, or that the route is public
- that it must read `.claude/skills/ui-check/TESTING-NOTES.md` before judging

## Credentials

`.ui-check/accounts.env` holds `IKOU_<ROLE>_USERNAME` / `_PASSWORD` pairs and is loaded by the
server as `--secrets`. Read **names** from it, never values: typing the name puts the real
value in the page, and responses show `<secret>NAME</secret>`. Adding a role is an edit to
that file and nothing else. An account given in the prompt is typed as-is.

## Report back

Relay the subagent's table — the user does not see subagent output. Keep its verdicts; do not
re-judge. Console errors arrive split into app errors and third-party asset failures; pass the
latter along as context, never as a regression. Report FAILs as findings. Fix only if asked.

Screenshots live in `.ui-check/output/` (gitignored, wiped at each run start, 50MB eviction as
a backstop). Only when the user asks for a report or wants screenshots kept, read
[REPORTING.md](REPORTING.md) and write the report yourself — the subagent stays read-only.
