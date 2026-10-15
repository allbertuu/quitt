/**
 * Dados modelados com base na tabela de dívidas do Supabase.
 */
export interface Debt {
  // obrigatório, auto-gerado
  id: number;
  // text, único, obrigatório
  name: string;
  // text, opcional, não-único
  category: string | null;
  // numeric (taxa de juros), opcional, não-único
  interest: number | null;
  // numeric (valor monetário), obrigatório, não-único
  total_value: number;
}
