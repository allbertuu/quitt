/**
 * Recebe um decimal (0.5) ou inteiro (17.5) e retorna o valor no formato "17,5%"
 */
export function formatPercentage(value?: number | null, fallback: string = "-") {
  const valueStr = value?.toString();
  // Trata casos vazios, null ou undefined
  if (!valueStr || valueStr.trim() === "") {
    return fallback;
  }

  // Converte ponto em vírgula para exibição visual padrão PT-BR (ex: "17.5" -> "17,5")
  const formattedValue = valueStr.replace(".", ",");

  return `${formattedValue}%`;
}
