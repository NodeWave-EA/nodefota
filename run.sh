#!/bin/sh
#
# Manage the FOTA platform stack (backend, dashboard, and layered Supabase).
# Comprehensive wrapper mapping all Docker Compose subcommands and option presets.
#

set -e

cd "$(dirname "$0")"

ensure_networks() {
  for network in fota_network supabase_default; do
    if ! docker network inspect "$network" >/dev/null 2>&1; then
      docker network create "$network" >/dev/null
      echo "  ✓ Created Docker network: $network"
    fi
  done
}

link_if_present() {
  target="$1"
  link="$2"
  if [ -e "$target" ]; then
    ln -sfn "$(basename "$target")" "$link"
    echo "  ✓ Updated $link -> $target"
  fi
}

switch_env() {
  sub="${1:-}"
  case "$sub" in
    --dev | dev)
      echo "==> Switching environment to DEVELOPMENT..."
      link_if_present docker-compose.dev.yml docker-compose.yml
      link_if_present apps/api/docker-compose.api.dev.yml apps/api/docker-compose.yml
      link_if_present apps/api/.env.development apps/api/.env
      link_if_present apps/web/docker-compose.web.dev.yml apps/web/docker-compose.yml
      link_if_present apps/web/.env.development apps/web/.env
      link_if_present docker/supabase/.env.development docker/supabase/.env
      link_if_present docker/caddy/Caddyfile.dev docker/caddy/Caddyfile
      echo "Successfully switched to DEVELOPMENT mode."
      ;;
    --prod | prod)
      echo "==> Switching environment to PRODUCTION..."
      link_if_present docker-compose.prod.yml docker-compose.yml
      link_if_present apps/api/docker-compose.api.prod.yml apps/api/docker-compose.yml
      link_if_present apps/api/.env.production apps/api/.env
      link_if_present apps/web/docker-compose.web.prod.yml apps/web/docker-compose.yml
      link_if_present apps/web/.env.production apps/web/.env
      link_if_present docker/supabase/.env.production docker/supabase/.env
      link_if_present docker/caddy/Caddyfile.prod docker/caddy/Caddyfile
      echo "Successfully switched to PRODUCTION mode."
      ;;
    *)
      echo "Usage: $(basename "$0") env [--dev | --prod]" >&2
      exit 1
      ;;
  esac
}

# Helper to extract --watch / -w flag from positional arguments
WATCH_MODE=false
FILTERED_ARGS=""
parse_watch_flag() {
  WATCH_MODE=false
  FILTERED_ARGS=""
  for arg in "$@"; do
    if [ "$arg" = "--watch" ] || [ "$arg" = "-w" ]; then
      WATCH_MODE=true
    else
      FILTERED_ARGS="$FILTERED_ARGS $arg"
    fi
  done
}

run_recreate() {
  parse_watch_flag "$@"
  ensure_networks
  if [ "$WATCH_MODE" = true ]; then
    # shellcheck disable=SC2086
    docker compose up -d --wait --build --force-recreate $FILTERED_ARGS
    echo "==> Starting Docker Compose WATCH mode..."
    # shellcheck disable=SC2086
    exec docker compose watch $FILTERED_ARGS
  else
    exec docker compose up -d --wait --build --force-recreate "$@"
  fi
}

CMD="${1:-help}"
[ "$#" -gt 0 ] && shift

case "$CMD" in
  # =========================================================================
  # Environment Management
  # =========================================================================
  env)
    switch_env "$@"
    ;;

  dev)
    parse_watch_flag "$@"
    switch_env --dev
    if [ "$WATCH_MODE" = true ]; then
      ensure_networks
      echo "==> Recreating stack and starting WATCH mode..."
      # shellcheck disable=SC2086
      docker compose up -d --wait --build --force-recreate $FILTERED_ARGS
      # shellcheck disable=SC2086
      exec docker compose watch $FILTERED_ARGS
    else
      run_recreate "$@"
    fi
    ;;

  dev-watch)
    switch_env --dev
    ensure_networks
    echo "==> Recreating stack and starting WATCH mode..."
    docker compose up -d --wait --build --force-recreate "$@"
    exec docker compose watch "$@"
    ;;

  prod)
    switch_env --prod
    run_recreate "$@"
    ;;

  # =========================================================================
  # Lifecycle & Stack Commands (Up / Down / Recreate / Watch)
  # =========================================================================
  start | up)
    parse_watch_flag "$@"
    ensure_networks
    if [ "$WATCH_MODE" = true ]; then
      # shellcheck disable=SC2086
      docker compose up -d --wait --build $FILTERED_ARGS
      echo "==> Starting Docker Compose WATCH mode..."
      # shellcheck disable=SC2086
      exec docker compose watch $FILTERED_ARGS
    else
      exec docker compose up -d --wait --build "$@"
    fi
    ;;
  up-no-build)
    parse_watch_flag "$@"
    ensure_networks
    if [ "$WATCH_MODE" = true ]; then
      # shellcheck disable=SC2086
      docker compose up -d --wait $FILTERED_ARGS
      echo "==> Starting Docker Compose WATCH mode..."
      # shellcheck disable=SC2086
      exec docker compose watch $FILTERED_ARGS
    else
      exec docker compose up -d --wait "$@"
    fi
    ;;
  watch)
    ensure_networks
    echo "==> Starting Docker Compose WATCH mode..."
    exec docker compose watch "$@"
    ;;
  stop | down)
    exec docker compose down "$@"
    ;;
  down-volumes | down-v)
    exec docker compose down -v "$@"
    ;;
  down-all)
    echo "==> Stopping containers, removing volumes, orphans, and local images..."
    exec docker compose down --rmi all -v --remove-orphans "$@"
    ;;
  restart)
    parse_watch_flag "$@"
    if [ "$WATCH_MODE" = true ]; then
      # shellcheck disable=SC2086
      docker compose restart $FILTERED_ARGS
      echo "==> Starting Docker Compose WATCH mode..."
      # shellcheck disable=SC2086
      exec docker compose watch $FILTERED_ARGS
    else
      exec docker compose restart "$@"
    fi
    ;;
  recreate)
    run_recreate "$@"
    ;;
  api | web | mqtt | mailpit | caddy | supabase)
    parse_watch_flag "$@"
    ensure_networks
    if [ "$WATCH_MODE" = true ]; then
      # shellcheck disable=SC2086
      docker compose up -d --wait --build "$CMD" $FILTERED_ARGS
      echo "==> Starting Docker Compose WATCH mode for $CMD..."
      # shellcheck disable=SC2086
      exec docker compose watch "$CMD" $FILTERED_ARGS
    else
      exec docker compose up -d --wait --build "$CMD" "$@"
    fi
    ;;
  create)
    exec docker compose create "$@"
    ;;
  start-containers)
    exec docker compose start "$@"
    ;;
  stop-containers)
    exec docker compose stop "$@"
    ;;
  pause)
    exec docker compose pause "$@"
    ;;
  unpause)
    exec docker compose unpause "$@"
    ;;
  kill)
    exec docker compose kill "$@"
    ;;

  # =========================================================================
  # Build & Image Management
  # =========================================================================
  build)
    exec docker compose build "$@"
    ;;
  build-no-cache)
    exec docker compose build --no-cache "$@"
    ;;
  pull)
    exec docker compose pull "$@"
    ;;
  push)
    exec docker compose push "$@"
    ;;
  images)
    exec docker compose images "$@"
    ;;

  # =========================================================================
  # Monitoring & Logging
  # =========================================================================
  status | ps)
    exec docker compose ps "$@"
    ;;
  logs)
    exec docker compose logs -f "$@"
    ;;
  logs-tail)
    exec docker compose logs --tail=100 -f "$@"
    ;;
  logs-timestamps)
    exec docker compose logs -f --timestamps "$@"
    ;;
  top)
    exec docker compose top "$@"
    ;;
  stats)
    exec docker compose stats "$@"
    ;;
  events)
    exec docker compose events "$@"
    ;;

  # =========================================================================
  # Execution & File Transfer Commands
  # =========================================================================
  exec)
    [ $# -eq 0 ] && {
      echo "Usage: $(basename "$0") exec <service> <command>" >&2
      exit 1
    }
    exec docker compose exec "$@"
    ;;
  interactive)
    [ $# -eq 0 ] && {
      echo "Usage: $(basename "$0") interactive <service>" >&2
      exit 1
    }
    exec docker compose exec -it "$1" sh
    ;;
  run)
    [ $# -eq 0 ] && {
      echo "Usage: $(basename "$0") run <service> <command>" >&2
      exit 1
    }
    exec docker compose run --rm "$@"
    ;;
  inspect)
    [ $# -eq 0 ] && {
      echo "Usage: $(basename "$0") inspect <service> [docker-inspect-args]" >&2
      exit 1
    }
    svc="$1"
    shift
    cid=$(docker compose ps -q "$svc")
    [ -z "$cid" ] && {
      echo "Service '$svc' is not running" >&2
      exit 1
    }
    exec docker inspect "$cid" "$@"
    ;;
  printenv)
    [ $# -eq 0 ] && {
      echo "Usage: $(basename "$0") printenv <service>" >&2
      exit 1
    }
    svc="$1"
    cid=$(docker compose ps -q "$svc")
    [ -z "$cid" ] && {
      echo "Service '$svc' is not running" >&2
      exit 1
    }
    exec docker inspect --format='{{range .Config.Env}}{{println .}}{{end}}' "$cid"
    ;;
  cp)
    [ $# -lt 2 ] && {
      echo "Usage: $(basename "$0") cp <src> <dest>" >&2
      echo "Examples:" >&2
      echo "  $(basename "$0") cp api:/app/package.json ./package.json" >&2
      echo "  $(basename "$0") cp ./config.json api:/app/config.json" >&2
      exit 1
    }
    exec docker compose cp "$@"
    ;;
  cp-from)
    [ $# -lt 3 ] && {
      echo "Usage: $(basename "$0") cp-from <service> <container_path> <host_destination>" >&2
      echo "Example: $(basename "$0") cp-from api /app/dist ./dist" >&2
      exit 1
    }
    svc="$1"
    cpath="$2"
    hdest="$3"
    echo "==> Copying '$cpath' from service '$svc' to local host '$hdest'..."
    exec docker compose cp "$svc:$cpath" "$hdest"
    ;;
  cp-to)
    [ $# -lt 3 ] && {
      echo "Usage: $(basename "$0") cp-to <service> <host_source> <container_destination>" >&2
      echo "Example: $(basename "$0") cp-to api ./config.json /app/config.json" >&2
      exit 1
    }
    svc="$1"
    hsrc="$2"
    cdest="$3"
    echo "==> Copying local host '$hsrc' to '$cdest' in service '$svc'..."
    exec docker compose cp "$hsrc" "$svc:$cdest"
    ;;
  port)
    [ $# -eq 0 ] && {
      echo "Usage: $(basename "$0") port <service> [private_port]" >&2
      exit 1
    }
    svc="$1"
    shift
    if [ $# -eq 0 ]; then
      cid=$(docker compose ps -q "$svc")
      [ -z "$cid" ] && {
        echo "Service '$svc' is not running" >&2
        exit 1
      }
      echo "==> Port mappings for service '$svc':"
      docker inspect --format='{{range $p, $conf := .NetworkSettings.Ports}}{{if $conf}}  {{$p}} -> {{range $conf}}{{.HostIp}}:{{.HostPort}} {{end}}{{else}}  {{$p}} (unmapped){{end}}{{end}}' "$cid"
    else
      exec docker compose port "$svc" "$@"
    fi
    ;;
  wait)
    exec docker compose wait "$@"
    ;;

  # =========================================================================
  # Configuration & Validation
  # =========================================================================
  config | compose-config)
    exec docker compose config "$@"
    ;;

  # =========================================================================
  # Help Menu
  # =========================================================================
  help | -h | --help)
    cat <<EOF
Usage: $(basename "$0") <command> [arguments]

Environment Commands:
  env --dev                 Switch app and Docker symlinks to Development configuration
  env --prod                Switch app and Docker symlinks to Production configuration

Lifecycle & Stack Commands:
  dev                       Switch to dev configuration and recreate the stack
  dev --watch | dev -w      Switch to dev configuration, recreate stack, and launch WATCH mode
  dev-watch                 Shortcut for 'dev --watch'
  prod                      Switch to production configuration and recreate the stack
  recreate [--watch | -w]   Force recreate containers and optionally attach WATCH mode
  restart [svc] [--watch]   Restart container(s) and optionally attach WATCH mode
  start | up [--watch]      Start stack and optionally attach WATCH mode
  api | web [--watch]       Start only API or Web service and optionally attach WATCH mode
  watch [service]           Start Docker Compose Watch mode explicitly
  stop / down               Stop containers
  down-volumes              Stop containers and delete persistent volumes (-v)
  down-all                  Stop containers, remove volumes, orphans, and local images

File Transfer Commands:
  cp-from <svc> <cpath> <hdest>   Copy a file/directory from a container to the local host
  cp-to <svc> <hsrc> <cdest>     Copy a file/directory from the local host into a container
  cp <src> <dest>                Native Docker Compose copy (e.g., cp api:/app/logs ./logs)

Monitoring & Logging Commands:
  status                    Show running container status (ps)
  logs [service]            Stream container logs live (logs -f)
  logs-tail                 Stream the last 100 lines of logs live
  stats                     Display live container resource usage statistics

Execution & Debugging Commands:
  exec <svc> <cmd>          Execute a command inside a running container shell
  interactive <svc>         Open an interactive shell inside a running container
  printenv <service>        Print environment variables loaded inside a container
  config                    Inspect the fully resolved Docker Compose compilation tree

EOF
    ;;
  *)
    echo "Unknown command: $CMD" >&2
    echo "Run '$(basename "$0") help' for usage instructions." >&2
    exit 1
    ;;
esac
