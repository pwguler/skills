# Observability as a seam

Top-tier code is diagnosable, not only correct. Anything you would want to know during an incident is emitted by design, before the incident.

- **One correlation id, end to end.** Minted at the entry edge, propagated through every module and every outbound call, present on every log line and error. A request that cannot be followed across seams cannot be debugged across them.
- **Log at seams, structured, never free text.** Entry and exit of each load-bearing module, with the inputs that matter and the outcome. Key-value fields, not sentences; a log line is data for a query, not prose for a person.
- **No secrets, no PII in logs.** Redact at the emitting seam, not downstream; the log pipeline is not a trusted boundary.
- **Metrics at the seams that carry load.** Latency, error rate, and saturation per module interface. A seam that varies in production is a seam that needs a number.
- **Errors are observable where they are handled.** An expected failure is logged once, at the boundary that decides what to do about it, with the correlation id; never logged at every layer it passes through.
- **The incident test.** For each module, ask: if this misbehaves at 3am, what do I need to see? Emit that now. Observability added after the outage explains only the next one.
