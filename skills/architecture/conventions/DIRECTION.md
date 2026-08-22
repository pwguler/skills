# Dependency direction

Dependencies point inward. The domain sits at the center and knows nothing about how it is stored, served, or scheduled; everything that touches the outside world sits at the edge and adapts inward through a seam.

- **The domain imports nothing from the edge.** No framework, no ORM, no HTTP client, no queue library inside domain modules. A domain file that imports a database driver is in the wrong layer, whatever its folder says.
- **Edges depend on the domain, never the reverse.** A handler calls the domain; the domain never calls a handler. A repository implements a port the domain defined; the domain never reaches for a repository class.
- **The seam is a port the domain owns.** The domain declares what it needs (an interface in its own vocabulary); the edge supplies an adapter. DEEPENING.md's dependency categories decide whether that port is internal or at the module's external interface.
- **Testable without mocks is the proof.** If the domain can be exercised with in-memory adapters and no framework running, the direction is right. If a domain test needs a database or an HTTP server, a dependency is pointing the wrong way.
- **One rule decides placement.** Ask what a file imports. Domain imports domain. Edge imports domain and the outside world. Nothing imports the edge except the composition root that wires adapters to ports.

Use CONTEXT.md vocabulary to name the domain and LANGUAGE.md vocabulary for seams, ports, and adapters.
