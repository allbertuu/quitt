import { Host, Icon } from "@expo/ui";
import { StyleSheet, Text, View } from "react-native";
import { errorIcon } from "./icons";

export function ErrorMessageCard({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <Host style={styles.iconContainer}>
        <Icon name={errorIcon} size={26} color="#EF4444" />
      </Host>

      <View style={styles.contentContainer}>
        <Text style={styles.messageText}>
          <Text style={styles.bold}>Houve o seguinte erro: </Text>
          {children}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16, // Bordas arredondadas modernas
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    // Sombras leves e elegantes
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9", // Borda sutil minimalista
    marginHorizontal: 16,
    marginVertical: 8,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#FEF2F2", // Fundo vermelho pastel suave (consistente com o botão de deletar)
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  contentContainer: {
    flex: 1,
  },
  messageText: {
    fontSize: 14,
    color: "#1E293B", // Cor do texto de leitura, igual ao de sucesso
    lineHeight: 20,
    fontWeight: "500",
  },
  bold: {
    fontWeight: 800,
  },
});
