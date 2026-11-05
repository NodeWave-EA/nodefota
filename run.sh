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

CMD="${1:-help}"
[ "$#" -gt 0 ] && shift

case "$CMD" in
  # =========================================================================
  # Environment Management
  # =========================================================================
  env)
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
    ;;

  dev)
    "$0" env --dev
    exec "$0" recreate
    ;;
  prod)
    "$0" env --prod
    exec "$0" recreate
    ;;

  # =========================================================================
  # Lifecycle & Stack Commands (Up / Down / Recreate)
  # =========================================================================
  start | up)
    ensure_networks
    exec docker compose up -d --wait --build "$@"
    ;;
  up-no-build)
    ensure_networks
    exec docker compose up -d --wait "$@"
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
    exec docker compose restart "$@"
    ;;
  recreate)
    ensure_networks
    exec docker compose up -d --wait --build --force-recreate "$@"
    ;;
  api | web | mqtt | mailpit | caddy | supabase)
    ensure_networks
    exec docker compose up -d --wait --build "$CMD" "$@"
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
  # Execution & Interactive Debugging
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
      exit 1
    }
    exec docker compose cp "$@"
    ;;
  port)
    [ $# -eq 0 ] && {
      echo "Usage: $(basename "$0") port <service> [private_port]" >&2
      exit 1
    }
    svc="$1"
    shift
    if [ $# -eq 0 ]; then
      # Automatically find exposed ports for the service using docker compose config & inspect
      cid=$(docker compose ps -q "$svc")
      [ -z "$cid" ] && {
        echo "Service '$svc' is not running" >&2
        exit 1
      }
      echo "==> Port mappings for service '$svc':"
      docker inspect --format='{{range $p, $conf := .NetworkSettings.Ports}}{{if $conf}}  {{$p}} -> {{range $conf}}{{.HostIp}}:{{.HostPort}} {{end}}{{else}}  {{$p}} (unmapped){{end}}{{end}}' "$cid"
    else
      # Pass through to native docker compose port if specific port provided
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
  dev                       Switch to development configuration and recreate the stack
  prod                      Switch to production configuration and recreate the stack
  start                     Start stack with build and wait for healthchecks (up -d --wait --build)
  up-no-build               Start stack without rebuilding images (--wait)
  stop                      Stop containers (down)
  down-volumes              Stop containers and delete persistent database/cache volumes (-v)
  down-all                  Stop containers, remove volumes, orphans, and local images
  restart [service]         Restart entire stack or a specific service
  recreate                  Force recreate and restart all containers (--force-recreate)
  api                       Build and start only the API service
  web                       Build and start only the web service
  mqtt                      Build and start only the MQTT broker
  mailpit                   Build and start only Mailpit
  caddy                     Build and start only the Caddy reverse proxy
  supabase                  Build and start only the Supabase stack (Postgres, Kong, Realtime, Storage, etc.)
  create                    Create containers without starting them
  start-containers          Start existing stopped containers
  stop-containers           Stop running containers without removing them
  pause / unpause           Pause or resume running containers
  kill                      Force stop containers immediately

Build & Image Commands:
  build [service]           Build or rebuild container services
  build-no-cache            Build services from scratch without using cache
  pull                      Pull updated base container images
  push                      Push service images to a registry
  images                    List images used by stack services

Monitoring & Logging Commands:
  status                    Show running container status (ps)
  logs [service]            Stream container logs live (logs -f)
  logs-tail                 Stream the last 100 lines of logs live
  logs-timestamps           Stream logs live with absolute timestamps
  top                       Display running processes of stack services
  stats                     Display live container resource usage statistics
  events                    Stream container lifecycle events in real time

Execution & Debugging Commands:
  exec <svc> <cmd>          Execute a command inside a running container shell
  run <svc> <cmd>           Run a one-off command in a temporary container (--rm)
  inspect <service>         Inspect container configuration directly via Docker
  printenv <service>        Print environment variables loaded inside a container
  cp <src> <dest>           Copy files/folders between local machine and containers
  port <svc> <port>         Print the public port mapped to a container port
  wait                      Block until containers stop

Configuration Commands:
  config                    Inspect the fully resolved Docker Compose compilation tree

EOF
    ;;
  *)
    echo "Unknown command: $CMD" >&2
    echo "Run '$(basename "$0") help' for usage instructions." >&2
    exit 1
    ;;
esac
