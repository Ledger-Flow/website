export const calculateTotals = (amounts: number[], taxRate: number = 7.5) => {
  const subtotal = amounts.reduce((sum, amount) => sum + amount, 0);
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  const totalAmount = subtotal + taxAmount;

  return { subtotal, taxAmount, totalAmount };
};
