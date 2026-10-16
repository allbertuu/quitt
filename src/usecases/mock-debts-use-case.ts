import { Debt } from "@/entities/debt";
import { DebtsUseCase } from "@/usecases/debts-use-case";

export let DEBTS: Debt[] = [
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

export class MockDebtsUseCase implements DebtsUseCase {
  getAllDebts(): Promise<Debt[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // reject(new Error("Erro ao carregar dados da API"));
        resolve(DEBTS);
        // resolve([]);
      }, 2000);
    });
  }

  deleteDebt(id: Debt["id"]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          "Você excluiu:",
          DEBTS.find((debt) => debt.id === id),
        );
        const debtsUpdated = DEBTS.filter((debt) => debt.id !== id);
        DEBTS = debtsUpdated;
        resolve();
      }, 2000);
    });
  }
}
