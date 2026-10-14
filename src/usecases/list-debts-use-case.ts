import { Debt } from "@/entities/debt";

export interface ListDebtsUseCase {
  getAllDebts: () => Promise<Debt[]>;
}