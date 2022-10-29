export function getCartTotalPrice(cart, location) {
  const cost = cart.reduce((a, c) => a + discountPrice(c, location), 0);
  return cost;
}

export const discountPrice = (c, location) => {
  return location === "NG"
    ? (Number(100 - c.discount) / 100) * c.priceNigeria
    : (Number(100 - c.discount) / 100) * c.price;
};
