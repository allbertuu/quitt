import { UserDebtsContext } from "@/presentation/contexts/user-debts";
import { useContext } from "react";

export function useUserDebts() {
  return useContext(UserDebtsContext);
}
