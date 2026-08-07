# Quality and Safety Rules

- Read `git diff` before summarizing work.
- Run relevant tests and checks after meaningful edits.
- Never report a command as successful without running it.
- Never commit `.env.local` or secrets.
- Never place provider API keys in `NEXT_PUBLIC_*` variables.
- Keep `.env.example` limited to placeholder values.
- Do not weaken TypeScript or ESLint settings just to make checks pass.
- Fix the underlying issue rather than suppressing warnings without explanation.
- Avoid destructive Git commands.
- Do not deploy or send live form submissions without explicit approval.
- Do not change business claims unless `docs/BUSINESS-INFO.md` is updated.
