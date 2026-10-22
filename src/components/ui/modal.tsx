import {
  Pressable,
  Modal as RNModal,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface ModalProps {
  title?: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function Modal({
  title,
  description,
  open,
  onClose,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
}: ModalProps) {
  function handleCancel() {
    if (onCancel) {
      onCancel();
      onClose();
    }
    onClose();
  }

  function handleConfirm() {
    if (onConfirm) {
      onConfirm();
      onClose();
    }
    onClose();
  }

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      {/* Backdrop com escurecimento suave */}
      <View style={styles.centeredView}>
        <View
          className="bg-background dark:bg-neutral-800 border border-gray-300 dark:border-neutral-900"
          style={{
            ...styles.modalCard,
          }}
        >
          {/* Modal Header */}
          {title && (
            <View className="mb-2">
              <Text className="text-foreground dark:text-white/80 text-lg font-bold">{title}</Text>
            </View>
          )}

          {/* Modal Content */}
          {description && (
            <View className="mb-6">
              <Text className="text-foreground dark:text-white/80 text-base">{description}</Text>
            </View>
          )}

          {/* Modal Actions */}
          <View className="flex flex-row gap-2">
            {cancelText && (
              <Pressable
                className="bg-secondary"
                style={[styles.button]}
                onPress={handleCancel}
              >
                <Text
                  className="text-secondary-foreground text-base"
                  style={styles.cancelButtonText}
                >
                  {cancelText}
                </Text>
              </Pressable>
            )}

            {confirmText && (
              <Pressable
                className="bg-destructive"
                style={[styles.button]}
                onPress={handleConfirm}
              >
                <Text className="text-destructive-foreground text-base">
                  {confirmText}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05050570", // Fundo escurecido e translúcido moderno
  },
  modalCard: {
    width: "85%",
    maxWidth: 380,
    borderRadius: 20, // Bordas bem arredondadas
    padding: 24,
    // Sombra suave e elegante
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCancel: {
    backgroundColor: "#F1F5F9",
    marginRight: 6,
  },
  buttonConfirm: {
    backgroundColor: "#3B82F6",
    marginLeft: 6,
  },
  cancelButtonText: {
    color: "#475569",
    fontWeight: "600",
    fontSize: 14,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
