// cypress/api/branchApi.ts
import 'cypress-plugin-api';

export const branchApi = {
  getBranches(token: string) {
    return cy.api({
      method: 'GET',
      url: `${Cypress.env('BASE_URL')}/api/v1/branches`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
  },

  getBranchById(token: string, id: number) {
    return cy.api({
      method: 'GET',
      url: `${Cypress.env('BASE_URL')}/api/v1/branches/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
  },

  addBranch(token: string, body: any) {
    return cy.api({
      method: 'POST',
      url: `${Cypress.env('BASE_URL')}/api/v1/branches`,
      headers: { Authorization: `Bearer ${token}` },
      body,
      failOnStatusCode: false,
    });
  },

  updateBranchById(token: string, id: number, body: any) {
    return cy.api({
      method: 'PUT',
      url: `${Cypress.env('BASE_URL')}/api/v1/branches/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      body,
      failOnStatusCode: false,
    });
  },

  deleteBranchById(token: string, id: number) {
    return cy.api({
      method: 'DELETE',
      url: `${Cypress.env('BASE_URL')}/api/v1/branches/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false,
    });
  },
};
