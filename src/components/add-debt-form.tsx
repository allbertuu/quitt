import {
  zodAddDebtSchema,
  ZodAddDebtSchema,
} from "@/schemas/add-debt-form-schema/zod-add-debt-form-schema";
import { Button, Column, Row, Text } from "@expo/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "./ui/text-input";

interface AddDebtFormProps {
  submissionErrorMessage: string | null;
  onSubmit(data: ZodAddDebtSchema): void;
}

export function AddDebtForm({
  submissionErrorMessage,
  onSubmit,
}: AddDebtFormProps) {
  const { control, handleSubmit } = useForm<ZodAddDebtSchema>({
    resolver: zodResolver(zodAddDebtSchema),
  });

  return (
    <Column spacing={12}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <TextInput
            label="Nome da dívida"
            placeholder="Ex.: Cartão Nubank"
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      {submissionErrorMessage && (
        <Row spacing={4}>
          <Text textStyle={{ color: "#8b2525", fontWeight: "700" }}>
            Mensagem de erro:
          </Text>
          <Text textStyle={{ color: "#8b2525" }}>{submissionErrorMessage}</Text>
        </Row>
      )}

      <Button label="Adicionar" onPress={handleSubmit(onSubmit)} />
    </Column>
  );
}
