import 'cypress-plugin-api';

export const programApi = {
  addProgram(token: string, body: any) {
    return cy.api({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/api/v1/program`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
      failOnStatusCode: false,
    });
  },
};
