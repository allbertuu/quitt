import { NewDebtParam } from "@/application/ports/debt-repository-port";
import { UserDebtsUseCase } from "@/application/user-debts-use-case";
import { Debt } from "@/domain/debt";
import { MockDebtRepositoryAdapter } from "@/infra/mocks/mock-debt-repository-adapter";
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
  deleteDebtMutation: UseMutationResult<void, Error, number, unknown>;
  createDebtMutation: UseMutationResult<void, Error, NewDebtParam, unknown>;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Debt[], Error>>;
}

export const UserDebtsContext = createContext({} as UserDebts);

export function UserDebtsProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const debtRepository = new MockDebtRepositoryAdapter();
  const userDebtsUseCase = new UserDebtsUseCase(debtRepository);

  const userDebtsQuery = useQuery({
    queryKey: ["debts"],
    queryFn: () => userDebtsUseCase.listAllDebts(),
  });

  const deleteDebtMutation = useMutation({
    mutationFn: (id: number) => userDebtsUseCase.deleteDebt(id),
    onSuccess: () => {
      // Invalida o cache, forçando o React Query a buscar a lista nova imediatamente
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  const createDebtMutation = useMutation({
    mutationFn: (params: NewDebtParam) => userDebtsUseCase.createDebt(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
  });

  return (
    <UserDebtsContext.Provider
      value={{
        debts: userDebtsQuery.data ?? [],
        isPending: userDebtsQuery.isPending,
        error: userDebtsQuery.error?.message ?? null,
        deleteDebtMutation,
        createDebtMutation,
        refetch: userDebtsQuery.refetch,
      }}
    >
      {children}
    </UserDebtsContext.Provider>
  );
}
