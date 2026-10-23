import { Picker } from "@/components/ui/picker";
import { TextInput } from "@/components/ui/text-input";
import { useDebts } from "@/hooks/use-debts";
import { Controller, useForm } from "@/infra/react-hook-form";
import {
  zodAddDebtFormSchema,
  ZodAddDebtFormSchema,
} from "@/schemas/zod/add-debt-form-schema";
import { zodResolver } from "@/schemas/zod/resolver";
import { Button, Column, Row } from "@expo/ui";
import { useState } from "react";
import { Modal } from "./ui/modal";

interface AddDebtFormProps {
  onSuccess: () => void;
}

export function AddDebtForm({ onSuccess }: AddDebtFormProps) {
  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<ZodAddDebtFormSchema>({
    resolver: zodResolver(zodAddDebtFormSchema),
  });
  const { createDebtMutation } = useDebts();
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const CATEGORIES = [
    { label: "Cartão de Crédito", value: "Cartão de Crédito" },
    { label: "Cheque especial", value: "Cheque especial" },
    { label: "Empréstimo", value: "Empréstimo" },
    { label: "Outros", value: "Outros" },
  ];

  function handleSubmitForm(data: ZodAddDebtFormSchema) {
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
        onError: () => {
          setOpenErrorModal(true);
        },
      },
    );
  }

  const apiError = createDebtMutation.error;
  const isPending = createDebtMutation.isPending;

  return (
    <>
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

        <Row spacing={8}>
          <Button label="Limpar" variant="outlined" onPress={resetForm} />

          <Button
            label="Enviar"
            onPress={handleSubmit(handleSubmitForm)}
            disabled={isPending}
          />
        </Row>
      </Column>

      <Modal
        title="Mensagem de erro"
        description={apiError?.message}
        cancelText="Ok"
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
      />
    </>
  );
}
