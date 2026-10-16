import { z } from "zod";

export const zodAddDebtSchema = z.object({
  name: z
    .string({ message: "campo obrigatório" })
    .min(3, "defina um nome de, no mínimo, 3 caracteres"),
  // category: z
  //   .string()
  //   .min(3, "defina uma categoria de, no mínimo, 3 caracteres")
  //   .optional(),
  // interest: z.number().positive("insira valores de 0 ou acima de 0").optional(),
  // totalValue: z
  //   .number({ message: "campo obrigatório" })
  //   .gte(0, "insira valores acima de 0"),
});

export type ZodAddDebtSchema = z.infer<typeof zodAddDebtSchema>;
