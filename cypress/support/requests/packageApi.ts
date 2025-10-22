import 'cypress-plugin-api';

export const packageApi = {
  getPackagesByProductId(token: string, productId: number) {
    return cy.api({
      method: 'GET',
      url: `${Cypress.env('BASE_URL')}/api/v1/program/list-packages?product_id=${productId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
  },
};
