# Testing notes

Common knowledge for checking this app. Read before judging; it is what does not change
between runs. The criteria themselves always come from the prompt.

## Baseline sweep

The default set, offered when the prompt gives no criteria. Each is independently falsifiable:

1. The route renders its own content — not a blank page, not an error boundary, not a
   skeleton that never resolves.
2. No app console errors (see below for which errors count).
3. No horizontal overflow at 375px.
4. The page's primary controls are present, labelled, and clickable.
5. No truncated or overlapping text, and no element pushed outside its container.

## Default viewports

`375x667` (mobile) and `1280x720` (desktop), unless the prompt says otherwise. Check every
criterion at every viewport and report them as separate rows.

## How to judge

- One falsifiable claim per verdict. A criterion covering two things is two rows.
- **PASS** — observed to hold, with evidence. **FAIL** — observed not to hold; say what was
  there instead. **BLOCKED** — could not be judged (route 404s, element never appeared, login
  failed); say what blocked it. Never guess a verdict.
- Measure instead of eyeballing where a number settles it. Horizontal overflow is
  `browser_evaluate` on `document.documentElement.scrollWidth` vs `clientWidth` — a screenshot
  cannot distinguish a 2px overflow from a rounding artefact.
- Judge only what the criterion claims. Something else being ugly is a separate observation,
  not a FAIL.

## Quirks that cause false failures

- **Third-party place images fail by design.** Place records point at images hot-linked from
  external hosts (`planetofhotels.com`, `marinabaysands.com`, `shangri-la.com` and others);
  these return `ERR_BLOCKED_BY_RESPONSE`, `ERR_HTTP2_PROTOCOL_ERROR` or redirect loops on
  every load. Count them separately, never against a criterion — unless the criterion is
  specifically about images rendering.
- **App console errors** are the ones that matter: the bundle, React warnings, and failed
  calls to the Ikou API.
- **Loading states resolve late.** Pages use hand-rolled `animate-pulse` divs and
  `react-loading-skeleton`. Wait for real content before judging layout, or a skeleton gets
  reported as broken spacing.
- **Empty data is not a UI bug.** If the API returns nothing, say the criterion is BLOCKED on
  missing data rather than failing the layout.

## Login

The demo account is the default unless the prompt names another.

1. `browser_navigate` to `/login`. The form arrives pre-filled — `src/pages/login/index.tsx`
   seeds state with the demo username and password.
2. Click `button[type=submit]` ("Sign in").
3. Confirm with `browser_evaluate` on `!!localStorage.getItem("access_token")`. A snapshot
   alone is not proof the login succeeded.

If the pre-fill is ever removed, `browser_type` the secret **names** from `.ui-check/accounts.env`
(`IKOU_DEMO_USERNAME` into `#username`, `IKOU_DEMO_PASSWORD` into `#password`) — the server
substitutes the values, and seeing `<secret>NAME</secret>` in a response means it worked. Never
read the values. An account supplied in the prompt is typed literally.

The server runs `--isolated`, so every run starts logged out and nothing needs cleaning up.
