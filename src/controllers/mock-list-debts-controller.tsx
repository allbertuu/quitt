import { Debt } from "@/entities/debt";
import { ListDebtsUseCase } from "@/usecases/list-debts-use-case";

export const DEBTS: Debt[] = [
  {
    name: "Cartão Nubank",
    category: "Cartão de crédito",
    interest: 0.161,
    total_value: 1522.02,
  },
  {
    name: "Cartão Inter",
    category: "Cartão de crédito",
    interest: 0.179,
    total_value: 3497.09,
  },
  {
    name: "Cartão Riachuelo",
    category: "Cartão de crédito",
    interest: 0.1999,
    total_value: 143.91,
  },
  {
    name: "Empréstimo Mercado Livre",
    category: "Empréstimo pessoal",
    interest: 0.01,
    total_value: 12.99,
  },
];

export class MockListDebtsController implements ListDebtsUseCase {
  async getAllDebts(): Promise<Debt[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(new Error("Erro ao carregar dados da API"));
        resolve(DEBTS);
        // resolve([]);
      }, 2000);
    });
  }
}
