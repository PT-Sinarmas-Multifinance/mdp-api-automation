/// <reference types="cypress" />

/**
 * Helper untuk menghapus semua data program yang dibuat oleh user tertentu
 *
 * @param createdBy - Nama user yang membuat data (contoh: users.admin.name)
 * @param dbType - Nama database dari env, default: 'MARKETING_SERVICE'
 */
export function cleanupPrograms(createdBy: string, dbType = 'MARKETING_SERVICE') {
  const queries = [
    `DELETE FROM application_source_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM category_debitur_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM transaction_type_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM vehicle_sub_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM vehicle_manufacturing_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM asset_brand_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM region_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM branch_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM source_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM channel_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM dealer_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM tiering_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM installment_type_programs WHERE created_by = '${createdBy}';`,
    `DELETE FROM programs WHERE created_by = '${createdBy}';`,
  ];

  cy.log(`⚡ Fast cleanup package data for user: ${createdBy}`);

  // Eksekusi semua query sekaligus (tanpa urutan)
  cy.wrap(null).then(() => {
    const tasks = queries.map(query => cy.dbQuery(query, dbType));
    return Cypress.Promise.all(tasks).then(() => {
      cy.log('✅ All package tables cleaned (parallel)');
    });
  });
}

/**
 * Helper untuk menghapus semua data package dan sub-package
 *
 * @param createdBy - Nama user pembuat data (contoh: users.admin.name)
 * @param dbType - Nama database dari env, default: 'MARKETING_SERVICE'
 */
export function cleanupPackages(createdBy: string, dbType = 'MARKETING_SERVICE') {
  const queries = [
    `DELETE FROM sub_packages WHERE created_by = '${createdBy}';`,
    `DELETE FROM flat_rates WHERE created_by = '${createdBy}';`,
    `DELETE FROM refund_rates WHERE created_by = '${createdBy}';`,
    `DELETE FROM refund_provisions WHERE created_by = '${createdBy}';`,
    `DELETE FROM admin_fees WHERE created_by = '${createdBy}';`,
    `DELETE FROM refund_insurances WHERE created_by = '${createdBy}';`,
    `DELETE FROM agent_fees WHERE created_by = '${createdBy}';`,
    `DELETE FROM packages WHERE created_by = '${createdBy}';`,
  ];

  cy.log(`⚡ Fast cleanup package data for user: ${createdBy}`);

  // Eksekusi semua query sekaligus (tanpa urutan)
  cy.wrap(null).then(() => {
    const tasks = queries.map(query => cy.dbQuery(query, dbType));
    return Cypress.Promise.all(tasks).then(() => {
      cy.log('✅ All package tables cleaned (parallel)');
    });
  });
}

/**
 * Helper gabungan untuk menghapus semua data program & package user tertentu.
 */
export function cleanupAll(createdBy: string, dbType = 'MARKETING_SERVICE') {
  cy.log(`🧹 Running full cleanup for user: ${createdBy}`);
  cleanupPackages(createdBy, dbType);
  cleanupPrograms(createdBy, dbType);
}
