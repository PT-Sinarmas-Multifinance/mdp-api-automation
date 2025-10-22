import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import customConfig from './custom-config.json';

const VALID = ['development', 'staging', 'production'] as const;
type EnvName = (typeof VALID)[number];

function resolveActiveEnv(): EnvName {
  const fromConfig = String(customConfig?.ENV_ACTIVE ?? '').toLowerCase();
  const fromProcess = String(process.env.ENV_ACTIVE ?? process.env.NODE_ENV ?? '').toLowerCase();

  const pick = (VALID as readonly string[]).includes(fromProcess)
    ? (fromProcess as EnvName)
    : (VALID as readonly string[]).includes(fromConfig)
      ? (fromConfig as EnvName)
      : null;

  if (!pick) {
    throw new Error(
      `ENV_ACTIVE invalid. Use one of: ${VALID.join(', ')} (via custom-config.json or ENV vars).`
    );
  }
  return pick;
}

export function loadDotenv() {
  const active = resolveActiveEnv();
  const file = path.resolve(process.cwd(), `.env.${active}`);
  if (!fs.existsSync(file)) {
    throw new Error(`.env file not found: ${file}`);
  }
  dotenv.config({ path: file, override: true });
  return { active, file };
}
