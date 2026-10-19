import { ZodAddDebtSchema } from "@/schemas/add-debt-form-schema/zod-add-debt-form-schema";
import { BottomSheet, Button } from "@expo/ui";
import { useState } from "react";
import { AddDebtForm } from "./add-debt-form";

export function AddDebtBottomSheet() {
  const [isPresented, setIsPresented] = useState(false);
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState<
    string | null
  >(null);

  function handleSubmitForm(data: ZodAddDebtSchema) {
    console.log("Enviado:", data);
    // setIsPresented(false);
    setSubmissionErrorMessage("Já existe usuário com esse nome");
  }

  return (
    <>
      <Button label="Adicionar" onPress={() => setIsPresented(true)} />

      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        contentPadding={{ bottom: 16, left: 16, right: 16 }}
      >
        <AddDebtForm
          submissionErrorMessage={submissionErrorMessage}
          onSubmit={(data) => handleSubmitForm(data)}
        />
      </BottomSheet>
    </>
  );
}
