# TypeScript/JavaScript

The JS ecosystem replaces its tooling faster than it stabilizes it. Default to the boring choice; adopt the fast one when the project can absorb a break.

## Package manager

**pnpm** for anything with more than one package. Content-addressed store, strict by default, real workspace support.

```bash
pnpm install
pnpm add <pkg>
pnpm add -D <pkg>
pnpm -F <workspace-pkg> <cmd>   # run in one workspace member
```

Pin it in `package.json` so everyone resolves the same resolver:

```json
"packageManager": "pnpm@11.17.0"
```

npm is fine for a single package with no workspace. yarn is legacy unless already in use.

**bun** is both a package manager and a runtime; treat those decisions separately. As a package manager it is fast and fine. As a *production runtime* check its release cadence first: a long publish gap on the npm registry is a real signal, and it has had one.

## Compiler

TypeScript 7 is the Go-native rewrite: an order of magnitude faster, and a breaking change in shape, not just speed.

- The `tsserver` binary is **gone**; it speaks LSP now. Editor and IDE plugins need to support it.
- Some monorepo tooling still targets TS 6.

Verify before adopting on a live project:

```bash
npx tsc --version
node -e "console.log(require('typescript/package.json').version)"
```

On a greenfield project, take TS 7. On a project people ship from daily, confirm the editor path works first.

## Lint and format

Three live options, and real projects have picked all three:

| Tool | Take it when |
|---|---|
| **ESLint + Prettier** | Maximum plugin coverage, existing config, no appetite for churn |
| **Biome** | One binary for lint *and* format, stable, simple config |
| **oxlint + oxfmt** | Fastest; type-aware rules now available. Note oxfmt matured later than the linter |

Do not run two formatters. Pick one and delete the other's config, or they will fight in CI.

ESLint v9 is end-of-life; if a project is still on it, upgrading to v10 is maintenance, not a nice-to-have.

## Build and test

- **Vite** for apps. Vite 8 replaced both esbuild and Rollup internally with Rolldown: same API, different engine underneath.
- **tsdown** / **tsup** for libraries.
- **Vitest** for tests. `bun test` if the project is already all-in on bun.

```bash
pnpm vitest run              # CI
pnpm vitest                  # watch
```

## Mutation

**StrykerJS** with the Vitest runner. Coverage says a line ran; a killed mutant says a test failed when that line changed. `verify` reads the survivors, not the score.

```bash
pnpm add -D @stryker-mutator/core @stryker-mutator/vitest-runner
```

`stryker.config.mjs`:

```js
export default {
  testRunner: "vitest",
  plugins: ["@stryker-mutator/vitest-runner"],
  mutate: ["src/**/*.ts", "!src/**/*.test.ts"],
  reporters: ["clear-text", "progress"],
};
```

Name the plugin explicitly. Under pnpm the default `@stryker-mutator/*` discovery resolves against the core package's own directory inside `.pnpm/`, finds no runner there, and fails with `Cannot find TestRunner plugin "vitest". In fact, no TestRunner plugins were loaded.`

```bash
pnpm stryker run --incremental                                            # changed code only, against the last report
pnpm stryker run --incremental --force --mutate src/orders/total.ts       # one file, cache ignored
pnpm stryker run --mutate src/orders/total.ts:40-58                       # one range, no cache: the run verify reads
```

Incremental mode diffs source and test files against `reports/stryker-incremental.json`; keep that file between runs (commit it or cache it in CI) or every run is a full run. The report accumulates: an incremental run keeps mutants that are out of scope this time, so a scoped run still prints survivors from files the branch never touched. Read the survivors for a change from a run without `--incremental`, scoped by `--mutate`. Survivors print under `Survived` in the clear-text report, with the mutated line.

## Conventions as lint rules

A convention a linter can hold is held by the linter, not by prose. ESLint names below; Biome carries `noExplicitAny`, `noNonNullAssertion`, `noParameterAssign`, and `noEmptyBlockStatements`, verify the rest in its rule list.

| Convention | Rule |
|---|---|
| No `any` ([TYPES.md](../conventions/TYPES.md)) | `"strict": true` in tsconfig; `@typescript-eslint/no-explicit-any` |
| No non-null assertions, no unchecked casts | `@typescript-eslint/no-non-null-assertion`; `@typescript-eslint/consistent-type-assertions` with `assertionStyle: "never"` |
| Exhaustive by construction | `@typescript-eslint/switch-exhaustiveness-check` |
| Never mutate an argument ([PURITY.md](../conventions/PURITY.md)) | `no-param-reassign` with `{ props: true }`, which catches assignment including properties, not in-place calls like `list.push(x)` |
| Fail loud, no swallowed failure ([FAILURE.md](../conventions/FAILURE.md)) | `no-empty` (catch blocks included); `@typescript-eslint/no-floating-promises`; `@typescript-eslint/no-unused-vars` with `caughtErrors: "all"` |

All at `error`. A rule at `warn` is prose with extra steps. A necessary exception carries a one-line disable comment with the reason, per TYPES.md.

## Monorepo

**Turborepo** for task orchestration and caching. **pnpm workspaces** for linking. They compose; Turbo does not replace the package manager.

Check Turbo's declared TypeScript support before assuming it works with TS 7.

## TypeScript: pitfalls

- **`"type": "module"` is not optional any more.** Half the ecosystem is ESM-only. Setting it late is a painful migration; set it at the start.
- **A dependency's types can break your build without its runtime changing.** Pin `typescript` exactly and upgrade deliberately.
- **`npx` runs whatever is on npm right now.** In CI use `pnpm exec` against a locked version instead.
- **Verify versions from the registry, not from memory.** `npm view <pkg> version` and `https://registry.npmjs.org/<pkg>` are authoritative; this ecosystem moves monthly.
- **Do not mix package managers.** A `package-lock.json` next to a `pnpm-lock.yaml` means two different dependency trees; delete the one you are not using.

