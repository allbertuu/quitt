import { Button, Column } from "@expo/ui";
import { TextInput } from "./ui/text-input";

export function AddDebtForm() {
  return (
    <Column spacing={16}>
      <TextInput placeholder="Ex.: Cartão Nubank" />

      <Button
        label="Adicionar"
        onPress={() => {
          // console.log("Adicionado:", newDebt);
        }}
      />
    </Column>
  );
}
