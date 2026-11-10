import {
  Debt,
  DebtWithoutId,
  DebtWithoutIdUpdatePayload,
} from "@/application/ports/debt-repository";
import { MockDebtRepository } from "@/infra/mocks/mock-debt-repository";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createContext } from "react";

interface UserDebts {
  debts: Debt[];
  isPending: boolean;
  error: string | null;
  deleteDebt: UseMutationResult<void, Error, number, unknown>;
  createDebt: UseMutationResult<void, Error, DebtWithoutId, unknown>;
  updateDebt: UseMutationResult<
    void,
    Error,
    {
      id: number;
      payload: DebtWithoutIdUpdatePayload;
    },
    unknown
  >;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Debt[], Error>>;
}

export const UserDebtsContext = createContext({} as UserDebts);

export function UserDebtsProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const debtRepository = new MockDebtRepository();

  const userDebtsQuery = useQuery({
    queryKey: ["debts"],
    queryFn: () => debtRepository.listAll(),
  });

  const deleteDebtMutation = useMutation({
    mutationFn: (id: number) => debtRepository.deleteById(id),
    onSuccess: () => {
      // Invalida o cache, forçando o React Query a buscar a lista nova imediatamente
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  const createDebtMutation = useMutation({
    mutationFn: (newDebt: DebtWithoutId) => debtRepository.create(newDebt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  const updateDebtMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: DebtWithoutIdUpdatePayload;
    }) => debtRepository.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  return (
    <UserDebtsContext.Provider
      value={{
        debts: userDebtsQuery.data ?? [],
        isPending:
          userDebtsQuery.isPending ||
          deleteDebtMutation.isPending ||
          createDebtMutation.isPending ||
          updateDebtMutation.isPending,
        error: userDebtsQuery.error?.message ?? null,
        deleteDebt: deleteDebtMutation,
        createDebt: createDebtMutation,
        updateDebt: updateDebtMutation,
        refetch: userDebtsQuery.refetch,
      }}
    >
      {children}
    </UserDebtsContext.Provider>
  );
}
