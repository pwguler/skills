# Visual

Match the form to the structure. Use a shallow file tree or call tree, a flow diagram in Mermaid, or one HTML file for a layout. When the reply does not render Mermaid, draw the flow as a text diagram. Trees and diagrams show names only, no bodies. An HTML file goes outside the repository, and the reply gives its path. The visual comes after the first line, and shows only the region that the change touched. Never show the whole repository or file contents, because the code diff is already on screen. Use the diff form when the tree around the change already exists. Use a plain tree when the tree is new. Do not repeat in prose what the visual shows.

A file split into a module:

```diff
 src/
 ├── commands/
-└── transport.ts
+└── transport/
+    ├── client.ts
+    └── stream.ts
```
