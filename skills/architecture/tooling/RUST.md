# Rust: the cargo toolchain

The Rust toolchain ships its own linter, formatter, and test runner. Reach outside it only for the gaps: faster test output, security auditing, license policy.

## Official, installed by rustup

```bash
cargo build --release
cargo clippy --all-targets --all-features -- -D warnings
cargo fmt --check              # CI
cargo fmt                      # local
cargo test
```

`--all-targets` matters: without it clippy skips tests, benches, and examples, which is exactly where sloppy code hides. `-D warnings` is what makes CI fail rather than merely complain.

## Third-party, worth adding

```bash
cargo install cargo-nextest    # faster test runner, far better output
cargo nextest run

cargo install cargo-deny       # licenses, bans, advisories, sources
cargo deny check

cargo install cargo-audit      # RustSec advisories only
cargo audit
```

`cargo-deny` supersedes `cargo-audit` for most projects: it covers advisories *and* license policy *and* duplicate-version bans from one config. Use `cargo-audit` alone when advisories are all you want.

`cargo-binstall` fetches prebuilt binaries instead of compiling them; on CI it turns a multi-minute `cargo install` into seconds.

## Mutation: cargo-mutants

cargo-mutants replaces function bodies with values of their return type and swaps operators, then reports what the suite let through. Coverage says a line ran; a missed mutant says no test failed when the function stopped working. `verify` reads `missed.txt`, not the score.

```bash
cargo install cargo-mutants             # or: cargo binstall cargo-mutants

git diff $(git merge-base origin/main HEAD) > /tmp/branch.diff
cargo mutants --in-diff /tmp/branch.diff          # only mutants overlapping the branch's changes
cargo mutants --file src/orders/total.rs          # one file
cargo mutants --in-diff /tmp/branch.diff --jobs 4
```

Output lands in `mutants.out/`: `missed.txt` is the survivors list; `caught.txt`, `timeout.txt`, and `unviable.txt` are the rest; `diff/` holds one patch per mutant. Add `/mutants.out*` to `.gitignore`. `--in-diff` matches the diff against source only, so a slice that changes only tests runs no mutants: check it with `--file` on the module those tests cover.

## Conventions as lints

A convention a linter can hold is held by the linter, not by prose. In `Cargo.toml`, so every crate member and CI agree:

```toml
[lints.rust]
unsafe_code = "forbid"
unused_must_use = "deny"

[lints.clippy]
unwrap_used = "deny"
expect_used = "deny"
let_underscore_must_use = "deny"
wildcard_enum_match_arm = "deny"
```

| Convention | Lint |
|---|---|
| No escape hatches ([TYPES.md](../conventions/TYPES.md)) | `unsafe_code`; `unwrap_used`, `expect_used`, with `allow-unwrap-in-tests = true` and `allow-expect-in-tests = true` in `clippy.toml` |
| Exhaustive by construction | `wildcard_enum_match_arm` |
| Fail loud, no swallowed failure ([FAILURE.md](../conventions/FAILURE.md)) | `unused_must_use`; `let_underscore_must_use` |

Argument mutation ([PURITY.md](../conventions/PURITY.md)) needs no lint: a `&mut` parameter is the declaration, and the borrow checker holds the rest. A necessary exception carries `#[allow(...)]` on the item with the reason beside it, never at the crate root.

## Pinning the toolchain

`rust-toolchain.toml` at the repo root, committed:

```toml
[toolchain]
channel = "1.97.1"
components = ["clippy", "rustfmt"]
```

rustup honors this automatically. Everyone, including CI, gets the same compiler without being told.

## Rust: error handling convention

The split is near-universal and worth following:

- **`thiserror`** in libraries. Typed errors the caller can match on.
- **`anyhow`** in binaries. Context chains, no enum ceremony.
- **`eyre`/`color-eyre`** in CLIs that want pretty reports.
- **`miette`** only when source-span diagnostics matter (a compiler, a parser).

Do not put `anyhow` in a library's public API; it erases the type information the caller needs.

## Rust: verifying versions

crates.io lies about bundled tools. `clippy` and `rustfmt` on crates.io are abandoned 2017-2018 placeholders; the real versions live only in the rustup channel manifest.

```bash
rustc --version && cargo --version
cargo clippy --version && cargo fmt --version
```

For the current stable release, read the dist manifest, not a blog post:
`https://static.rust-lang.org/dist/channel-rust-stable.toml`

## Rust: pitfalls

- **Clippy without `--all-targets` gives false confidence.** Test code goes unlinted.
- **`cargo test` compiles test binaries per target.** Consolidating integration tests into one `tests/it/main.rs` with `mod` declarations noticeably cuts build time on large suites.
- **MSRV is a promise.** If `rust-version` is set in `Cargo.toml`, CI must actually build with it; a dependency bump can raise the real floor silently.
- **`cargo update` is not `cargo upgrade`.** The former moves within your semver ranges; the latter (from `cargo-edit`) rewrites the ranges themselves.
- **cranelift is nightly-only.** It is listed in the stable manifest with zero available targets: present in the component list, not actually installable.

