import { Modal } from "./modal";

export interface ErrorModalProps {
  errorMessage?: string | null;
  open: boolean;
  onClose: () => void;
  isPossibleTryAgain?: boolean;
  onTryAgain?: () => void;
}

export function ErrorModal({
  errorMessage,
  open,
  onClose,
  isPossibleTryAgain,
  onTryAgain,
}: ErrorModalProps) {
  return (
    <Modal
      title="Mensagem de erro"
      description={errorMessage === null ? "" : errorMessage}
      cancelText="Voltar"
      confirmText={isPossibleTryAgain ? "Tentar novamente" : undefined}
      onConfirm={onTryAgain}
      open={open}
      onClose={onClose}
    />
  );
}
