# Boundary security

Security is a property of seams. Nothing that crossed a seam from outside is trusted, and each kind of decision happens at exactly one seam.

- **Authenticate and authorize at the entry seam, once.** Identity is established where the request enters; authorization is decided there against the resource and action. Inner modules receive an already-authorized principal and check nothing again. A permission check scattered through the domain is a permission check someone will forget.
- **Least privilege per module.** Each module, credential, and process holds the minimum access its interface needs. A module that can do more than its interface promises is an escalation path.
- **Validate on entry, encode on exit.** Inbound data is parsed into trusted types at the entry seam (TYPES.md). Outbound data is encoded for its destination at the output seam: HTML-escaped for a page, parameterized for a query, quoted for a shell. Never build a query, command, or document by string concatenation with outside data.
- **Secrets come from the environment, never the codebase.** No key, token, or password in source, config files under version control, logs, or error messages. Rotate on exposure, not on schedule alone.
- **Fail closed.** When an authorization or validation step cannot complete, deny. A fallback that grants access because a check errored is a vulnerability with a stack trace.
- **Dependencies are part of the attack surface.** Pin them, audit them, and prefer what is already present over what is new (the ladder in `implement`). A dependency you did not need is a CVE you did not need.

The test: for each seam, ask what an attacker who controls everything on the outside can make the inside do. The answer should be nothing the interface does not already permit.
