# LA Glass — Setup Order

## 1. Initialize the web project first

Run this inside the empty `LAGlass` folder:

```powershell
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Complete any prompts using the recommended defaults.

## 2. Add this starter pack

Copy these files and folders into the initialized project root:

- `CLAUDE.md`
- `docs/`
- `.claude/`
- `.env.example`
- `FIRST-PROMPTS.md`

Do not run `/init` afterward unless you intentionally want Claude to revise the existing `CLAUDE.md`.

## 3. Open Claude Code

Either:

- Open the Claude Code extension panel in VS Code and sign in, or
- Run the separately installed CLI with `claude`

## 4. Confirm project instructions

In Claude Code, run:

```text
/memory
```

Confirm that the root `CLAUDE.md` and project rules are visible.

## 5. Send Prompt 1 from `FIRST-PROMPTS.md`

Prompt 1 asks Claude to inspect and plan without changing files.

## 6. Review the plan

Correct any misunderstanding before implementation.

## 7. Send Prompt 2

Prompt 2 builds only the foundation.

## 8. Work in phases

Use the remaining prompts one phase at a time. Add real assets and business details when available.

## 9. Add `.env.local` later

Copy `.env.example` to `.env.local` and add real values only when configuring the quote form. Never commit `.env.local`.

## 10. Final verification

Before launch:

- Confirm every public claim.
- Add authentic reviews only.
- Test every link.
- Submit a real quote and confirm delivery.
- Review mobile layout.
- Run lint, type checking, and production build.
- Review privacy and legal text with an appropriate adult/professional where needed.
