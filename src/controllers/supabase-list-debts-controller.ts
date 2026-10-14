import { Debt } from "@/entities/debt";
import { supabase } from "@/infra/supabase-client";
import { ListDebtsUseCase } from "@/usecases/list-debts-use-case";

export class SupabaseListDebtsController implements ListDebtsUseCase {
  async getAllDebts(): Promise<Debt[]> {
    const { data, error } = await supabase.from("debts").select();

    if (error) {
      throw new Error(error.message);
    }

    return data as Debt[];
  }
}
