import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@/infra/react-query/hooks";
import { SupabaseDebtsUseCase } from "@/infra/supabase/debts-use-case";

/**
 * Controla o fluxo de renderização e sincronização dos dados externos
 */
export function useDebts() {
  const queryClient = useQueryClient();
  const debtsUseCase = new SupabaseDebtsUseCase();

  const debtsQuery = useQuery({
    queryKey: ["debts"],
    queryFn: debtsUseCase.getAllDebts,
  });

  const deleteDebtMutation = useMutation({
    mutationFn: debtsUseCase.deleteDebt,
    onSuccess: () => {
      // Invalida o cache, forçando o React Query a buscar a lista nova imediatamente
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  const createDebtMutation = useMutation({
    mutationFn: debtsUseCase.createDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  return {
    debts: debtsQuery.data ?? [],
    isPending: debtsQuery.isPending,
    error: debtsQuery.error?.message ?? null,
    deleteDebtMutation,
    createDebtMutation,
    refetch: debtsQuery.refetch,
  };
}
