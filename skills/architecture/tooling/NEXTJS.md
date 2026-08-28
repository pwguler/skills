# Next.js stack conventions

Applies when the stack is TypeScript + Next.js App Router + React Query + Axios + Tailwind + shadcn/ui + React Hook Form + Zod. Otherwise ignore this file. You know these tools already; below is the default layout for this stack, not a tutorial. A project's existing structure wins (COHESION.md: match the neighbors).

- **Layers.** `components/ui/` is shadcn, never edited. `styled/` wraps one shadcn component, theming only, no logic. `common/` composes `styled/` and never fetches. Feature components go in each route's `_components/`; colocate `_hooks/`, `_schemas/`, `_services/`. Promote to `components/` only when shared across routes.
- **Data.** One Axios instance in `lib/axios.ts`; never `fetch`, never `axios` directly. HTTP lives in `services/` as plain async functions. Query keys come from `hooks/keys/` factories. React Query hooks in `hooks/` wrap `useQuery` and `useMutation`; components never call `useQuery` directly.
- **State.** React Query owns server state, never `useState` plus `useEffect`. Zustand holds global UI state only, never server data.
- **Forms.** React Hook Form with Zod, schema first, type via `z.infer<>`, shadcn `Form` components. Reset after a successful mutation; set server errors with `form.setError`.
- **Styling.** Reach for shadcn before hand-rolling; extend via a `styled/` wrapper, never edit `ui/`. shadcn CSS variables, never hardcoded colors. `cn()` for conditional classes, mobile-first.
- **Loading.** Match the indicator to the size: `Loader2` for buttons and inline items, `Skeleton` for cards, sections, and lists. Skip it when the data is already cached.
- **Server Components by default;** add `'use client'` only for interactivity.

Never: uncommented `any`, native `fetch` or direct `axios`, server state in Zustand, manual `useState` form state, forms without Zod, editing `components/ui/`, hardcoded Tailwind colors.
