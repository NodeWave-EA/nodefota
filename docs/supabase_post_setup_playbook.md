# Supabase Post-Setup Playbook

This document details the configuration required after pulling the sparse Supabase Docker submodule. It covers establishing directory symlinks, configuring environment files, generating security keys, and using key rotation utilities.

---

## 1. Directory Symlinking

To simplify workspace navigation and maintain clean paths, set up a symlink mapping `docker/supabase` to the submodule's `docker/.supabase/docker` directory.

### Create Symlink

Run from the project root:

```bash
# Ensure target path does not conflict with existing folders
ln -sfn .supabase/docker docker/supabase
```

### Verification

Check the link in the terminal:

```bash
ls -la docker/supabase
# Output should point to: docker/supabase -> .supabase/docker
```

---

## 2. Initial Key Generation & Setup

Supabase self-hosted deployment requires secure JWT secrets, API keys, and database passwords before spinning up containers.

### Step 2.1: Initialize Environment Configuration

Navigate into the symlinked folder:

```bash
cd docker/supabase
```

Copy `.env.example` to create your active `.env` file:

```bash
cp .env.example .env
```

---

### Step 2.2: Generate Supabase Security Keys (`utils/generate-keys.sh`)

Supabase provides `utils/generate-keys.sh` to generate the required JWT secrets, `ANON_KEY`, and `SERVICE_ROLE_KEY`.

1. Make the utility script executable:

```bash
chmod +x utils/generate-keys.sh
```

2. Execute the generator:

```bash
./utils/generate-keys.sh
```

> **Note:** Running `generate-keys.sh` updates your `.env` file with fresh `JWT_SECRET`, `ANON_KEY`, and `SERVICE_ROLE_KEY` strings.

---

### Step 2.3: Add New Authentication & Encryption Keys (`utils/add-new-auth-keys.sh`)

For updated Supabase stack features (such as GoTrue authentication secret management and API service key rotation), run `utils/add-new-auth-keys.sh`:

1. Make the script executable:

```bash
chmod +x utils/add-new-auth-keys.sh
```

2. Execute the script:

```bash
./utils/add-new-auth-keys.sh
```

This utility ensures missing JWT parameters, session secrets, and secondary service signatures are appended to your `.env` file.

---

## 3. Utility Scripts Overview

| Script                   | Location                                       | Purpose                                                                                 |
| :----------------------- | :--------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `generate-keys.sh`       | `docker/supabase/utils/generate-keys.sh`       | Generates initial JWT secrets, `ANON_KEY`, and `SERVICE_ROLE_KEY`.                      |
| `add-new-auth-keys.sh`   | `docker/supabase/utils/add-new-auth-keys.sh`   | Appends authentication parameters and key pairs required by updated Supabase images.    |
| `db-passwd.sh`           | `docker/supabase/utils/db-passwd.sh`           | Helper script to change default PostgreSQL database passwords securely.                 |
| `rotate-new-api-keys.sh` | `docker/supabase/utils/rotate-new-api-keys.sh` | Rotates existing API secrets and generates replacement keys without service disruption. |

---

## 4. Environment Execution Summary

Once symlinks, secrets, and environment configurations are in place, start the Supabase containers:

```bash
cd docker/supabase
sh run.sh pull
sh run.sh start
```
