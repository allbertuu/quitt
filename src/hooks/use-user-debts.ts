import { UserDebtsContext } from "@/contexts/user-debts";
import { useContext } from "react";

/**
 * Controla o fluxo de renderização e sincronização dos dados externos
 */
// export function useUserDebts() {
//   const queryClient = useQueryClient();
//   const debtRepository = new MockDebtRepositoryAdapter();
//   const userDebtsUseCase = new UserDebtsUseCase(debtRepository);

//   const userDebtsQuery = useQuery({
//     queryKey: ["debts"],
//     queryFn: () => userDebtsUseCase.listAllDebts(),
//   });

//   const deleteDebtMutation = useMutation({
//     mutationFn: (id: number) => userDebtsUseCase.deleteDebt(id),
//     onSuccess: () => {
//       // Invalida o cache, forçando o React Query a buscar a lista nova imediatamente
//       queryClient.invalidateQueries({ queryKey: ["debts"] });
//     },
//   });

//   const createDebtMutation = useMutation({
//     mutationFn: (params: NewDebtParam) => userDebtsUseCase.createDebt(params),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["debts"] });
//     },
//   });

//   return {
//     debts: userDebtsQuery.data ?? [],
//     isPending: userDebtsQuery.isPending,
//     error: userDebtsQuery.error?.message ?? null,
//     deleteDebtMutation,
//     createDebtMutation,
//     refetch: userDebtsQuery.refetch,
//   };
// }

export function useUserDebts() {
  return useContext(UserDebtsContext);
}
