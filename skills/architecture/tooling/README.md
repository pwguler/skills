# Tooling

Reference for the toolchains themselves: commands, configuration shape, and the pitfalls that bite in practice. Load only the file for the ecosystem the work touches; this is not a workflow step.

- [PYTHON.md](PYTHON.md): uv and ruff, type checking, pitfalls.
- [RUST.md](RUST.md): the cargo toolchain, pinning, error handling.
- [TYPESCRIPT.md](TYPESCRIPT.md): package manager, compiler, lint, build, monorepo.
- [PRISMA.md](PRISMA.md): the migration loop, querying, when not to Prisma.
- [NEXTJS.md](NEXTJS.md): conventions for the Next.js App Router + React Query + Axios + shadcn/ui + React Hook Form + Zod stack.

Two rules run through all four:

- **Verify versions from the registry, never from memory.** These ecosystems move monthly, and a confidently wrong version number is worse than no answer. Each file names its authoritative source.
- **Restraint over reach.** A formatter that rewrites files outside the diff, or a lint sweep nobody asked for, buries the actual change. Scope tool runs to the code being edited.
