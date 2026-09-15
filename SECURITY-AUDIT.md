# Next.js Security Audit — wesearch-web

**Audit date:** 2026-09-15
**Repository:** `wesearch-web`
**Branch / commit:** `master` @ `6c27cf4` (working tree contains uncommitted feature work)
**Method:** Static analysis only — read-only. No files modified, no dependencies installed, no project scripts executed.
**Auditor role:** Senior Next.js Engineer / Application Security Engineer

---

## Stack Detected

| Component | Version |
|---|---|
| Next.js | 16.3.4 |
| React / react-dom | 19.2.8 |
| Node | v20.18.1 (no `engines` field declared) |
| Tailwind CSS | 4.3.3 (v4, CSS-first config) |
| PostCSS | 8.5.28 via `@tailwindcss/postcss` 4.3.3 |
| Package Manager | npm 10.8.2 (`package-lock.json` v3 only — no pnpm/yarn lockfiles) |
| Project size | 3,708 lines across 28 source files |

---

## Summary

| Check | Result |
|---|---|
| **Overall Risk** | **LOW** |
| Malicious code detected | **NO** |
| Backdoor detected | **NO** |
| Credential stealing detected | **NO** |
| Data exfiltration detected | **NO** |
| Suspicious dependencies | **NO** |
| Suspicious PostCSS configuration | **NO** |
| Suspicious Tailwind configuration/plugins | **NO** |
| Exposed secrets | **NO** |
| Suspicious external connections | **NO** |
| Dangerous lifecycle scripts | **NO** |

---

## Evidence Base

The following searches returned **zero matches** across all `.ts` / `.tsx` / `.js` / `.mjs` / `.css` / `.json` / `.md` project files (excluding `node_modules`, `.next`, `.git`):

**Code execution primitives**
- `eval(`, `new Function`, `Function(`, `child_process`, `exec(`, `execSync(`, `spawn(`, `spawnSync(`, `fork(`

**Encoding / obfuscation**
- `atob`, `btoa`, `Buffer.from`, `base64`, `fromCharCode`, `unescape(`, `String.raw`
- Literal `\xNN` / `\uNNNN` escape sequences
- Base64 blobs of 40+ characters
- Concatenated dynamic `require()` / `import()`

**Network**
- `fetch()`, `axios`, `XMLHttpRequest`, `WebSocket`, `http.request`, `https.request`, `sendBeacon`

**Data access / exfiltration surfaces**
- `process.env`, `localStorage`, `sessionStorage`, `document.cookie`, `navigator.clipboard`, `os.homedir()`
- `~/.ssh`, `~/.aws`, `.npmrc`, `.git-credentials`

**Frontend injection**
- `dangerouslySetInnerHTML`, `innerHTML`, `document.write`

**Secrets**
- API keys, JWTs, AWS keys (`AKIA…`), GitHub tokens (`ghp_…`), Slack tokens (`xox…`), private keys, DB/SMTP connection strings

**Node builtins**
- `fs`, `path`, `os`, `http` — **not imported anywhere in project source**

### Structural findings

- **No** `app/api/**`, **no** `pages/api/**`, **no** `route.ts` / `route.js` — zero server endpoints
- **No** `middleware.ts` / `middleware.js`
- **No** `"use server"` — zero Server Actions
- **No** `.env` files of any kind; **no** `NEXT_PUBLIC_*` references
- **No** `.npmrc`, `.yarnrc`, `.pnpmfile.cjs`
- **No** `.github/`, Dockerfile, docker-compose, or any `.yml` / `.yaml`
- **No** `.exe`, `.dll`, `.ps1`, `.bat`, `.cmd`, `.sh`, `.bin`, `.node`, `.zip`, `.tar`, `.gz` anywhere in the project
- Only hidden entries in the entire tree: `.gitignore` and `.claude/`
- Git: 1 commit ("Initial commit from Create Next App"), **no remotes configured**, **no git hooks** installed
- All 14 PNG / 2 MP4 / 1 ICO files verified by magic bytes as genuine (`89 50 4E 47`, `ftypisom`, ICO header) — no disguised executables
- `node_modules` contents match `package-lock.json` **exactly** — zero packages present that are not in the lockfile
- All 5 stock `public/*.svg` files from create-next-app have been deleted; **no SVG files remain**, eliminating SVG-embedded-script risk

### External connections

**Only external URL in application code:** `https://www.linkedin.com/company/wesearchinc/` — [`components/layout/Footer.tsx:11`](components/layout/Footer.tsx#L11). The company's own LinkedIn page, rendered with correct `rel="noopener noreferrer"`.

No hardcoded IP addresses. No Discord/Telegram webhooks. No unknown analytics endpoints. No WebSockets.

---

## PostCSS Audit (dedicated)

[`postcss.config.mjs`](postcss.config.mjs) in full — 7 lines:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

**Classification: LEGITIMATE.**

This is the byte-for-byte create-next-app default for Tailwind v4. It is pure declarative configuration: one object literal, one plugin key, one default export.

It contains **no** imports (static or dynamic), **no** `require()`, **no** filesystem access, **no** network calls, **no** `child_process`, **no** `eval` / `new Function`, **no** `process.env` reads, **no** encoded payloads, and **no** application logic of any kind.

**Does it execute anything when Next.js starts or builds?**
It is evaluated as an ES module by Next.js's PostCSS loader, so the module body runs — but the body only constructs a static object literal and exports it. It performs no side effects. The only code that executes as a result is `@tailwindcss/postcss` 4.3.3, the official Tailwind Labs PostCSS plugin, resolved from `registry.npmjs.org` with a valid integrity hash.

---

## Tailwind CSS Audit (dedicated)

**No `tailwind.config.{js,ts,mjs,cjs}` file exists** — correct for Tailwind v4, which uses CSS-first configuration.

[`app/globals.css`](app/globals.css) is the entire Tailwind configuration:

| Directive | Content |
|---|---|
| `@import "tailwindcss";` | Standard v4 entry point — a **bare package specifier resolved from `node_modules`, not a URL** |
| `:root { … }` | 12 brand color custom properties (hex literals only) |
| `@theme inline { … }` | Maps those properties into Tailwind's theme |
| `body { … }` | Background, color, font-family |

**Classification: LEGITIMATE.**

There are **no** `@plugin` directives, **no** `@config` directives, **no** third-party Tailwind plugins, **no** custom JavaScript plugins, **no** `url()` references to external hosts, and no external resources of any kind. The only PostCSS/Tailwind plugin in the pipeline is `@tailwindcss/postcss` itself.

---

## Findings

### Finding 1 — Overly permissive Claude Code allowlist

| Field | Value |
|---|---|
| **Severity** | MEDIUM |
| **Confidence** | HIGH |
| **Classification** | **RISKY PRACTICE** (not malicious) |
| **File** | [`.claude/settings.json`](.claude/settings.json) |
| **Line** | 1–110 (`permissions.allow`) |

**Code (excerpt):**

```json
"Bash(node -e ' *)",
"Bash(python3 -c ' *)",
"Bash(npm install *)",
"Bash(npm run *)",
"Read(//d//**)",
"Bash(rm -rf /d/wesearch-web/tmp-check *)",
"Bash(netstat -ano)"
```

**Finding:** This file pre-approves roughly 110 commands for AI agent sessions in this project. Most are narrowly-scoped localhost `curl` calls and Playwright screenshot scripts — clearly accumulated organically across prior legitimate development sessions, and consistent with the site's visual-QA history. However, several entries are effectively unbounded.

**Why it is suspicious:** It is *not* suspicious in origin — nothing here points to an attacker, and the pattern matches ordinary iterative development. The concern is its *effect*: `Bash(node -e ' *)` and `Bash(python3 -c ' *)` pre-approve arbitrary Node and Python code execution with no further prompt, and `Read(//d//**)` grants unprompted read access to the entire `D:` drive — which includes `D:\streben-website-revamp`, a second unrelated project. These bypass the confirmation prompts that would otherwise catch a prompt-injection or a mistaken destructive command.

**Potential impact:** Any future agent session in this directory — including one acting on untrusted input such as a fetched web page, a dependency's README, or a pasted issue — can execute arbitrary code and read any file on `D:` without asking first.

**Recommended action:** Prune this list. Delete the `node -e`, `python3 -c`, `Read(//d//**)`, and wildcard `rm -rf` entries; keep the specific localhost `curl` and `npm run` entries if useful. This is the single highest-value hardening step available in this repository, and it concerns the developer machine rather than the deployed site.

---

### Finding 2 — `unrs-resolver` postinstall performs network + shell execution at install time

| Field | Value |
|---|---|
| **Severity** | LOW |
| **Confidence** | HIGH |
| **Classification** | **LEGITIMATE / FALSE POSITIVE** (documented behavior — reported for transparency) |
| **File** | `node_modules/unrs-resolver/postinstall.js`, `node_modules/napi-postinstall/lib/index.js` |
| **Line** | `postinstall.js:1–5`; `index.js:84, 137–145` |

**Code:**

```js
// unrs-resolver/postinstall.js — the complete file
const { checkAndPreparePackage } = require("napi-postinstall");
const packageJson = require("./package.json");
checkAndPreparePackage(packageJson, true);
```

**Finding:** This is the **only** lifecycle script in the entire dependency tree that executes during `npm install`. Exactly one package is flagged `hasInstallScript` in the lockfile. It is a **dev dependency**, reached via:

```
eslint-config-next -> eslint-plugin-import -> eslint-import-resolver-typescript -> unrs-resolver
```

Internally, `napi-postinstall` does use `execSync` (to read `npm config get registry`, to run `npm install <binding>`, and to check `ldd --version` for musl detection) and does download `.tgz` files over HTTPS. Those patterns look alarming in isolation, so every host it can contact was traced.

**Why it is not suspicious:** Every hardcoded URL in both packages was extracted. The complete set is `https://registry.npmjs.org/` (the default constant), plus GitHub/OpenCollective URLs that appear only in metadata and comments. The download URL is built as:

```js
const url = `${getGlobalNpmRegistry()}${pkg}/-/${pkg}-${version}.tgz`;
```

Meaning it **only ever contacts the registry configured locally**, defaulting to `registry.npmjs.org`. There is no third-party host, no IP literal, and no attacker-controlled endpoint. This is the documented purpose of `napi-postinstall`: a fallback that fetches the correct native binding for legacy npm versions that mishandle `optionalDependencies`.

**Additional note:** The `downloadDirectlyFromNPM` fallback path writes the extracted `.node` binary **without verifying an integrity hash**. On this setup that path will not execute — `@unrs/resolver-binding-win32-x64-msvc@1.12.2` is already installed and is pinned in the lockfile with a valid `sha512` integrity hash, so npm 10 resolves it through normal `optionalDependencies` and the postinstall short-circuits.

**Note on the other ~130 scripts:** The scan also surfaced many `"prepublish"` entries (the `not-in-publish || npm run prepublishOnly` idiom used across ljharb's packages) and several `"prepare": "husky"` entries. **Neither runs on `npm install` for registry-sourced dependencies** under npm 10 — `prepare` runs only for git dependencies and the root project, and `prepublish` is not executed for dependencies at all. They are inert here.

**Recommended action:** None required. For defense-in-depth on install, `npm ci --ignore-scripts` works — but note that ESLint's TypeScript import resolution may then need the binding linked manually.

---

### Finding 3 — Build-time network fetch to Google Fonts

| Field | Value |
|---|---|
| **Severity** | INFORMATIONAL |
| **Confidence** | HIGH |
| **Classification** | **INFORMATIONAL** |
| **File** | [`app/layout.tsx:2`](app/layout.tsx#L2), [`app/layout.tsx:7-15`](app/layout.tsx#L7-L15) |

**Code:**

```tsx
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
```

**Finding:** `next/font/google` fetches font files from Google's servers **at build time** and self-hosts them in the output bundle. Listed here for completeness: this is the only outbound network connection the project makes beyond the npm registry.

**Why it is not suspicious:** This is stock create-next-app code and a first-party Next.js feature. No data leaves the machine beyond the font request itself, and because fonts are self-hosted in the build output, **end users' browsers never contact Google** — it is actually the privacy-preserving option.

**Recommended action:** None. Be aware it requires network access during `npm run build`; fully air-gapped builds would need a local font instead.

---

### Finding 4 — No security headers configured

| Field | Value |
|---|---|
| **Severity** | LOW |
| **Confidence** | HIGH |
| **Classification** | **RISKY PRACTICE** |
| **File** | [`next.config.ts`](next.config.ts) |
| **Line** | 3–5 |

**Code:**

```ts
const nextConfig: NextConfig = {
  /* config options here */
};
```

**Finding:** The config is completely empty — which is *good* from a malware standpoint (no `webpack` hooks, no custom loaders, no build-time execution, no `rewrites`, no `redirects`, no `images.remotePatterns`, no `env` exposure, no experimental flags). But it also means no `headers()` function, so the deployed site ships without Content-Security-Policy, Strict-Transport-Security, X-Frame-Options, X-Content-Type-Options, or Referrer-Policy.

**Potential impact:** No active vulnerability today — the site is fully static with no user input processing and no `dangerouslySetInnerHTML`. It removes a defense-in-depth layer, which will matter more once the contact form is wired to a backend.

**Recommended action:** Add a `headers()` block before production launch. Not a blocker for the current static site.

---

### Finding 5 — Contact form is a non-functional placeholder

| Field | Value |
|---|---|
| **Severity** | INFORMATIONAL |
| **Confidence** | HIGH |
| **Classification** | **INFORMATIONAL** |
| **File** | [`app/contact/page.tsx:44`](app/contact/page.tsx#L44), [`app/contact/page.tsx:117-119`](app/contact/page.tsx#L117-L119) |

**Finding:** The form has `firstName`, `lastName`, `email`, `phone`, and `message` inputs but **no `action`, no `onSubmit`, and no handler**. The page states so explicitly: *"This form is a placeholder — submissions are not yet connected to a backend."*

**Why this matters for the audit:** Verified specifically that this collects nothing and transmits nothing. There is no exfiltration path — submitting it does nothing.

**Recommended action:** When connecting a backend, add server-side validation, rate limiting, spam protection, and CSRF handling. Currently no risk.

---

### Finding 6 — Caret version ranges on all dependencies

| Field | Value |
|---|---|
| **Severity** | LOW |
| **Confidence** | HIGH |
| **Classification** | **RISKY PRACTICE** |
| **File** | [`package.json:12`](package.json#L12), [`package.json:18-25`](package.json#L18-L25) |

**Finding:** `lucide-react: "^1.44.0"`, `tailwindcss: "^4"`, `@tailwindcss/postcss: "^4"`, `typescript: "^5"`, `eslint: "^9"`, `@types/node: "^20"`. `next` and `eslint-config-next` are correctly pinned exactly (`16.3.4`), as are `react` / `react-dom` (`19.2.8`).

**Potential impact:** `npm install` (as opposed to `npm ci`) can pull newer minor/patch versions than the audited lockfile, meaning a future install may bring in code this audit did not cover — the standard supply-chain exposure window.

**Recommended action:** Use `npm ci` in CI and for reproducible installs. The lockfile is the security boundary; `npm install` can move past it.

---

## Dependency Review

All 4 production and 8 dev dependencies are recognized, first-party Next.js-ecosystem packages.

**Every single `resolved` URL in the lockfile points to `https://registry.npmjs.org/`** — zero git, GitHub, HTTP, `file:`, or `link:` dependencies. Every entry carries a `sha512` integrity hash.

### Direct dependencies

| Package | Version | Verified |
|---|---|---|
| `next` | 16.3.4 (exact pin) | registry + integrity |
| `react` | 19.2.8 (exact pin) | registry + integrity |
| `react-dom` | 19.2.8 (exact pin) | registry + integrity |
| `lucide-react` | 1.44.0 | registry + integrity; imported by 10 project files |
| `@tailwindcss/postcss` | 4.3.3 (dev) | registry + integrity |
| `tailwindcss` | 4.3.3 (dev) | registry + integrity |
| `eslint` | 9.x (dev) | registry + integrity |
| `eslint-config-next` | 16.3.4 (dev, exact pin) | registry + integrity |
| `typescript`, `@types/*` | (dev) | registry + integrity |

### Typosquatting check

Checked across the full ~260-package transitive tree. Several unusual-looking-but-genuine names were individually verified:

- `es-abstract-get`, `node-exports-info`, `generator-function`, `is-document.all` — all authored by Jordan Harband, standard ES-shim ecosystem
- `napi-postinstall`, `unrs-resolver` — native binding resolution for `eslint-import-resolver-typescript`
- `lightningcss` — Tailwind v4 CSS engine
- `sharp` — Next.js image optimization

**No typosquats, no lookalikes, no packages unrelated to a Next.js marketing site.**

---

## Next.js-Specific Security Review

| Surface | Status |
|---|---|
| API routes (`app/api/**`, `pages/api/**`) | None exist |
| Route handlers (`route.ts` / `route.js`) | None exist |
| Server Actions (`"use server"`) | None exist |
| Middleware | None exists |
| Authentication / authorization | None implemented (no auth surface to bypass) |
| Hidden admin routes | None found |
| Hardcoded credentials | None found |
| Command injection | Not possible — no shell execution in project code |
| SQL injection | Not possible — no database layer |
| SSRF | Not possible — no outbound requests in application code |
| Path traversal | Not possible — see dynamic route analysis below |
| Unsafe redirects | None — all `Link` hrefs are static literals |
| File uploads | None |

### Dynamic route parameter handling

`app/products/[slug]/page.tsx` and `app/services/[slug]/page.tsx` both resolve the `slug` param via a static array lookup:

```ts
export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
```

The param is used **only** for strict equality comparison against a hardcoded data array, never for filesystem access, database queries, or URL construction. Unmatched slugs call `notFound()`. Both routes declare `generateStaticParams()`, so valid pages are pre-rendered at build time.

**No path traversal, no injection vector.**

### Frontend security

- **3 client components** (`Header.tsx`, `MobileNav.tsx`, `VideoCard.tsx`) — all UI-only
- **2 `useEffect` hooks**, both in `Header.tsx`: a scroll-position listener and a body `overflow` lock for the mobile nav. Both benign.
- **All imports** resolve to `next`, `react`, `lucide-react`, or local `@/` paths. No third-party network libraries.
- **External link safety:** the only `target="_blank"` ([`Footer.tsx:81`](components/layout/Footer.tsx#L81)) correctly pairs with `rel="noopener noreferrer"` — no tabnabbing or referrer leakage.
- **No** XSS vectors, token exposure, `localStorage` usage, unsafe redirects, or injected external scripts.

---

## CI/CD and Deployment Review

**Nothing to audit — none of the following exist in this repository:**

- `.github/workflows/`
- `Dockerfile` / `docker-compose.yml`
- Deployment scripts
- `.sh` / `.ps1` files
- `vercel.json` / `netlify.toml`

No `curl | bash` patterns, no remote execution, no hardcoded credentials, no untrusted downloads, no SSH key exposure.

---

## Limitations of This Audit

Stated explicitly rather than assumed safe:

1. **Not all ~260 installed packages were read in full.** That is infeasible at this scale. What *was* audited is what executes on the machine: every lifecycle script in the installed tree (enumerated exhaustively), and the full source of the only package that runs on install. It was also confirmed that `node_modules` contains nothing absent from the lockfile.
2. **Dependencies were not checked against a live CVE database.** This is a static offline review; it detects *malice*, not *known vulnerabilities*. Run `npm audit` separately for CVE coverage — it needs network access, which the read-only constraint excluded.
3. **The 1.1 GB `.next/` build directory was not exhaustively scanned.** It is generated output, correctly gitignored, and derived from the source that was audited in full.
4. **Package integrity hashes were not recomputed against registry tarballs** — that would require network access.
5. **Registry-side account compromise cannot be detected statically.** If a maintainer account were hijacked and a malicious version published matching these exact hashes, no local static analysis would reveal it.

---

## Final Verdict

| # | Question | Answer |
|---|---|---|
| 1 | Evidence the repository is malicious or compromised? | **No.** Zero indicators across every check. |
| 2 | Credential/token stealing code? | **No.** No access to env, cookies, storage, clipboard, or credential files. |
| 3 | Data-exfiltration logic? | **No.** Zero outbound network calls in application code. |
| 4 | A backdoor? | **No.** No API routes, no middleware, no Server Actions, no hidden endpoints. |
| 5 | Shell/system command execution? | **No** in project code. Only in `napi-postinstall` (dev dep, registry-only, documented). |
| 6 | Remote code downloaded or executed? | **No** in project code. `napi-postinstall` can fetch native bindings from the configured npm registry; that path will not trigger here. |
| 7 | Is `package.json` safe? | **Yes.** Four stock scripts (`next dev/build/start`, `eslint`). No lifecycle scripts at all. |
| 8 | Are npm lifecycle scripts safe? | **Yes.** The project declares none. One dev-dependency postinstall, verified benign. |
| 9 | Is `postcss.config.mjs` safe? | **Yes.** 7 lines, pure declarative config, create-next-app default. |
| 10 | Is the Tailwind configuration safe? | **Yes.** CSS-first v4 config, colors only, no plugins, no external URLs. |
| 11 | Are Tailwind/PostCSS plugins trustworthy? | **Yes.** Only `@tailwindcss/postcss` 4.3.3, official Tailwind Labs. |
| 12 | Suspicious dependencies? | **No.** All from `registry.npmjs.org` with integrity hashes; no typosquats. |
| 13 | Are secrets exposed? | **No.** No `.env` files, no `NEXT_PUBLIC_*`, no secrets in git history. Nothing to mask. |
| 14 | Safe to run `npm` / `pnpm install`? | **Yes.** Prefer `npm ci` for lockfile fidelity. |
| 15 | Safe to run `npm run dev`? | **Yes.** |
| 16 | Safe to run `npm run build`? | **Yes.** Requires network for Google Fonts. |
| 17 | Safe to deploy? | **Yes**, technically. Add security headers first as good practice. |

---

# VERDICT: SAFE TO PROCEED

This is a genuine, unremarkable Next.js 16 marketing website for WeSearch — a staffing and recruitment firm with offices in Dubai and Kerala. It is a static content site with hand-written page components, two data files, and a placeholder contact form. The configuration files are unmodified create-next-app defaults. There is no server-side code whatsoever.

The single recommended action is unrelated to the site's code: **prune the [`.claude/settings.json`](.claude/settings.json) allowlist** (Finding 1), which pre-approves arbitrary `node -e` / `python3 -c` execution and whole-`D:`-drive reads for future agent sessions. That is a developer-machine guardrail worth restoring.

No files were modified, no dependencies installed, and no project scripts executed during this audit.

---

# ADDENDUM — Cross-Check Against Confirmed Malware in `streben-website-revamp`

**Added:** 2026-09-15, following discovery of malicious code in the sibling project `D:\streben-website-revamp` (same VS Code workspace).

## Result for wesearch-web: **CLEAN — no trace of this malware**

Every indicator extracted from the Streben payload was hunted across this repository's **project source, the entire `node_modules` tree, and the `.next` build output**. Zero matches.

---

## What the Streben malware is

| Property | Value |
|---|---|
| **Infected file** | `tailwind.config.js` — **the only infected file** in that repo |
| **File shape** | Lines 1–17 are the genuine config (39–58 chars each). **Line 18 is 48,552 characters**: `};` followed by a long whitespace run, then the payload — hidden past the horizontal scroll in an editor |
| **Size jump** | 348 bytes -> 49,006 bytes |
| **Introduced in** | Commit `4fdf3ef9`, dated 2025-12-24 — message reads *"Remove unused video files and enhance video loading experience…"*, unrelated to the config it silently inflated |
| **Committed?** | **Yes** — payload is in git at HEAD and pushed to `github.com/Prasyanth/streben-website-revamp` |
| **Obfuscation** | `obfuscator.io`-style `_0x`-prefixed identifiers, rotating string array, arithmetic-encoded indices |
| **Campaign ID** | `global.i="A9-8599-3"` |

### Capabilities (from static string extraction — never executed)

- **Imports** `http`, `https`, `zlib`, `url`, and **`spawn` from `child_process`**; rebuilds CommonJS `require` inside ESM via `createRequire(import.meta.url)`, then stashes it globally (`global.r = require`)
- **Blockchain dead-drop C2 resolution** ("EtherHiding"): strings include `.publicnod[e]`, `h.drpc.org`, `https://1r[pc.io]`, `[getBlo]ckByNumber`, and Etherscan-style query fragments `startblo[ck]=0&endblo[ck]`, `sort=desc`. The real C2 address is read from Ethereum transaction data via public RPC providers, so it can be rotated without updating the malware
- **C2 endpoints** `:443/0x/ls` and `:443/0x/cl`
- **Exfiltration** over HTTPS with spoofed Chrome user-agent (`Mozilla/5.` + `(Windows` + `Chrom` + `Kit/537.36`), `x-gzip` compression, custom `x-payload` / `Payload-B6` headers

**Trigger:** executes whenever Tailwind loads its config — i.e. on `vite dev` **or** `vite build`. It is build-time code execution on the developer machine, not browser-side code.

---

## Why wesearch-web was never exposed

| Check | Result |
|---|---|
| `tailwind.config.js` present? | **No — the file does not exist.** This project uses Tailwind **v4**, which is configured in CSS (`app/globals.css`). The exact attack vector has no file to live in here. |
| Config file sizes | `postcss.config.mjs` 94 B, `next.config.ts` 133 B, `eslint.config.mjs` 465 B, `package.json` 565 B, `tsconfig.json` 666 B — a 48 KB append is arithmetically impossible at these sizes |
| Longest line, any project file | **362 chars** (`SocialIcons.tsx`, SVG path data — legitimate). Streben's payload line: 48,552 |
| Whitespace-padding trick (100+ consecutive spaces) | None |
| `_0x` obfuscator identifiers | None |
| `createRequire` / `import.meta.url` | None |
| IOC strings (`A9-8599-3`, `publicnod`, `drpc.org`, `0x/ls`, `0x/cl`, `Payload-B`, `x-payload`, `ckByNumber`, `BLOCK_MULTIPLE`, `startblock`, `1rpc.io`) | **Zero matches** in project source, `node_modules`, and `.next` |
| Shared dependencies with Streben | None of concern — different stacks entirely (Next.js 16 + Tailwind v4 vs. Vite 6 + React 18 + Tailwind v3) |
| Git | Separate repository, **no remote configured**, 1 commit. No shared history or upstream with Streben |

---

## Did the payload ever run on this machine?

**Almost certainly not.** The Streben checkout has **no `node_modules`, no `dist`, no `build`, no `.vite`, and no `.cache`** — dependencies were never installed there, and every file still carries its clone timestamp. Tailwind cannot load a config without being installed, so the payload had no opportunity to execute.

This cannot be proven with absolute certainty by static analysis alone (it only proves no build occurred *in that directory* in its current state), but the evidence is consistent and strong.

---

## Recommended actions for `streben-website-revamp`

1. **Do not run `npm install`, `yarn`, `npm run dev`, or `npm run build`** in that directory. Installing dependencies is the prerequisite for the payload to fire.
2. **Notify the repository owner** (`github.com/Prasyanth/streben-website-revamp`) — the payload is committed and pushed, so every clone and every CI run is affected. Note `netlify.toml` is present: if that repo auto-deploys, the payload has been executing in the Netlify build environment since 2025-12-24.
3. **Treat commit `4fdf3ef9` as the compromise point.** Git authorship is trivially spoofable and the named author's account or machine may itself be the victim — investigate, do not accuse.
4. **Rotate any credentials** that were available in environments where that repo *was* built — CI/CD secrets, Netlify tokens, npm tokens, and any developer machine that ran it.
5. **Remediate by restoring the config**, not by hand-trimming line 18: the clean version is `git show 2bf05464:tailwind.config.js` (348 bytes). Audit all commits after 2025-12-24 for further injections.

**No action is required for `wesearch-web` on the basis of this cross-check.** The original audit's Finding 1 (the permissive `.claude/settings.json` allowlist) remains the one item worth addressing here.
