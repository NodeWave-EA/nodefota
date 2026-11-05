# Nest CLI helper

Use [`nest.sh`](./nest.sh) for Nest CLI operations in the API application. The
helper runs from `apps/api`, so generated files are placed under `src`.

## Generate files

All generation commands automatically disable spec file creation with
`--no-spec`.

```bash
./apps/api/nest.sh generate module users
./apps/api/nest.sh g service users
./apps/api/nest.sh g controller users
./apps/api/nest.sh g class dto/create-user.dto
```

The helper forwards all Nest schematics and options:

```bash
./apps/api/nest.sh g resource users -- CRUD
./apps/api/nest.sh g module users --flat
./apps/api/nest.sh g service users --dry-run
```

## Install packages

Use `add` for runtime dependencies and `add-dev` for development
dependencies. Both commands use Bun and update the API package manifest.

```bash
./apps/api/nest.sh add @nestjs/jwt
./apps/api/nest.sh add @nestjs/swagger
./apps/api/nest.sh add-dev @types/jsonwebtoken
```

## Other Nest commands

Commands that are not generation or package installation are passed directly
to the Nest CLI:

```bash
./apps/api/nest.sh info
./apps/api/nest.sh build
./apps/api/nest.sh start --watch
./apps/api/nest.sh --help
```

From the repository root, use the Bun shortcut:

```bash
bun run nest -- g module users
```
