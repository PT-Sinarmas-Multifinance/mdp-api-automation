import { assert } from 'superstruct';
import { programApi } from '@requests/programApi';
import { packageApi } from '@requests/packageApi';
import { buildBaseProgramData, products, installmentTypes, drawdownTypes } from '@data/programData';
import { addProgramResponseSchema } from '@schemas/program.schema';
import { users } from '@data/users';
import { cleanupPrograms } from '../../../helper/dbHelper';

describe('POST /api/v1/programs - Dynamic Package & Variations', () => {
  let token: string;

  before(() => {
    const { email, password, name } = users.admin;

    cy.authToken(email, password).then((tkn) => {
      token = tkn;

      cleanupPrograms(name);
    });
  });

  it('should create a program using first product and first package', () => {
    const selectedProduct = products[0];

    packageApi.getPackagesByProductId(token, selectedProduct.id).then((pkgRes) => {
      const firstPackage = pkgRes.body.contents[0];
      const packageSchemaId = firstPackage.id;

      const body = buildBaseProgramData(selectedProduct.id, packageSchemaId);
      programApi.addProgram(token, body).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('created successfully');
        assert(res.body, addProgramResponseSchema);
      });
    });
  });

  // Test untuk setiap kombinasi product dan installmentType
  products.forEach((product) => {
    installmentTypes.forEach((installment) => {
      it(`should create program for product "${product.value}" with installment "${installment.value}"`, () => {
        packageApi.getPackagesByProductId(token, product.id).then((pkgRes) => {
          const packageSchemaId = pkgRes.body.contents[0].id;

          const body = buildBaseProgramData(product.id, packageSchemaId, {
            program_name: `${product.value} - ${installment.value} - ${Date.now()}`,
            installment_type_ids: [installment.id],
          });

          programApi.addProgram(token, body).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq('created successfully');
            assert(res.body, addProgramResponseSchema);
          });
        });
      });
    });
  });

  // Test untuk setiap drawdownType agar tetap sinkron
  drawdownTypes.forEach((drawdown) => {
    it(`should create program using drawdown type "${drawdown.value}"`, () => {
      const selectedProduct = products[0];

      packageApi.getPackagesByProductId(token, selectedProduct.id).then((pkgRes) => {
        expect(pkgRes.status).to.eq(200);
        expect(pkgRes.body.contents).to.be.an('array').and.not.empty;

        const packageSchemaId = pkgRes.body.contents[0].id;
        const body = buildBaseProgramData(selectedProduct.id, packageSchemaId, {
          drawdown_type_id: drawdown.id,
          product_description: `${drawdown.value} || ${selectedProduct.value}`,
          program_name: `Program ${drawdown.value} || ${selectedProduct.value} - ${Date.now()}`,
        });

        programApi.addProgram(token, body).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('created successfully');
          assert(res.body, addProgramResponseSchema);
        });
      });
    });
  });
});
