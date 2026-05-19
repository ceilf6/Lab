#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANIFEST="$ROOT_DIR/docs/openviking/ingest-manifest.tsv"
WAIT_FLAG=()
DRY_RUN=0

usage() {
  cat <<'USAGE'
Usage: scripts/openviking-ingest.sh [--manifest PATH] [--wait] [--dry-run]

Ingest resources listed in docs/openviking/ingest-manifest.tsv into OpenViking.

Environment:
  OPENVIKING_BIN              Optional CLI binary. Defaults to openviking, then ov.
  OPENVIKING_CLI_CONFIG_FILE  Optional CLI config path for server mode.
USAGE
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --manifest)
      MANIFEST="$2"
      shift 2
      ;;
    --wait)
      WAIT_FLAG=(--wait)
      shift
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ ! -f "$MANIFEST" ]]; then
  echo "Manifest not found: $MANIFEST" >&2
  exit 1
fi

resolve_openviking_bin() {
  if [[ -n "${OPENVIKING_BIN:-}" ]]; then
    printf '%s\n' "$OPENVIKING_BIN"
    return
  fi
  if command -v openviking >/dev/null 2>&1; then
    printf '%s\n' "openviking"
    return
  fi
  if command -v ov >/dev/null 2>&1; then
    printf '%s\n' "ov"
    return
  fi
  echo "OpenViking CLI not found. Install openviking or set OPENVIKING_BIN." >&2
  exit 1
}

OPENVIKING_CMD="$(resolve_openviking_bin)"

declare -a EXCLUDES=()

is_excluded() {
  local candidate="$1"
  local normalized="${candidate#./}"
  local exclude
  for exclude in "${EXCLUDES[@]}"; do
    exclude="${exclude#./}"
    exclude="${exclude%/}"
    if [[ "$normalized" == "$exclude" || "$normalized" == "$exclude/"* ]]; then
      return 0
    fi
  done
  return 1
}

add_resource() {
  local path="$1"
  local target="$2"
  local reason="$3"

  if [[ ! -e "$ROOT_DIR/$path" ]]; then
    echo "skip missing: $path" >&2
    return
  fi
  if is_excluded "$path"; then
    echo "skip excluded: $path" >&2
    return
  fi

  local resolved_target="$target"
  resolved_target="${resolved_target//\{path\}/$path}"
  resolved_target="${resolved_target//\{path_no_ext\}/${path%.*}}"

  local cmd=("$OPENVIKING_CMD" add-resource "$ROOT_DIR/$path")
  if [[ "$resolved_target" != "-" ]]; then
    cmd+=(--to "$resolved_target")
  fi
  if [[ -n "$reason" ]]; then
    cmd+=(--reason "$reason")
  fi
  if ((${#WAIT_FLAG[@]})); then
    cmd+=("${WAIT_FLAG[@]}")
  fi

  if [[ "$DRY_RUN" -eq 1 ]]; then
    printf 'DRY RUN:'
    printf ' %q' "${cmd[@]}"
    printf '\n'
    return
  fi

  printf 'ingest: %s\n' "$path"
  "${cmd[@]}"
}

expand_manifest_glob() {
  local pattern="$1"
  if [[ "$pattern" == *"/**/"* ]]; then
    local base="${pattern%%/**}"
    local suffix="${pattern#*/**/}"
    if [[ -d "$ROOT_DIR/$base" ]]; then
      find "$ROOT_DIR/$base" -path "*/$suffix" -type f | sort
    fi
    return
  fi

  compgen -G "$ROOT_DIR/$pattern" | sort
}

while IFS=$'\t' read -r kind path target reason _rest; do
  [[ -z "${kind:-}" || "$kind" == \#* ]] && continue
  if [[ "$kind" == "exclude" ]]; then
    EXCLUDES+=("$path")
  fi
done < "$MANIFEST"

while IFS=$'\t' read -r kind path target reason _rest; do
  [[ -z "${kind:-}" || "$kind" == \#* ]] && continue

  case "$kind" in
    file|dir)
      add_resource "$path" "$target" "${reason:-}"
      ;;
    glob)
      matches=()
      while IFS= read -r match; do
        matches+=("$match")
      done < <(expand_manifest_glob "$path")
      if [[ "${#matches[@]}" -eq 0 ]]; then
        echo "skip empty glob: $path" >&2
        continue
      fi
      for match in "${matches[@]}"; do
        rel="${match#$ROOT_DIR/}"
        add_resource "$rel" "$target" "${reason:-}"
      done
      ;;
    exclude)
      ;;
    *)
      echo "skip unknown manifest kind '$kind' for path '$path'" >&2
      ;;
  esac
done < "$MANIFEST"
