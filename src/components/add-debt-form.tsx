import { useDebts } from "@/hooks/use-debts";
import {
  zodAddDebtSchema,
  ZodAddDebtSchema,
} from "@/schemas/add-debt-form-schema/zod-add-debt-form-schema";
import { MockDebtsUseCase } from "@/usecases/mock-debts-use-case";
import { Button, Column, Row } from "@expo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Picker } from "./ui/picker";
import { TextInput } from "./ui/text-input";

interface AddDebtFormProps {
  onSuccess: () => void;
}

export function AddDebtForm({ onSuccess }: AddDebtFormProps) {
  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<ZodAddDebtSchema>({
    resolver: zodResolver(zodAddDebtSchema),
  });
  const mockDebtsUseCase = new MockDebtsUseCase();
  const { createDebtMutation } = useDebts({
    debtsUseCase: mockDebtsUseCase,
  });

  const CATEGORIES = [
    { label: "Cartão de Crédito", value: "Cartão de Crédito" },
    { label: "Cheque especial", value: "Cheque especial" },
    { label: "Empréstimo", value: "Empréstimo" },
    { label: "Outros", value: "Outros" },
  ];

  function handleSubmitForm(data: ZodAddDebtSchema) {
    createDebtMutation.mutate(
      {
        name: data.name,
        category: data.category || null,
        interest: data.interest ? Number(data.interest) : null,
        total_value: Number(data.totalValue),
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  }

  const apiError = createDebtMutation.error;
  const isPending = createDebtMutation.isPending;

  return (
    <Column spacing={4}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <TextInput
            label="Nome da dívida"
            placeholder="Ex.: Cartão Nubank"
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field, fieldState }) => (
          <Picker
            options={CATEGORIES}
            selectedValue={field.value || ""}
            onValueChange={field.onChange}
            label="Categoria da dívida"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="interest"
        render={({ field, fieldState }) => (
          <TextInput
            label="Taxa de juros mensal (se houver)"
            placeholder="Ex.: 17.5"
            keyboardType="number-pad"
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            errorMessage={fieldState.error?.message}
            helperText="Troque a vírgula por ponto. Ex.: 17,5% -> 17.5"
          />
        )}
      />

      <Controller
        control={control}
        name="totalValue"
        render={({ field, fieldState }) => (
          <TextInput
            label="Valor total da dívida"
            placeholder="Ex.: 100.50"
            keyboardType="number-pad"
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            errorMessage={fieldState.error?.message}
            helperText="Separe os centavos por ponto. Ex.: 100,50 -> 100.50"
          />
        )}
      />

      {apiError && (
        <View className="flex flex-row gap-1">
          <Text className="text-destructive font-bold">Mensagem de erro:</Text>
          <Text className="text-destructive">{apiError.message}</Text>
        </View>
      )}

      <Row spacing={8}>
        <Button label="Limpar" variant="outlined" onPress={resetForm} />

        <Button
          label="Enviar"
          onPress={handleSubmit(handleSubmitForm)}
          disabled={isPending}
        />
      </Row>
    </Column>
  );
}
