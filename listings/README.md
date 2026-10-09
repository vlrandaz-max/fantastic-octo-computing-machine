# Listings intake

Drop new listing photos here and push. The `Generate Social Content` GitHub
Action picks up any changed folder and writes captions/hashtags/alt
text/reel script/DM copy to `content-calendar/<folder-name>.json`.

## Structure

```
listings/
  pine-woods-majestic-123-oak-ln/
    01-exterior.jpg
    02-kitchen.jpg
    03-primary-suite.jpg
    notes.txt          (optional — anything Claude should know: price, status,
                         lot number, what to emphasize)
```

- Up to 5 photos per folder are used per call (Claude's per-request image limit
  for this workflow).
- `notes.txt` is optional plain text.
- The folder name becomes the listing name Claude sees, and the output
  filename (`content-calendar/<folder-name>.json`).

## Requirements

The workflow needs an `ANTHROPIC_API_KEY` repo secret:
**Settings → Secrets and variables → Actions → New repository secret.**
Without it, the action will fail at the Claude API call.

## Re-running

- A normal push only regenerates the folders that changed.
- To force-regenerate everything, run the workflow manually from the
  **Actions** tab (`Generate Social Content` → *Run workflow*) with
  **process_all** checked.
