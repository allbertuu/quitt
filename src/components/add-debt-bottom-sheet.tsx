import { BottomSheet, Button } from "@expo/ui";
import { useState } from "react";
import { AddDebtForm } from "./add-debt-form";

export function AddDebtBottomSheet() {
  const [isPresented, setIsPresented] = useState(false);

  // function handleSubmitForm() {
  //   setIsPresented(false)
  // }

  return (
    <>
      <Button onPress={() => setIsPresented(true)} label="Adicionar" />

      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        contentPadding={{ bottom: 16, left: 16, right: 16 }}
      >
        <AddDebtForm />
      </BottomSheet>
    </>
  );
}
