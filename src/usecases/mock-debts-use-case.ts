import { Debt } from "@/entities/debt";
import { CreateDebtParam, DebtsUseCase } from "@/usecases/debts-use-case";

export let DEBTS: Debt[] = [
  {
    id: 0,
    name: "Cartão Nubank",
    category: "Cartão de crédito",
    interest: null,
    total_value: 1522.02,
  },
  {
    id: 1,
    name: "Cartão Inter",
    category: null,
    interest: 17.9,
    total_value: 3497.09,
  },
  {
    id: 2,
    name: "Cartão Riachuelo",
    category: null,
    interest: null,
    total_value: 143.91,
  },
  {
    id: 3,
    name: "Empréstimo Mercado Livre",
    category: "Empréstimo pessoal",
    interest: 1,
    total_value: 12.99,
  },
];

export class MockDebtsUseCase implements DebtsUseCase {
  getAllDebts(): Promise<Debt[]> {
    return new Promise((resolve, reject) => {
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
          "Você excluiu no backend falso:",
          DEBTS.find((debt) => debt.id === id),
        );
        const debtsUpdated = DEBTS.filter((debt) => debt.id !== id);
        DEBTS = debtsUpdated;
        resolve();
      }, 2000);
    });
  }

  createDebt(debt: CreateDebtParam): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const createdDebt = { id: DEBTS.length + 1, ...debt };
        DEBTS.push(createdDebt);
        console.log("Você criou no backend falso:", createdDebt);
        resolve();
        // reject(new Error("Erro ao carregar dados da API"));
      }, 2000);
    });
  }
}
