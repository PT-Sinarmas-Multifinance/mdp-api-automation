// POST /api/v1/auth/login
export function login(email: string, password: string) {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('BASE_URL')}/api/v1/auth/login`,
    body: { email, password },
    failOnStatusCode: false,
  });
}
