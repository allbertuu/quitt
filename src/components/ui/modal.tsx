import React, { useState } from "react";
import {
  Pressable,
  Modal as RNModal,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface ModalProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  children: React.ReactNode;
  variant?: "default" | "deleteButton";
}

export function Modal({
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  children,
  variant = "default",
}: ModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setModalVisible(false);
  };

  return (
    <>
      <RNModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Backdrop com escurecimento suave */}
        <View style={styles.centeredView}>
          <View style={styles.modalCard}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>

            {/* Body */}
            <View style={styles.modalBody}>
              <Text style={styles.modalDescription}>{description}</Text>
            </View>

            {/* Footer */}
            <View style={styles.modalFooter}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </RNModal>

      {/* Gatilho para abrir o modal */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={({ pressed }) => [
          variant === "deleteButton" && styles.deleteButton,
          pressed && { opacity: 0.6 },
        ]}
        // Aumenta a área de toque quando botão de deletar
        hitSlop={variant === "deleteButton" ? 16 : undefined}
      >
        {children}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.4)", // Fundo escurecido e translúcido moderno
  },
  modalCard: {
    width: "85%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
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
    borderColor: "#F1F5F9", // Borda sutil minimalista
  },
  modalHeader: {
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  modalBody: {
    marginBottom: 24,
  },
  modalDescription: {
    fontSize: 14,
    color: "#64748B",
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
  deleteButton: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#FEF2F2", // Fundo vermelho bem suave para dar contraste
  },
});
