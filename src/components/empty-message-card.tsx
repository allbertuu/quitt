import { Host, Icon } from "@expo/ui";
import { StyleSheet, Text, View } from "react-native";
import { trophyIcon } from "./icons";

export function EmptyMessageCard() {
  return (
    <View style={styles.card}>
      <Host style={styles.iconContainer}>
        <Icon name={trophyIcon} size={26} color="#3B82F6" />
      </Host>

      <View style={styles.contentContainer}>
        <Text style={styles.messageText}>
          <Text style={styles.bold}>Parabéns!</Text> Onde há determinação, o
          caminho pode ser encontrado.{" "}
          <Text style={styles.bold}>Mantenha-se assim</Text>.
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
    backgroundColor: "#EFF6FF", // Fundo azul pastel suave
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  contentContainer: {
    flex: 1,
  },
  messageText: {
    fontSize: 14,
    color: "#1E293B",
    lineHeight: 20,
    fontWeight: "500",
  },
  bold: {
    fontWeight: "800",
  },
});
