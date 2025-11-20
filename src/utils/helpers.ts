export default function parsePrice(priceWithCurrency: string | number): number {
  if (typeof priceWithCurrency === "number") return priceWithCurrency;
  const cleaned = priceWithCurrency.replace(/[^\d.]/g, "");
  return parseFloat(cleaned);
}