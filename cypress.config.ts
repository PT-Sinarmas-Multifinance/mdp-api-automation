import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';
import { loadDotenv } from './env.config';
import { Client, QueryResultRow } from 'pg';

const { active, file } = loadDotenv();
console.log(`✅ Loaded environment: ${active} (${file})`);

type DbCred = {
  user: string;
  password: string;
  host: string;
  database: string;
  port?: number;
};

// ✅ Generic version — fleksibel dan type-safe
const connectPostgreSQL = async <T extends QueryResultRow = any>({
  query,
  db,
  params = [],
}: {
  query: string;
  db: DbCred;
  params?: any[];
}): Promise<T[]> => {
  try {
    const client = new Client({
      user: db.user,
      password: db.password,
      host: db.host,
      database: db.database,
      port: db.port ?? 5432,
    });

    await client.connect();
    const res = await client.query<T>(query, params);
    await client.end();
    return res.rows;
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error);
    throw error;
  }
};

const getDBCredential = ({ dbType }: { dbType: string }) => {
  return {
    user: process.env[`DB_USERNAME_${dbType}`] || '',
    password: process.env[`DB_PASSWORD_${dbType}`] || '',
    host: process.env[`DB_HOST_${dbType}`] || '',
    database: process.env[`DB_NAME_${dbType}`] || '',
    port: Number(process.env[`DB_PORT_${dbType}`]) || 5432,
  };
};

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    watchForFileChanges: false,
    retries: { runMode: 0, openMode: 0 },
    setupNodeEvents(on, config) {
      on('task', {
        connectDBPostgre: connectPostgreSQL,
        getDBCredential,
      });

      allureCypress(on, config, {
        resultsDir: 'allure-results',
      });
      return config;
    },
  },
  env: {
    ...(process.env as Record<string, any>),
  },
});
