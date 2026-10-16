import {
  zodAddDebtSchema,
  ZodAddDebtSchema,
} from "@/schemas/add-debt-form-schema/zod-add-debt-form-schema";
import { Button, Column } from "@expo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "./ui/text-input";

interface AddDebtFormProps {
  onSubmit(): void;
}

export function AddDebtForm({ onSubmit }: AddDebtFormProps) {
  const { control, handleSubmit } = useForm<ZodAddDebtSchema>({
    resolver: zodResolver(zodAddDebtSchema),
  });

  return (
    <Column spacing={16}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <TextInput
            label="Nome da dívida"
            placeholder="Ex.: Cartão Nubank"
            // value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Button label="Adicionar" onPress={handleSubmit(onSubmit)} />
    </Column>
  );
}
