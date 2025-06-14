This repository contains the source for **OpenFront**, an online web game with both backend and frontend components written in TypeScript. The project is organized into the following primary directories:

- `src/client` – Frontend game client
- `src/core` – Shared game logic
- `src/server` – Backend game server
- `tests` – Jest unit tests for the shared logic and server

Common tasks:

- Install dependencies with `npm i`
- Run the development environment via `npm run dev`
- Build the production bundle with `npm run build-prod`

## Programmatic checks

Before committing changes you must ensure that linting and all tests pass:

```bash
npm run lint
npm test
```

Formatting is handled by Prettier. Run `npm run format` to automatically format your code.

Use Node 20+ (the Dockerfile currently uses `node:24-slim`) and npm 10+. Pull requests should explain the testing performed and any relevant screenshots for UI changes. See [README.md](README.md) for full contribution guidelines.
