export type DebtId = number;
export type DebtInterest = number | null;
export type DebtCategory = string | null;

export interface Debt {
  id: DebtId;
  name: string;
  category: DebtCategory;
  interest: DebtInterest;
  total_value: number;
  is_paid: boolean;
}

export interface DebtWithoutId {
  name: string;
  category: DebtCategory;
  interest: DebtInterest;
  total_value: number;
  is_paid: boolean;
}

export interface DebtRepository {
  listAll: () => Promise<Debt[]>;
  deleteById: (id: DebtId) => Promise<void>;
  create: (payload: DebtWithoutId) => Promise<void>;
  update: (id: DebtId, payload: DebtWithoutId) => Promise<void>;
}
