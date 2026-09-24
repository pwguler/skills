# Dependencies

Folding shallow modules into one deep module moves where the tests stand. What the module depends on decides how its seam is tested. Terms follow [LANGUAGE.md](LANGUAGE.md).

## Sort each dependency

| dependency | example | how the deep module takes it | how tests reach it |
|---|---|---|---|
| Pure: computation or in-memory state | parsing, pricing rules | inline, no seam | call the interface directly |
| Local, with a stand-in | an embedded database engine, a temp directory | inline; the stand-in runs inside the suite | the real code path, against the stand-in |
| Remote, and yours | a service your team runs | a port the module declares, with transport in an adapter | an in-memory adapter; production wires the network one |
| Remote, and someone else's | a payment or messaging vendor | a port the module declares | a scripted fake adapter |

A remote-and-yours recommendation reads: "declare a port at the seam, with a network adapter in production and an in-memory one in tests, so the logic stays in one deep module even though it runs across the network."

Only the two remote rows put a port on the module's interface. A local stand-in keeps its seam inside the implementation.

## When a seam earns a port

A port pays for itself with its second adapter; production plus a test fake is the usual pair. With one adapter it is indirection and nothing more: keep the call direct.

Seams the module's own tests use may stay private. Keeping them off the interface keeps the interface small.

## Moving the tests

- Once the deep module has tests at its interface, the old tests on the shallow pieces are dead weight. Delete them rather than keep two layers.
- New tests call the interface and check only what a caller could observe.
- A test that breaks when only the implementation changed is reaching past the interface. Rewrite it against the interface.
