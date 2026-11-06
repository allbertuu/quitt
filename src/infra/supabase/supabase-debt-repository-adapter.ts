import {
  DebtRepositoryPort,
  NewDebtParam,
} from "@/application/ports/debt-repository-port";
import { Debt } from "@/domain/debt";
import { SupabaseClient } from "@supabase/supabase-js";

export class SupabaseDebtRepositoryAdapter implements DebtRepositoryPort {
  constructor(private readonly client: SupabaseClient) {}

  async deleteById(id: Debt["id"]): Promise<void> {
    const { error } = await this.client.from("debts").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }
  async create(newDebt: NewDebtParam): Promise<void> {
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
