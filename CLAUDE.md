# CLAUDE.md

## Code style

- Use functional programming best practices where possible (pure functions, immutability, composition over mutation, no classes unless required).
- Never use `function` declarations. Use arrow functions assigned to `const` instead, e.g. `const Component = () => {}`.
- Never use `interface`. Always use `type` aliases.
