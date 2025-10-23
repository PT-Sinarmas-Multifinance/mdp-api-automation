describe('PostgreSQL Connection', () => {
  let dbCred: Cypress.DbCred; // cache di sini

  before(() => {
    cy.dbCred('MARKETING_SERVICE').then(cred => {
      dbCred = cred;
      cy.log(`DB Credential loaded for ${cred.database}`);
    });
  });

  it('Should fetch current DB time', () => {
    cy.dbQuery<{ current_time: string }>(
      'SELECT NOW() AS current_time',
      'MARKETING_SERVICE',
      [],
      dbCred
    ).then(rows => {
      expect(rows).to.have.length(1);
      cy.log(`DB Time: ${rows[0].current_time}`);
    });
  });

  it('Should list 5 public tables', () => {
    const query = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name ASC 
      LIMIT 5
    `;

    cy.dbQuery<{ table_name: string }>(query, 'MARKETING_SERVICE', [], dbCred).then(rows => {
      expect(rows.length).to.be.greaterThan(0);
      cy.log('Tables:');
      rows.forEach(r => cy.log(`- ${r.table_name}`));
    });
  });
});
