import { UserDebtsContext } from "@/contexts/user-debts";
import { useContext } from "react";

export function useUserDebts() {
  return useContext(UserDebtsContext);
}
