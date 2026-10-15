import { MockDebtsController } from "@/controllers/mock-debts-controller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Controla o fluxo de renderização e sincronização dos dados externos
 */
export function useDebts() {
  const db = new MockDebtsController();
  const queryClient = useQueryClient();

  // Buscar os dados
  const debtsQuery = useQuery({
    queryKey: ["debts"],
    queryFn: db.getAllDebts,
  });

  // Ação de deletar (e atualizar a lista automaticamente)
  const deleteDebtMutation = useMutation({
    mutationFn: db.deleteDebt,
    onSuccess: () => {
      // Invalida o cache, forçando o React Query a buscar a lista nova imediatamente
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  return {
    debts: debtsQuery.data ?? [],
    isPending: debtsQuery.isPending,
    error: debtsQuery.error?.message ?? null,
    deleteDebt: deleteDebtMutation.mutate,
  };
}
