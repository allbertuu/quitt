/**
 * Retorna o valor no formato "R$ 1.000,50"
 */
export function formatCurrency(value: number | string) {
  // Converte a string para número caso venha como texto (ex: "1000.50")
  const number = typeof value === "number" ? value : parseFloat(value);

  // Retorna um valor padrão se a conversão falhar
  if (isNaN(number)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}
