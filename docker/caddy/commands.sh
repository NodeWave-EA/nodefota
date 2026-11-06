#!/usr/bin/env bash

# Get the caddy root certificate
docker cp fota-caddy:/data/caddy/pki/authorities/local/root.crt ./caddy-root-ca.crt

# Debian
sudo cp ./caddy-root-ca.crt /usr/local/share/ca-certificates/caddy-root-ca.crt
sudo update-ca-certificates

# Arch
sudo trust anchor --store ./caddy-root-ca.crt

# BETTER
# using root run.sh wrapper script
sh run.sh cp-from caddy /data/caddy/pki/authorities/local/root.crt ./caddy-root-ca.crt
# or
sh run.sh cp caddy:/data/caddy/pki/authorities/local/root.crt docker/caddy/caddy-root-ca.crt

sudo trust anchor --store ./docker/caddy/caddy-root-ca.crt

# REVERT
# Debian
sudo rm /usr/local/share/ca-certificates/caddy-root-ca.crt
sudo update-ca-certificates --fresh

# Arch
sudo trust anchor --remove ./docker/caddy/caddy-root-ca.crt
sudo update-ca-trust
trust list | grep -i caddy
