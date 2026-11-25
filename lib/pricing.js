// HOTFIX candidate pricing: keeps the shipping fix and applies the coupon once.
// NOT REVIEWED: written during the incident, no code review or test run yet.
export const SHIPPING_RULE = 'v2-weight-tier';

export function shippingCents(weightKg) {
  return 800 + 200 * Math.max(0, Math.ceil(weightKg - 5));
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
