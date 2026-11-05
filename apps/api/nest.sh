#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

usage() {
  cat <<'EOF'
Usage:
  ./apps/api/nest.sh <nest-command> [options]
  ./apps/api/nest.sh generate <schematic> <name> [options]
  ./apps/api/nest.sh add <package>...
  ./apps/api/nest.sh add-dev <package>...

Examples:
  ./apps/api/nest.sh g module users
  ./apps/api/nest.sh g service users
  ./apps/api/nest.sh g class dto/create-user.dto
  ./apps/api/nest.sh add @nestjs/jwt
  ./apps/api/nest.sh add-dev @types/jsonwebtoken

All generate commands disable spec file generation.
EOF
}

if (($# == 0)); then
  usage
  exit 0
fi

command="$1"
shift

case "$command" in
  add)
    if (($# == 0)); then
      echo "error: add requires at least one package" >&2
      exit 1
    fi
    exec bun add "$@"
    ;;
  add-dev)
    if (($# == 0)); then
      echo "error: add-dev requires at least one package" >&2
      exit 1
    fi
    exec bun add --dev "$@"
    ;;
  generate | g)
    exec bunx nest "$command" "$@" --no-spec
    ;;
  help | -h | --help)
    usage
    exec bunx nest --help
    ;;
  *)
    exec bunx nest "$command" "$@"
    ;;
esac
