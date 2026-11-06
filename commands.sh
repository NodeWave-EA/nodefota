#!/usr/bin/env bash

# Format and check run.sh individually
shfmt -w -i 2 -ci run.sh && shellcheck run.sh

# Format all .sh files in the project
command find . -name "*.sh" -exec shfmt -w -i 2 -ci {} +

# Run shellcheck on all .sh files in the project
command find . -name "*.sh" -exec shellcheck {} +

# OR

# Better alternative using fd (if installed)
# Format all .sh files using fd
fd -e sh -x shfmt -w -i 2 -ci

# Run shellcheck on all .sh files using fd
fd -e sh -x shellcheck
