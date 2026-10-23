# Magic Patterns prototype — reference only

This directory holds the Magic Patterns redesign export exactly as it was
uploaded (commit `7cd519b`, "Add files via upload"), from
<https://www.magicpatterns.com/os/g9X9bb18CQmpM5fHyi3DAP/33VKF1ETzrgP4D6oc6ZeZq>.

It is **not built, linted, typechecked or deployed**. It is kept as the visual
source of truth so a reviewer can diff the production implementation against
the approved design. `tsconfig.json` and `.eslintignore` exclude it.

## What changed from the upload

The upload landed 54 `.tsx` files flat at the repository root and overwrote
`package.json` and `README.md` with the prototype's Vite versions, which would
have broken the production build. Two corrections were made and nothing else:

1. `package.json` and `README.md` were restored from `main`.
2. The flat files were moved into the directory layout their own `import`
   statements describe (`src/pages`, `src/components/{ui,console,control,home,labs,services,research,contact}`).

File contents are untouched.

## What the export is missing

Every data module the components import was left out of the upload:

```
src/data/architecture  src/data/console   src/data/ecosystem   src/data/execution
src/data/inquiry       src/data/methodology  src/data/products  src/data/readiness
src/data/research      src/data/services  src/data/site
```

So the prototype cannot run as exported — `npm run dev` here would fail on
unresolved imports. All of that content was reconstructed for production under
`lib/` from the repository's own verified copy rather than invented. See
`docs/MAGIC_PATTERNS_AUDIT.md`.

## Where each prototype file ended up in production

| Prototype | Production |
| --- | --- |
| `src/index.css` (`@theme` tokens) | `tailwind.config.ts` + `app/globals.css` |
| `src/App.tsx` (HashRouter) | `app/layout.tsx` + App Router file routes |
| `src/components/RouteEffects.tsx` | Next.js `metadata` exports per route |
| `src/components/ui/*` | `components/arc/ui/*` |
| `src/components/{console,control,home,labs,services,research,contact}/*` | `components/arc/<same>/*` |
| `src/pages/*` | `app/*/page.tsx` |
| `src/data/*` (missing) | `lib/arc/*` |
