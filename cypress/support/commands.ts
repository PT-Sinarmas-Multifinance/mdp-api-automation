/// <reference types="cypress" />
// ***********************************************
// ✅ Custom Commands for Cypress
// ***********************************************

let tokenCache: Record<string, string> = {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * 🔐 Mendapatkan token auth (default: ADMIN_EMAIL & ADMIN_PASSWORD dari .env)
       */
      authToken(email?: string, password?: string): Chainable<string>;

      /**
       * 🗄️ Mengambil credential DB dari task (env)
       * @param dbType contoh: 'MARKETING_SERVICE'
       */
      dbCred(dbType: string): Chainable<DbCred>;

      /**
       * 🧩 Menjalankan query PostgreSQL langsung dari Cypress
       * @param sql SQL string (gunakan ? untuk parameterized query)
       * @param dbType contoh: 'MARKETING_SERVICE'
       * @param params optional query params
       * @param credOverride optional custom credential object
       */
      dbQuery<Row = any>(
        sql: string,
        dbType: string,
        params?: any[],
        credOverride?: DbCred
      ): Chainable<Row[]>;
    }
  }
}

// 🔐 Ambil token auth & cache per email
Cypress.Commands.add('authToken', (email?: string, password?: string) => {
  const em = email ?? Cypress.env('ADMIN_EMAIL');
  const pw = password ?? Cypress.env('ADMIN_PASSWORD');

  if (tokenCache[em]) return cy.wrap(tokenCache[em]);

  const base = Cypress.env('BASE_URL');

  return cy
    .request('POST', `${base}/api/v1/auth/login`, { email: em, password: pw })
    .then((res) => {
      expect(res.status).to.eq(200);
      const token = res.body?.contents?.access_token || res.body?.access_token;
      tokenCache[em] = token;
      return token;
    });
});

// 🗄️ Ambil credential DB berdasarkan type
Cypress.Commands.add('dbCred', (dbType: string) => {
  return cy.task('getDBCredential', { dbType }).then((cred) => cred as Cypress.DbCred);
});

// 🧩 Query PostgreSQL langsung
Cypress.Commands.add(
  'dbQuery',
  <Row = any>(sql: string, dbType: string, params: any[] = [], credOverride?: Cypress.DbCred) => {
    if (credOverride) {
      // Jika user memberikan credential sendiri
      return cy.task('connectDBPostgre', {
        query: sql,
        db: credOverride,
        params,
      }) as Cypress.Chainable<Row[]>;
    }

    // Jika tidak, ambil credential dari env/task
    return cy.dbCred(dbType).then((db) => {
      return cy.task('connectDBPostgre', { query: sql, db, params }) as Cypress.Chainable<Row[]>;
    });
  }
);

// ensure this file is treated as a module
export {};
