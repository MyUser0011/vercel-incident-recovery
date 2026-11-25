// Release D1 pricing: coupon applied once (correct); shipping is a flat $8.00 (undercharges heavy orders).
export const SHIPPING_RULE = 'v1-flat';

export function shippingCents() {
  return 800;
}

export function applyCoupon(subtotalCents, coupon, enabled) {
  if (!enabled || coupon !== 'SAVE20') return { discountCents: 0 };
  return { discountCents: Math.round(subtotalCents * 0.2) };
}

export function quote({ subtotalCents, weightKg, coupon }, enabled) {
  const { discountCents } = applyCoupon(subtotalCents, coupon, enabled);
  const shipping = shippingCents(weightKg);
  return {
    subtotalCents,
    discountCents,
    shippingCents: shipping,
    totalCents: subtotalCents - discountCents + shipping,
  };
}
