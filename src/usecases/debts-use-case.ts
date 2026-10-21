import { Debt } from "@/entities/debt";

export type CreateDebtParam = Omit<Debt, "id">;

export interface DebtsUseCase {
  getAllDebts: () => Promise<Debt[]>;
  deleteDebt: (id: Debt["id"]) => Promise<void>;
  createDebt: ({
    name,
    category,
    interest,
    total_value,
  }: CreateDebtParam) => Promise<void>;
}
