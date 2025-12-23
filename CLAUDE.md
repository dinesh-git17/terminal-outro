# CLAUDE.md — Engineering Contract

**Project:** DinBuilds Terminal Outro — Cinematic Branding Experience
**Stack:** Next.js 16+ (App Router), TypeScript 5+ (strict), Tailwind CSS 4+, React 19+, Framer Motion
**Domain:** outro.dinbuilds.com

---

## 1. Non-Negotiable Rules

### 1.1 TypeScript

- `strict: true` is immutable — no silencing errors via config
- `any` is banned — use `unknown` if type genuinely unknown
- All functions: explicit return types and parameter types
- Props interfaces: exported and named `{ComponentName}Props`
- `as` assertions require inline comment justification — never use `as any`

### 1.2 Code Cleanliness

- **No console.log** — ESLint will fail
- **No inline styles** — Tailwind only (document exceptions)
- **No commented-out code** — delete it, git history exists
- **No magic numbers** — use Tailwind scale or named constants
- Animation timings must be defined as named constants

### 1.3 Animation Standards

- **Deterministic behavior** — animations must produce identical output every run
- **No random values** — use seeded randomness only if randomness is required
- **Timing precision** — all durations in milliseconds, defined as constants
- **Frame rate target** — animations must maintain 60fps
- **Reduced motion** — respect `prefers-reduced-motion` media query
- **Completion callbacks** — all animations must have defined end states

### 1.4 Accessibility (WCAG AA)

- Keyboard accessible with visible focus indicators (never bare `outline: none`)
- Semantic HTML: proper heading hierarchy, landmarks
- ARIA: `aria-label` for icon-only buttons, no redundant ARIA
- Color contrast: 4.5:1 normal text, 3:1 large text/UI components
- **Reduced motion**: provide fallback for users with motion sensitivity
- Skip animation option if animation duration exceeds 5 seconds

### 1.5 SEO

- Every page exports `metadata` object with title (50-60 chars), description (150-160 chars)
- Open Graph + Twitter Card tags required
- Canonical URLs configured via `metadata.alternates.canonical`
- JSON-LD WebApplication schema, sitemap.xml, robots.txt
- One h1 per page

### 1.6 Performance

- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- Use `next/font` with `display: 'swap'`
- Bundle limits: route < 200KB gzipped, first-load JS < 150KB
- Lazy load below-fold content, dynamic imports for heavy components
- No blocking third-party scripts — use `next/script` with appropriate strategy
- **Animation performance:** GPU-accelerated transforms only (transform, opacity)

### 1.7 AI Attribution (Strictly Forbidden)

- Never mention "Claude", "AI", "assistant", "generated", "Anthropic" in commits, PRs, or code
- Write commit messages as human developer — no AI attribution comments
- Pre-commit hooks enforce this

---

## 2. Git Workflow

### 2.1 Branch Flow

```bash
git checkout main && git pull origin main    # Always start fresh
# Make changes, then create branch BEFORE committing:
git checkout -b feature/descriptive-name
```

### 2.2 Commit Format (Conventional Commits)

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
**Scopes:** `animation`, `ui`, `terminal`, `timing`, `seo`, `a11y`, `perf`, `config`, `ci`, `deps`

```bash
git commit -m "feat(animation): add typewriter text effect"
```

### 2.3 Branch Naming

| Prefix      | Purpose                   |
| ----------- | ------------------------- |
| `feature/`  | New functionality         |
| `fix/`      | Bug fixes                 |
| `perf/`     | Performance               |
| `a11y/`     | Accessibility             |
| `refactor/` | Code refactoring          |
| `hotfix/`   | Critical production fixes |

Rules: lowercase, hyphens, descriptive (not `feature/update`)

### 2.4 Branch Protection

- PR required, 1 reviewer, squash merge only
- CI must pass (lint, type-check, build)
- Never commit/force-push to main

---

## 3. Code Quality

### 3.1 Automated Checks

**Pre-commit:** ESLint, Prettier, TypeScript (staged files)
**CI:** ESLint (zero warnings), type-check, build

### 3.2 Rules

- Zero ESLint warnings in CI — no `eslint-disable` without justification
- Prettier config is immutable — run `npm run format` before commit
- No `@ts-ignore` without inline justification
- Build must pass locally before push

---

## 4. Component Standards

### 4.1 Structure

```typescript
import { motion } from 'framer-motion';

import type { ReactNode } from 'react';

export interface TerminalLineProps {
  text: string;
  delay: number;
  onComplete?: () => void;
}

export function TerminalLine({ text, delay, onComplete }: TerminalLineProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000, duration: 0.1 }}
      onAnimationComplete={onComplete}
      className="font-mono text-terminal-green"
    >
      {text}
    </motion.div>
  );
}
```

### 4.2 Rules

- Functional components only — hooks for state/lifecycle
- Named exports for components/utilities, default exports for pages only
- Use `React.memo` only after profiling proves need
- Colocate related files: `ComponentName/ComponentName.tsx`, `index.ts`
- Animation components must expose `onComplete` callback

---

## 5. Animation Guidelines

### 5.1 Timing Constants

```typescript
// src/lib/timing.ts
export const TIMING = {
  BOOT_SEQUENCE_DELAY: 500,
  TYPEWRITER_CHAR_DELAY: 50,
  LINE_APPEAR_DELAY: 200,
  CURSOR_BLINK_RATE: 530,
  FADE_OUT_DURATION: 1000,
} as const;
```

### 5.2 Rules

- All timing values must be defined in `src/lib/timing.ts`
- Use Framer Motion for all animations
- Prefer CSS transforms over layout-triggering properties
- Test animations at various frame rates
- Document animation sequences with timing diagrams if complex

### 5.3 Determinism

- No `Math.random()` in animation code
- No `Date.now()` for timing — use animation frame callbacks
- All animations must complete in the same duration every run
- State transitions must be predictable

---

## 6. Styling

- **Tailwind only** — no CSS modules, styled-components, or inline styles
- Design tokens in `globals.css` via CSS custom properties
- Mobile-first: base styles for mobile, `sm:`/`md:`/`lg:` for larger
- Terminal aesthetic: monospace fonts, green-on-black, CRT effects
- Class order: layout → box model → typography → visual → misc
- Use `prettier-plugin-tailwindcss` for automatic sorting

---

## 7. Naming Conventions

| Type             | Convention           | Example                 |
| ---------------- | -------------------- | ----------------------- |
| Components       | PascalCase           | `TerminalLine.tsx`      |
| Utilities        | camelCase            | `calculateDelay.ts`     |
| Constants        | UPPER_SNAKE          | `CURSOR_BLINK_RATE`     |
| Booleans         | is/has/should prefix | `isAnimating`           |
| Handlers         | handle/on prefix     | `handleAnimationEnd`    |
| Props interfaces | `{Name}Props`        | `TerminalLineProps`     |
| Timing constants | Descriptive          | `TYPEWRITER_CHAR_DELAY` |

---

## 8. Error Handling

```typescript
// Error boundary: app/error.tsx
'use client';
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <h2 className="text-terminal-green">ERROR: Something went wrong</h2>
      <button onClick={reset} className="mt-4 border border-terminal-green px-4 py-2">
        [ RETRY ]
      </button>
    </div>
  );
}
```

- Never expose internal errors to users
- User-facing messages: terminal-style, professional tone

---

## 9. Comments

- Comments explain **WHY**, not **WHAT**
- JSDoc for public APIs only
- No emojis, casual language, or "I think" commentary
- TODO format: `// TODO(username): description`
- Animation timing comments: `// Delay: 500ms after boot sequence`

---

## 10. Architecture

```
app/           # Next.js App Router (layout, page, error, sitemap, robots)
components/    # React components (animation components, UI elements)
lib/           # Utilities, constants, timing definitions
styles/        # Additional style files if needed
public/        # Static assets (favicon, OG images)
scripts/       # Build and validation scripts
```

- Use absolute imports: `@/components/TerminalLine`
- Components: UI and animation only, no business logic
- Utilities: pure functions, thoroughly tested
- Timing: all animation timing in `lib/timing.ts`

---

## 11. Deployment

- All CI checks must pass — no exceptions
- Vercel preview on every PR — test before merge
- Production deploys from main only
- Monitor Core Web Vitals via Vercel Analytics
- Test animation performance on production build

---

## 12. Enforcement

- CI failures block merge — no override
- Every PR requires review
- Reviewer verifies: code quality, animation determinism, performance, compliance

---

## 13. Claude-Specific Development Rules

### 13.1 Incremental Changes

- Make one logical change at a time
- Verify each change works before proceeding
- Do not combine unrelated changes in a single edit

### 13.2 Animation Development

- Build animations incrementally — one effect at a time
- Test each animation phase before adding the next
- Document timing sequences clearly
- Ensure animations are skippable for testing

### 13.3 No Speculative Refactors

- Do not refactor code without explicit approval
- Do not add features beyond what is requested
- Do not "improve" working code unless asked

### 13.4 Explicit Approval Required

- Major architectural changes require user approval
- New dependencies require user approval
- Changes to timing constants require user approval
- Changes affecting the final render require user approval

---

**END OF DOCUMENT**

This is the engineering contract for DinBuilds Terminal Outro. When in doubt, err on the side of strictness and determinism.
