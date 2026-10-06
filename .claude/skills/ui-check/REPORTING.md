# Reporting

Read this only when the user asks for a report, or asks for screenshots to be kept. A normal
run relays the table in chat and writes nothing.

## Report file

`.ui-check/reports/<YYYY-MM-DD>-<slug>.md`, where `<slug>` names the check (`login-mobile`,
`trips-cards`). Written by the main session from the subagent's table — do not re-judge its
verdicts while transcribing them.

```md
# UI check: <what was checked>

- Date: <YYYY-MM-DD>
- URL: <base url><route>
- Viewports: 375x667, 1280x720
- Branch: <git rev-parse --abbrev-ref HEAD> @ <git rev-parse --short HEAD>
- Login: demo | none | <role>

## 375x667

| # | Criterion | Verdict | Evidence |
|---|-----------|---------|----------|
| 1 | <criterion as the user worded it> | PASS | <snapshot line, measurement, or screenshot> |

## Console

- App errors: <n> — <first, or "none">
- Third-party asset failures: <n> (expected; not counted against criteria)

## Screenshots

- <path> — <what it shows>

**<p> PASS / <f> FAIL / <b> BLOCKED**

<one line naming the most important problem, or stating every criterion held>
```

Keep the criteria wording the user gave. A report that paraphrases them cannot be checked
against what was asked.

## Screenshots

Every run screenshots anyway — layout cannot be judged from an accessibility snapshot, which
carries no geometry. The difference is what survives:

- **Not asked for**: auto-named `page-<timestamp>.png` in `.ui-check/output/`, wiped at the
  start of the next run.
- **Asked for**: copy the relevant ones into `.ui-check/reports/` as
  `<YYYY-MM-DD>-<route-slug>-<viewport>.png` and reference them from the report.

Capture notes:

- `scale` is required by `browser_take_screenshot`; use `"css"` so pixel measurements match
  the viewport the criteria talk about.
- Viewport shots are the default. Use `fullPage: true` only when a criterion is about content
  below the fold — full-page shots of a long list are large and hard to read.
- One shot per viewport per route is usually enough. Add one mid-interaction only when a
  criterion is about that state (menu open, form submitted, error shown).
