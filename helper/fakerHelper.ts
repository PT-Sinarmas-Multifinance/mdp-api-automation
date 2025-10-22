import { faker } from '@faker-js/faker';

/**
 * Generate random ISO date range (start & end)
 * @param startInDays jumlah hari dari sekarang untuk mulai
 * @param durationInMonths lama durasi dalam bulan
 */
export function generateDateRange(startInDays = 3, durationInMonths = 2) {
  const startDate = faker.date.soon({ days: startInDays });
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + durationInMonths);

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
}

/**
 * Generate random program name
 */
export function generateProgramName() {
  return faker.commerce.productName();
}

/**
 * Generate random SE number
 */
export function generateSeNumber() {
  return faker.number.int({ min: 10000, max: 99999 });
}
