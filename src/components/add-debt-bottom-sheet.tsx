import { BottomSheet } from "@expo/ui";
import { AddDebtForm } from "./add-debt-form";

interface AddDebtBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export function AddDebtBottomSheet({
  open,
  onClose,
  onSubmitSuccess,
}: AddDebtBottomSheetProps) {
  return (
    <BottomSheet
      isPresented={open}
      onDismiss={onClose}
      contentPadding={{ bottom: 16, left: 16, right: 16 }}
    >
      <AddDebtForm onSuccess={onSubmitSuccess} />
    </BottomSheet>
  );
}
