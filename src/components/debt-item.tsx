import { Debt } from "@/entities/debt";
import { Host, Icon } from "@expo/ui";
import { StyleSheet, Text, View } from "react-native";
import { trashIcon } from "./icons";
import { Modal } from "./ui/modal";

type DebtItemProps = {
  name: Debt["name"];
  category: Debt["category"];
  interest: Debt["interest"];
  totalValue: Debt["total_value"];
  onDelete: () => void;
};

export function DebtItem({
  name,
  category,
  interest,
  totalValue,
  onDelete,
}: DebtItemProps) {
  const interestPercentage = interest
    ? (interest * 100).toFixed(2) + "%"
    : null;
  const formattedTotalValue = `R$ ${totalValue.toFixed(2)}`;

  return (
    <View style={styles.debtCard}>
      {/* Cabeçalho do Card: Nome e Categoria em estilo Badge */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeftInfo}>
          <Text style={styles.debtName} numberOfLines={1}>
            {name}
          </Text>

          {category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          )}
        </View>

        <View style={styles.headerRightActions}>
          {/* Botão de Lixeira */}
          <Modal
            title="Confirmação de exclusão"
            description={`Você deseja excluir ${name}?`}
            onConfirm={onDelete}
            variant="deleteButton"
          >
            <Host matchContents>
              <Icon name={trashIcon} size={16 * 1.4} color="#EF4444" />
            </Host>
          </Modal>
        </View>
      </View>

      {/* Linha divisória sutil */}
      <View style={styles.cardDivider} />

      {/* Rodapé do Card: Juros e Valor Total alinhados */}
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.label}>Taxa de Juros</Text>
          {interestPercentage ? (
            <Text style={styles.valuePrimary}>{interestPercentage}</Text>
          ) : (
            <Text style={styles.valueEmpty}>Vazio</Text>
          )}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.label}>Valor Total</Text>
          <Text style={styles.valuePrimary}>{formattedTotalValue}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  debtCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16, // Bordas bem arredondadas
    padding: 16,
    marginBottom: 12,
    // Sombras leves compatíveis com iOS e Android
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#dddddd", // Borda sutil minimalista
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeftInfo: {
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start",
  },
  debtName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
    marginRight: 8,
    marginLeft: 4,
  },
  categoryBadge: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3B82F6",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  valuePrimary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  valueEmpty: {
    fontSize: 14,
    fontWeight: "400",
    color: "#94A3B8",
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Espaçamento entre a badge e o ícone de lixeira
  },
});
