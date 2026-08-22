# Concurrency and state

Shared mutable state across concurrent paths is where the hardest bugs live. The rules make ownership and ordering explicit so they are never assumed.

- **Every piece of state has one owner.** One module creates it, mutates it, and decides its lifetime. Others read through the owner's interface or receive a copy. State with two writers has no owner.
- **No shared mutable state across an async boundary.** What crosses a task, thread, worker, or request boundary is a message or an immutable value, not a reference both sides mutate. Ownership moves; it is not shared.
- **Name every async boundary.** Where work becomes concurrent (a queue, a goroutine, a promise fan-out, a background job) is a seam in LANGUAGE.md's sense: it is documented, and what crosses it is typed.
- **Ordering is stated, never assumed.** If two operations must happen in order, the code enforces it (a sequence, a version, a lock with a named scope). If the order does not matter, say so, and the code must be correct in every interleaving.
- **Handlers are idempotent and reentrant.** A message, job, or event may arrive twice or out of order. Handling it again produces the same end state, and handling it concurrently with itself does not corrupt.
- **Bound the concurrency.** Unbounded fan-out is a resource exhaustion waiting for load. Pools, semaphores, and backpressure are part of the design, not an afterthought.

The test: pick any two concurrent paths and ask what they share. If the answer is a mutable thing, find its owner or remove the sharing.
