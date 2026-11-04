# Git Submodules Setup & Maintenance Guide

This playbook documents how to initialize, update, and manage Git submodules across this repository. To keep repository sizes lightweight and initialization times fast, submodules are configured with **shallow clones** (`--depth 1`) and **sparse checkouts** where appropriate.

---

## Active Project Submodules

| Module Path                  | Remote Repository                                  | Type                  | Description                                                     |
| :--------------------------- | :------------------------------------------------- | :-------------------- | :-------------------------------------------------------------- |
| `docker/.supabase`           | `https://github.com/supabase/supabase`             | Shallow & Sparse      | Official Supabase Docker environment (`docker/` directory only) |
| `packages/fota-client-esp32` | `https://github.com/NodeWave-EA/FOTA-Client-ESP32` | Shallow (`--depth 1`) | ESP32 Client SDK for FOTA updates                               |

---

## Setup Guides for Individual Submodules

### 1. Supabase Docker Submodule (`docker/.supabase`)

Pulls _only_ the `docker/` folder from the main Supabase repository without downloading unnecessary monorepo sources or historical commit blobs.

```bash
# 1. Clone with blobless filter, sparse checkout enabled, and depth 1
git clone --filter=blob:none --no-checkout --depth=1 --branch master --sparse https://github.com/supabase/supabase docker/.supabase

# 2. Configure sparse-checkout to restrict working tree to docker directory
cd docker/.supabase
git sparse-checkout set docker
git checkout master
cd ../..

# 3. Add to Git submodules
git submodule add --force https://github.com/supabase/supabase docker/.supabase

# 4. Standardize .git metadata storage into project .git/modules
git submodule absorbgitdirs

# 5. Commit submodule reference
git add .gitmodules docker/.supabase
git commit -m "infra: add sparse Supabase docker submodule"
```

---

### 2. FOTA ESP32 Client SDK (`packages/fota-client-esp32`)

Pulls only the latest commit of the ESP32 library without downloading full historical commits.

```bash
# 1. Add as a shallow submodule with depth 1
git submodule add --depth 1 https://github.com/NodeWave-EA/FOTA-Client-ESP32 packages/fota-client-esp32

# 2. Initialize and sync workspace content
git submodule update --init --recursive --depth 1

# 3. Commit submodule reference
git add .gitmodules packages/fota-client
git commit -m "packages: add FOTA-Client-ESP32 library submodule"
```

---

## Fresh Clone & CI Workflows

When cloning this project on a new machine, developer workspace, or CI pipeline, initialize all registered submodules with depth 1 using a single command:

```bash
git submodule update --init --recursive --depth 1
```

---

## Maintenance & Utility Commands

### Check Submodule Status

Verify current checked-out commits and submodule health:

```bash
git submodule status
```

### Update Submodules to Latest Remote Head

To update all submodules to their respective latest remote commits:

```bash
git submodule update --remote --merge --depth 1
```

### Remove a Submodule Cleanly

If you ever need to remove a submodule completely:

```bash
# Example for packages/fota-client-esp32
git submodule deinit -f packages/fota-client
rm -rf .git/modules/packages/fota-client
git rm -f packages/fota-client
```
