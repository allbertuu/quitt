import { Debt } from "@/domain/debt";
import { DebtRepositoryPort, NewDebtParam } from "./ports/debt-repository-port";

export class UserDebtsUseCase {
  constructor(private repository: DebtRepositoryPort) {}

  async listAllDebts(): Promise<Debt[]> {
    try {
      const res = await this.repository.listAll();
      return res;
    } catch (error) {
      throw new Error(`Não foi possível buscar todos os débitos. ${error}`);
    }
  }

  async deleteDebt(id: Debt["id"]): Promise<void> {
    try {
      await this.repository.deleteById(id);
    } catch (error) {
      throw new Error(`Não foi possível apagar esse débito. ${error}`);
    }
  }

  async createDebt(newDebt: NewDebtParam): Promise<void> {
    try {
      await this.repository.create(newDebt);
    } catch (error) {
      throw new Error(`Não foi possível criar um novo débito. ${error}`);
    }
  }
}
