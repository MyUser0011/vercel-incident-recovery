// THE BUSINESS SPECIFICATION. Identical in every revision of this repo.
// Shipping: $8.00 flat, plus $2.00 for every started kilogram above 5 kg.
// Coupon SAVE20: 20% off the subtotal, applied once, when coupons are enabled.
export const SAMPLE_BASKET = { subtotalCents: 10000, weightKg: 8, coupon: 'SAVE20' };

export function couponsEnabled() {
  return process.env.COUPONS_ENABLED !== 'false';
}

export function expectedTotalCents({ subtotalCents, weightKg, coupon }, enabled) {
  const discount = enabled && coupon === 'SAVE20' ? Math.round(subtotalCents * 0.2) : 0;
  const shipping = 800 + 200 * Math.max(0, Math.ceil(weightKg - 5));
  return subtotalCents - discount + shipping;
}
