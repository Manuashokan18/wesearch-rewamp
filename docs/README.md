# docs/

Source material for the WeSearch website. Reference only — **nothing in this folder is imported, bundled, or served by the app.** Assets the site actually serves live in [`public/`](../public/).

## Structure

```
docs/
├── content/    Approved copy, one file per page
└── design/     Design mockups and source imagery
```

---

## content/

Client-approved page copy. Each filename matches the route slug it feeds, so the mapping is one-to-one.

| File | Feeds route | Defined in |
|---|---|---|
| `homepage.md` | `/` | `app/page.tsx` |
| `contract-staffing.md` | `/services/contract-staffing` | `lib/data/services.ts` |
| `msp.md` | `/services/msp` | `lib/data/services.ts` |
| `rpo.md` | `/services/rpo` | `lib/data/services.ts` |
| `payroll-workforce-management.md` | `/services/payroll-workforce-management` | `lib/data/services.ts` |
| `gcc-hiring.md` | `/services/gcc-hiring` | `lib/data/services.ts` |
| `permanent-hiring.md` | `/services/permanent-hiring` | `lib/data/services.ts` |

All six services defined in `lib/data/services.ts` have a corresponding content doc here.

**When copy changes:** update the `.md` file here *and* the matching entry in `lib/data/services.ts` (or `app/page.tsx` for the homepage). These files are the record of what was approved; they are not read at build time, so editing one alone changes nothing on the site.

---

## design/

| File | What it is |
|---|---|
| `homepage-mockup.png` | Full approved homepage design — the reference the build targets |
| `hero-source.png` | Homepage hero image source (businesswoman, "Better Teams Bigger Dreams" card) |
| `hero-concepts.png` | Two section-illustration concepts — team-at-laptop and avatar-network variants |
| `brand-logo.png` | Original WeSearch logo (bar mark + wordmark, blue-to-purple gradient) |

The palette rendered in `homepage-mockup.png` is implemented as CSS custom properties in [`app/globals.css`](../app/globals.css) (`--color-navy`, `--color-accent`, `--color-tint`, and related tokens).

---

## Conventions

- **Lowercase kebab-case** for every filename — no spaces, no `&`, no uppercase
- **Content filenames match route slugs exactly**
- **Descriptive asset names** — a filename should say what the file shows
- Files served by the site belong in `public/`, not here. Don't keep a copy in both places; `public/` is the single source of truth for shipped assets.
