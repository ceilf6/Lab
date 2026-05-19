#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_DIR="$ROOT_DIR/.openviking-local"
DATA_DIR="$ROOT_DIR/.openviking-data"
OV_CONF="$CONFIG_DIR/ov.conf"
OVCLI_CONF="$CONFIG_DIR/ovcli.conf"

MODEL_API_BASE="${OPENVIKING_MODEL_API_BASE:-}"
MODEL_API_KEY="${OPENVIKING_MODEL_API_KEY:-}"
EMBEDDING_API_BASE="${OPENVIKING_EMBEDDING_API_BASE:-$MODEL_API_BASE}"
EMBEDDING_API_KEY="${OPENVIKING_EMBEDDING_API_KEY:-$MODEL_API_KEY}"
EMBEDDING_PROVIDER="${OPENVIKING_EMBEDDING_PROVIDER:-openai}"
EMBEDDING_MODEL="${OPENVIKING_EMBEDDING_MODEL:-}"
EMBEDDING_DIMENSION="${OPENVIKING_EMBEDDING_DIMENSION:-}"
VLM_PROVIDER="${OPENVIKING_VLM_PROVIDER:-openai}"
VLM_API_BASE="${OPENVIKING_VLM_API_BASE:-$MODEL_API_BASE}"
VLM_API_KEY="${OPENVIKING_VLM_API_KEY:-$MODEL_API_KEY}"
VLM_MODEL="${OPENVIKING_VLM_MODEL:-gpt-5.4-mini}"
OPENVIKING_SERVER_URL="${OPENVIKING_SERVER_URL:-http://localhost:1933}"
OPENVIKING_API_KEY_VALUE="${OPENVIKING_API_KEY:-}"

require() {
  local name="$1"
  local value="$2"
  if [[ -z "$value" ]]; then
    echo "Missing required environment variable: $name" >&2
    exit 2
  fi
}

require OPENVIKING_EMBEDDING_API_BASE "$EMBEDDING_API_BASE"
require OPENVIKING_EMBEDDING_MODEL "$EMBEDDING_MODEL"
require OPENVIKING_EMBEDDING_DIMENSION "$EMBEDDING_DIMENSION"
require OPENVIKING_VLM_API_BASE "$VLM_API_BASE"
require OPENVIKING_VLM_API_KEY "$VLM_API_KEY"

mkdir -p "$CONFIG_DIR" "$DATA_DIR"
chmod 700 "$CONFIG_DIR" "$DATA_DIR"

node - "$OV_CONF" "$OVCLI_CONF" "$DATA_DIR" "$EMBEDDING_API_BASE" "$EMBEDDING_API_KEY" "$EMBEDDING_PROVIDER" "$EMBEDDING_MODEL" "$EMBEDDING_DIMENSION" "$VLM_API_BASE" "$VLM_API_KEY" "$VLM_PROVIDER" "$VLM_MODEL" "$OPENVIKING_SERVER_URL" "$OPENVIKING_API_KEY_VALUE" <<'NODE'
const fs = require("fs");
const [
  ovConfPath,
  ovcliConfPath,
  dataDir,
  embeddingApiBase,
  embeddingApiKey,
  embeddingProvider,
  embeddingModel,
  embeddingDimension,
  vlmApiBase,
  vlmApiKey,
  vlmProvider,
  vlmModel,
  serverUrl,
  openVikingApiKey,
] = process.argv.slice(2);

const dimension = Number(embeddingDimension);
if (!Number.isInteger(dimension) || dimension <= 0) {
  throw new Error("OPENVIKING_EMBEDDING_DIMENSION must be a positive integer");
}

const ovConf = {
  storage: {
    workspace: dataDir,
    vectordb: {
      name: "context",
      backend: "local",
    },
    agfs: {
      backend: "local",
    },
  },
  embedding: {
    dense: {
      api_base: embeddingApiBase,
      api_key: embeddingApiKey,
      provider: embeddingProvider,
      dimension,
      model: embeddingModel,
    },
  },
  vlm: {
    api_base: vlmApiBase,
    api_key: vlmApiKey,
    provider: vlmProvider,
    model: vlmModel,
  },
};

const ovcliConf = {
  url: serverUrl,
  api_key: openVikingApiKey || "replace-with-openviking-server-api-key",
};

fs.writeFileSync(ovConfPath, `${JSON.stringify(ovConf, null, 2)}\n`, { mode: 0o600 });
fs.writeFileSync(ovcliConfPath, `${JSON.stringify(ovcliConf, null, 2)}\n`, { mode: 0o600 });
NODE

echo "Wrote $OV_CONF"
echo "Wrote $OVCLI_CONF"
