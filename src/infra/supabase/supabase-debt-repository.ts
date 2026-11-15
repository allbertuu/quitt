import {
  Debt,
  DebtRepository,
  DebtWithoutIdUpdatePayload,
} from "@/application/ports/debt-repository";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseDebtRepository implements DebtRepository {
  constructor(private readonly client: SupabaseClient) {}

  async update(
    debtId: Debt["id"],
    payload: DebtWithoutIdUpdatePayload,
  ): Promise<void> {
    const { error } = await this.client
      .from("debts")
      .update(payload)
      .eq("id", debtId);

    if (error) {
      throw new Error(error.message);
    }
  }

  async deleteById(id: Debt["id"]): Promise<void> {
    const { error } = await this.client.from("debts").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async create(newDebt: Omit<Debt, "id">): Promise<void> {
    const { error } = await this.client.from("debts").insert(newDebt);

    if (error) {
      throw new Error(error.message);
    }
  }

  async listAll(): Promise<Debt[]> {
    const { data, error } = await this.client.from("debts").select();

    if (error) {
      throw new Error(error.message);
    }

    return data as Debt[];
  }
}
