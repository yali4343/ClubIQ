Football-IQ is a production-style Full-Stack football dashboard and a continuous learning project.

## Working principles

- Inspect the relevant existing implementation before changing code.
- Make the smallest coherent change required for the task; avoid unrelated refactors.
- Prefer changes with real product or architectural value over exercise-only features.
- Do not introduce new technologies or abstractions without a clear current requirement.
- Explain important implementation and architectural decisions so the changes remain understandable.
- Git: once a plan is approved and verification has passed, routine branch/commit/push/PR/merge/cleanup work may proceed without asking each time. Still ask first before destructive or hard-to-reverse operations (force-push, `reset --hard`, history rewrites, branch deletion, etc.) or any Git action outside the approved plan.

## Learning workflow

- `ProgramGoal.md` at the repo root is the source of truth for the learning roadmap, topic order, and scope. The repository itself is the source of truth for Football-IQ's current technical state.
- Before proposing work for a learning topic, inspect both `ProgramGoal.md` and the relevant existing implementation.
- Learning happens through real improvements to Football-IQ, not artificial exercises: propose 1-3 meaningful changes for the current subtopic that both improve the project and teach the concept, then wait for approval before implementing them.
- Stay scoped to the current subtopic: don't pull in future ProgramGoal topics early just to make a solution look more advanced.
- `/teach` is invoked by you, not something Claude calls on its own initiative; when invoked, ground it in the current subtopic and the real code under discussion.

### Workflow for a meaningful change

inspect -> teach/understand -> propose a plan -> wait for approval -> implement -> verify -> explain the important decisions.

- Before implementation, explain the important architectural/product decisions that need to be understood up front.
- Once a plan is approved, automate implementation, refactors, imports, lint/build/tests, and routine Git work - don't make the user do boilerplate or repetitive steps by hand.
- Ask understanding questions only when a concept is genuinely important for architecture, debugging, or interviews - not after every mechanical step.
- Keep changes scoped to the current topic; avoid unrelated refactors.
- Never claim verification succeeded unless the relevant checks were actually run.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (yali4343/Football-IQ), via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context layout (root `CONTEXT.md` + `docs/adr/`). See `docs/agents/domain.md`.
