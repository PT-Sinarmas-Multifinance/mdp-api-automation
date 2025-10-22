import { assert } from 'superstruct';
// Update the import path if the file exists elsewhere, for example:
import { branchApi } from '@requests/branch';
// Or use the correct relative path to where branchApi is exported
import { getBranchesResponseSchema } from '@schemas/branch.schema';
import { users } from '@data/users';

describe('GET branch should be success', () => {
  before(() => {
    const { email, password } = users.admin;
    cy.authToken(email, password).as('token');
  });

  it('should return list of branches', () => {
    cy.get<string>('@token').then((token) => {
      branchApi.getBranches(token).then((res) => {
        expect(res.status).to.eq(200);
        assert(res.body, getBranchesResponseSchema);
        // cy.allure().feature('Branch').story('List Branches');
      });
    });
  });
});
