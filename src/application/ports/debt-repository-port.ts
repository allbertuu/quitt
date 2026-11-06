import { Debt } from "@/domain/debt";

export type NewDebtParam = Omit<Debt, "id">;

export interface DebtRepositoryPort {
  listAll: () => Promise<Debt[]>;
  deleteById: (id: Debt["id"]) => Promise<void>;
  create: (newDebt: NewDebtParam) => Promise<void>;
}
