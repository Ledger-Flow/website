export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatCurrency = (
  amount: number,
  currency: string = "NGN",
  locales: string = "en-NG",
): string => {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
  }).format(amount);
};
