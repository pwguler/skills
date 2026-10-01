#!/usr/bin/env bash
# Prints the tree id that keys verify's evidence record, from anywhere in the repository.
# It hashes every tracked and untracked file that is not ignored, through a throwaway copy of the index,
# so the real index stays untouched and deleted files count. Markdown stays out unless --with-markdown is
# given: an edit to Markdown alone keeps the id, and a commit that carries a Markdown edit changes it.
# With no repository or no index it prints nothing and exits nonzero: then there is no record.
set -eu
index=$(mktemp)
trap 'rm -f "$index"' EXIT
cp "$(git rev-parse --git-path index)" "$index"
if [ "${1:-}" = --with-markdown ]; then
  GIT_INDEX_FILE="$index" git add -A -- ':/'
else
  GIT_INDEX_FILE="$index" git add -A -- ':/' ':(top,exclude,glob)**/*.md'
fi
GIT_INDEX_FILE="$index" git write-tree
