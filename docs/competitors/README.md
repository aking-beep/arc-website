# Competitor watch

`watchlist.json` is the whole input to the weekly watch. The script fetches
nothing that is not listed there, so widening the watch means a reviewed
commit to that file.

## The weekly run

`.github/workflows/weekly-competitors.yml` runs Mondays at 07:23 UTC. It
snapshots each page, keeps the sentences containing a watched signal word,
and compares them with last week's snapshot from the Actions cache. When
something moved — or when a page could not be read — it comments on the open
**Weekly competitor watch** issue. A quiet week files nothing.

Exit codes matter here:

| Code | Meaning |
| --- | --- |
| 0 | Every target was read and compared |
| 3 | Partial: at least one target was unreachable, and is reported as unread rather than unchanged |
| 2 | Nothing could be fetched. The job fails rather than reporting a clean week |

## Adding a competitor

Add an entry with a stable `id`, the vendor's name, and a URL that is a
product or pricing page rather than a blog index — indexes churn weekly and
produce noise. Then add any new signal words to `signals`.

## Reading the issue

The quoted lines are vendor marketing copy. They are escaped before quoting
(mentions defanged, links stripped, markdown removed) but they are not
verified. Confirm anything you intend to act on against the vendor's own
page.

No model reads these pages and no model decides what to do about them. That
is deliberate: a job that reads arbitrary web pages while holding repository
write is a prompt-injection path, which is why the monthly research workflow
dropped its agent step. This job holds `contents: read` and no model.

## Running it by hand

```
node scripts/competitors/watch.mjs --out snapshot.json --report report.md
node scripts/competitors/watch.mjs --prev snapshot.json --out next.json --report report.md
```

Tests: `npx vitest run tests/competitor-watch.test.ts`. They drive the real
script against a local fixture server, including a hostile page, so the
escaping is covered rather than assumed.
