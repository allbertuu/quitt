/**
 * Recebe, como string, um decimal (0.5) ou inteiro (17.5) e retorna o valor no formato "17,5%"
 */
export function formatPercentage(value?: string, fallback: string = "-") {
  // Trata casos vazios, null ou undefined
  if (!value || value.trim() === "") {
    return fallback;
  }

  // Converte ponto em vírgula para exibição visual padrão PT-BR (ex: "17.5" -> "17,5")
  const formattedValue = value.replace(".", ",");

  return `${formattedValue}%`;
}
