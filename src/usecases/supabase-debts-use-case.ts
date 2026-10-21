import { Debt } from "@/entities/debt";
import { supabase } from "@/infra/supabase-client";
import { CreateDebtParam, DebtsUseCase } from "@/usecases/debts-use-case";

export class SupabaseDebtsUseCase implements DebtsUseCase {
  async getAllDebts(): Promise<Debt[]> {
    const { data, error } = await supabase.from("debts").select();

    if (error) {
      throw new Error(error.message);
    }

    return data as Debt[];
  }

  async deleteDebt(id: Debt["id"]): Promise<void> {
    const { error } = await supabase.from("debts").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }
  }

  async createDebt(debt: CreateDebtParam): Promise<void> {
    const { error } = await supabase.from("debts").insert(debt);

    if (error) {
      throw new Error(error.message);
    }
  }
}
