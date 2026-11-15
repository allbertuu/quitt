import {
  Debt,
  DebtId,
  DebtRepository,
  DebtWithoutIdUpdatePayload,
} from "@/application/ports/debt-repository";

export let DEBTS: Debt[] = [
  {
    id: 0,
    name: "Cartão Nubank",
    category: "Cartão de crédito",
    interest: null,
    total_value: 1522.02,
    is_paid: false,
  },
  {
    id: 1,
    name: "Cartão Inter",
    category: null,
    interest: 17.9,
    total_value: 3497.09,
    is_paid: false,
  },
  {
    id: 2,
    name: "Cartão Riachuelo",
    category: null,
    interest: null,
    total_value: 143.91,
    is_paid: false,
  },
  {
    id: 3,
    name: "Empréstimo Mercado Livre",
    category: "Empréstimo pessoal",
    interest: 1,
    total_value: 12.99,
    is_paid: true,
  },
];

export class MockDebtRepository implements DebtRepository {
  update(id: DebtId, payload: DebtWithoutIdUpdatePayload): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundDebtIdx = DEBTS.findIndex((debt) => debt.id === id);
        DEBTS[foundDebtIdx] = { ...DEBTS[foundDebtIdx], ...payload };
        resolve();
        // reject(new Error("Já foi quitado"));
      }, 2000);
    });
  }

  deleteById(id: Debt["id"]): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(
          "Você excluiu no backend falso:",
          DEBTS.find((debt) => debt.id === id),
        );
        const debtsUpdated = DEBTS.filter((debt) => debt.id !== id);
        DEBTS = debtsUpdated;
        resolve();
        // reject(new Error("Not authorized"));
      }, 2000);
    });
  }

  create(newDebt: Omit<Debt, "id">): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const createdDebt = { id: DEBTS.length + 1, ...newDebt };
        DEBTS.push(createdDebt);
        console.log("Você criou no backend falso:", createdDebt);
        resolve();
        // reject(new Error("Duplicated debt"));
      }, 2000);
    });
  }

  listAll(): Promise<Debt[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject(new Error("Not Found"));
        resolve(DEBTS);
        // resolve([]);
      }, 2000);
    });
  }
}
