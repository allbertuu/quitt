import { Debt } from "@/entities/debt";

export interface DebtsUseCase {
  getAllDebts: () => Promise<Debt[]>;
  deleteDebt: (id: Debt["id"]) => Promise<void>;
}
