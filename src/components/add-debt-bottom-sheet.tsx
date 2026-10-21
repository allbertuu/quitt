import { BottomSheet } from "@expo/ui";
import { useState } from "react";
import { AddDebtForm } from "./add-debt-form";
import { Button } from "./ui/button";

export function AddDebtBottomSheet() {
  const [isPresented, setIsPresented] = useState(false);

  return (
    <>
      <Button label="Adicionar" onPress={() => setIsPresented(true)} />

      <BottomSheet
        isPresented={isPresented}
        onDismiss={() => setIsPresented(false)}
        contentPadding={{ bottom: 16, left: 16, right: 16 }}
      >
        <AddDebtForm
          onSuccess={() => {
            setIsPresented(false);
          }}
        />
      </BottomSheet>
    </>
  );
}
