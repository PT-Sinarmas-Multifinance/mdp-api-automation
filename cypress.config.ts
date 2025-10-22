import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';
import { loadDotenv } from './env.config';
import { Client, QueryResultRow } from 'pg';

// 🔹 Load environment dari .env.(active)
const { active, file } = loadDotenv();
console.log(`✅ Loaded environment: ${active} (${file})`);

// 🔹 Type untuk kredensial database
type DbCred = {
  user: string;
  password: string;
  host: string;
  database: string;
  port?: number;
};

// 🔹 Fungsi generik untuk query PostgreSQL
const connectPostgreSQL = async <T extends QueryResultRow = any>({
  query,
  db,
  params = [],
}: {
  query: string;
  db: DbCred;
  params?: any[];
}): Promise<T[]> => {
  const client = new Client({
    user: db.user,
    password: db.password,
    host: db.host,
    database: db.database,
    port: db.port ?? 5432,
  });

  try {
    await client.connect();
    const res = await client.query<T>(query, params);
    return res.rows;
  } catch (error) {
    console.error('❌ PostgreSQL Connection Error:', error);
    throw error;
  } finally {
    await client.end();
  }
};

// 🔹 Ambil kredensial DB dari environment
const getDBCredential = ({ dbType }: { dbType: string }) => {
  const db: DbCred = {
    user: process.env[`DB_USERNAME_${dbType}`] || '',
    password: process.env[`DB_PASSWORD_${dbType}`] || '',
    host: process.env[`DB_HOST_${dbType}`] || '',
    database: process.env[`DB_NAME_${dbType}`] || '',
    port: Number(process.env[`DB_PORT_${dbType}`]) || 5432,
  };

  if (!db.user || !db.host || !db.database) {
    console.warn(`⚠️ Missing DB credentials for ${dbType}. Check your .env.${active} file.`);
  }

  return db;
};

// 🚀 Export konfigurasi utama Cypress
export default defineConfig({
  // ❌ Jangan tambahkan "reporter" di sini — Allure v3 pakai plugin, bukan reporter path
  e2e: {
    experimentalRunAllSpecs: true,
    watchForFileChanges: false,
    retries: { runMode: 0, openMode: 0 },

    setupNodeEvents(on, config) {
      // ✅ Register custom tasks
      on('task', {
        connectDBPostgre: connectPostgreSQL,
        getDBCredential,
      });

      // ✅ Integrasi Allure — hasilnya akan di folder "allure-results"
      allureCypress(on, config, {
        resultsDir: 'allure-results',
      });

      return config;
    },
  },

  // 🔹 Inject semua variable environment
  env: {
    ...(process.env as Record<string, any>),
  },
});
