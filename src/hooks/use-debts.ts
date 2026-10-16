import { DebtsUseCase } from "@/usecases/debts-use-case";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UseDebtsProps {
  debtsController: DebtsUseCase;
}
/**
 * Controla o fluxo de renderização e sincronização dos dados externos
 */
export function useDebts({ debtsController }: UseDebtsProps) {
  const queryClient = useQueryClient();

  // Buscar os dados
  const debtsQuery = useQuery({
    queryKey: ["debts"],
    queryFn: debtsController.getAllDebts,
  });

  // Ação de deletar (e atualizar a lista automaticamente)
  const deleteDebtMutation = useMutation({
    mutationFn: debtsController.deleteDebt,
    onSuccess: () => {
      // Invalida o cache, forçando o React Query a buscar a lista nova imediatamente
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  return {
    debts: debtsQuery.data ?? [],
    isPending: debtsQuery.isPending,
    error: debtsQuery.error?.message ?? null,
    deleteDebtMutation,
    refetch: debtsQuery.refetch,
  };
}
