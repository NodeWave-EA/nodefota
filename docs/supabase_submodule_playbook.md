# Supabase Docker Setup Playbook

This playbook documents the process for adding the official [Supabase Repository](https://github.com/supabase/supabase) as a submodule isolated inside `docker/.supabase`, using sparse checkout and blobless filtering to fetch **only** the `docker` directory.

---

## Goal

Pull the official Supabase Docker environment configuration without cloning the full Supabase monorepo, keeping workspace disk usage minimal and build setups fast.

---

## Steps for Initializing the Submodule

### 1. Perform a Sparse & Blobless Clone

Execute a shallow, partial clone with sparse support enabled into the target destination:

```bash
git clone --filter=blob:none --no-checkout --depth=1 --branch master --sparse https://github.com/supabase/supabase docker/.supabase
```

### 2. Configure Sparse-Checkout Rules

Limit the working tree exclusively to the `docker` directory and checkout the branch:

```bash
cd docker/.supabase
git sparse-checkout set docker
git checkout master
cd ../..
```

### 3. Register as a Git Submodule

Register the existing directory as a submodule in the parent repository:

```bash
git submodule add --force https://github.com/supabase/supabase docker/.supabase
```

### 4. Absorb Git Metadata

Move internal git metadata into the parent repository's `.git/modules` tree:

```bash
git submodule absorbgitdirs
```

### 5. Commit the Submodule Configuration

Track `.gitmodules` and the submodule reference commit:

```bash
git add .gitmodules docker/.supabase
git commit -m "chore(infra): add sparse Supabase docker submodule"
```

---

## Fresh Clone / CI Workspace Setup

When cloning this monorepo on a new machine or in CI environments, pull the sparse submodule using:

```bash
git submodule update --init --recursive --depth 1
```
