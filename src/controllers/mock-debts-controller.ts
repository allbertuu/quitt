import { Debt } from "@/entities/debt";
import { DebtsUseCase } from "@/usecases/debts-use-case";

export const DEBTS: Debt[] = [
  {
    id: 0,
    name: "Cartão Nubank",
    category: "Cartão de crédito",
    interest: 0.161,
    total_value: 1522.02,
  },
  {
    id: 1,
    name: "Cartão Inter",
    category: "Cartão de crédito",
    interest: 0.179,
    total_value: 3497.09,
  },
  {
    id: 2,
    name: "Cartão Riachuelo",
    category: "Cartão de crédito",
    interest: 0.1999,
    total_value: 143.91,
  },
  {
    id: 3,
    name: "Empréstimo Mercado Livre",
    category: "Empréstimo pessoal",
    interest: 0.01,
    total_value: 12.99,
  },
];

export class MockDebtsController implements DebtsUseCase {
  async getAllDebts(): Promise<Debt[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(new Error("Erro ao carregar dados da API"));
        resolve(DEBTS);
        // resolve([]);
      }, 2000);
    });
  }

  async deleteDebt(id: Debt["id"]): Promise<void> {
    console.log(
      "Você excluiu:",
      DEBTS.find((debt) => debt.id === id),
    );
  }
}
