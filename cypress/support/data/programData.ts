import { generateDateRange, generateSeNumber } from '../../../helper/fakerHelper';

export const drawdownTypes = [
  { id: 605, value: 'Mobil & Lainnya' },
  { id: 606, value: 'Pembiayaan Motor' },
];

export const products = [
  { id: 6180, value: 'Refinancing' },
  { id: 6181, value: 'Jual Beli' },
];

export const installmentTypes = [
  { id: 48, value: 'ADDM' },
  { id: 49, value: 'ADDB' },
];

/**
 * Build base body untuk create program
 * @param productId id produk (harus cocok dengan data di array products)
 * @param packageSchemaId id package (didapat dari API list-packages)
 * @param overrides optional field untuk custom body
 */
export const buildBaseProgramData = (
  productId: number,
  packageSchemaId: number,
  overrides: Record<string, any> = {}
) => {
  const { start, end } = generateDateRange(3, 2);

  // cari data product dan drawdown dari array
  const product = products.find((p) => p.id === productId);
  const drawdown = drawdownTypes[0]; // ambil default (atau bisa ubah ke random)
  const installment = installmentTypes[0]; // ambil default (atau random juga bisa)

  // buat kombinasi nama & deskripsi dinamis
  const programName = `${product?.value} (${drawdown.value} / ${installment.value})`;
  const programDescription = `automation: program ${product?.value} (${drawdown.value} / ${installment.value})`;

  const base = {
    submit_type: 'FINAL',
    drawdown_type_id: drawdown.id,
    product_id: productId,
    product_description: `${drawdown.value} || ${product?.value}`,
    program_name: programName,
    program_prority_id: 1,
    se_number: generateSeNumber(),
    special_feature_id: null,
    installment_type_ids: [installment.id],
    start_date_period: start,
    end_date_period: end,
    program_description: programDescription,
    application_source_ids: [0],
    category_debitur_ids: [0],
    transaction_type_ids: [0],
    vehicle_sub_model_ids: [0],
    vehicle_manufacturer_ids: [0],
    asset_brand_ids: [0],
    vehicle_age_min: 0,
    vehicle_age_max: 5,
    region_ids: [0],
    branch_ids: [0],
    source_ids: [0],
    channel_ids: [0],
    dealer_ids: [0],
    tiering_request: [
      {
        minimum_market_price: 20000000,
        maximum_market_price: 9000000000,
        refund_insurance_id: 2,
        refund_insurance_value: 22,
        discount_admin: 2,
        is_additional_flat_rate: 1,
        is_additional_reward: 1,
        package_schema_id: packageSchemaId,
      },
    ],
  };

  return { ...base, ...overrides };
};
