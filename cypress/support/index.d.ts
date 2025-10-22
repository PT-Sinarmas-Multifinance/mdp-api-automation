/// <reference types="cypress" />

declare namespace Cypress {
  interface DbCred {
    user: string;
    password: string;
    host: string;
    database: string;
    port?: number;
  }

  interface Chainable {
    authToken(email?: string, password?: string): Chainable<string>;
    dbCred(dbType: string): Chainable<DbCred>;
    dbQuery<Row = any>(
      sql: string,
      dbType: string,
      params?: any[],
      credOverride?: DbCred
    ): Chainable<Row[]>;
  }
}
