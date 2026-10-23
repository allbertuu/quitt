import { BottomSheet } from "@expo/ui";

interface AddDebtBottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AddDebtBottomSheet({
  open,
  onClose,
  children,
}: AddDebtBottomSheetProps) {
  return (
    <BottomSheet
      isPresented={open}
      onDismiss={onClose}
      contentPadding={{ bottom: 16, left: 16, right: 16 }}
    >
      {children}
    </BottomSheet>
  );
}
