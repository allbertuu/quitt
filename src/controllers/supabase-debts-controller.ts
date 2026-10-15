import { Debt } from "@/entities/debt";
import { supabase } from "@/infra/supabase-client";
import { DebtsUseCase } from "@/usecases/debts-use-case";

export class SupabaseDebtsController implements DebtsUseCase {
  async getAllDebts(): Promise<Debt[]> {
    const { data, error } = await supabase.from("debts").select();

    if (error) {
      throw new Error(error.message);
    }

    return data as Debt[];
  }
  async deleteDebt(id: Debt["id"]): Promise<void> {
    
  }
}
