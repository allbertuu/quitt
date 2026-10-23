import { z } from "zod";

export const zodAddDebtFormSchema = z.object({
  name: z
    .string({ message: "Campo obrigatório" })
    .min(3, "Defina um nome de, no mínimo, 3 caracteres")
    .max(30, "Defina um nome de, no máximo, 30 caracteres"),
  category: z.string().optional(),
  interest: z
    .string()
    .trim()
    .regex(/^(\d{1,3}(\.\d{1,2})?)?$/, "O valor deve ser entre 0 e 999.99")
    .optional(),
  totalValue: z
    .string({ message: "Campo obrigatório" })
    .min(1, "O valor não pode estar vazio")
    .max(8, "Valor muito alto. Verifique se digitou corretamente.")
    .regex(
      /^(?!0+(\.0{1,2})?$)\d+(\.\d{1,2})?$/,
      "Apenas valor maior que zero e até 2 casas decimais",
    ),
});

export type ZodAddDebtFormSchema = z.infer<typeof zodAddDebtFormSchema>;
