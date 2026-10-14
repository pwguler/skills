# Visual

Match the form to the structure: a shallow file tree or call tree, a flow diagram in Mermaid (pi renders it in the reply), or one HTML file for a layout. Trees and diagrams carry names only, no bodies. An HTML file lives outside the repository and the reply gives its path. The visual follows the lead line and shows the touched region only, never the whole repository, and never file contents: the code diff is already on screen. Use the diff form when the surrounding tree already exists, a plain tree when it is new. What the visual shows, the prose does not repeat.

A file split into a module:

```diff
 src/
 ├── commands/
-└── transport.ts
+└── transport/
+    ├── client.ts
+    └── stream.ts
```
