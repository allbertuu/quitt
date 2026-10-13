import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "../components/text";

interface Debt {
  name: string;
  category: string;
  interest: number;
  totalValue: number;
}

const debts: Debt[] = [
  {
    name: "Cartão Nubank",
    category: "Cartão de crédito",
    interest: 0.161,
    totalValue: 1522.02,
  },
  {
    name: "Cartão Inter",
    category: "Cartão de crédito",
    interest: 0.179,
    totalValue: 3497.09,
  },
  {
    name: "Cartão Riachuelo",
    category: "Cartão de crédito",
    interest: 0.1999,
    totalValue: 143.91,
  },
  {
    name: "Empréstimo Mercado Livre",
    category: "Empréstimo pessoal",
    interest: 0.01,
    totalValue: 12.99,
  },
];

function DebtItem({ name, category, interest, totalValue }: Debt) {
  const interestPercentage = (interest * 100).toFixed(2) + "%";
  const formattedTotalValue = `R$ ${totalValue.toFixed(2)}`;

  return (
    <View style={styles.debtCard}>
      {/* Cabeçalho do Card: Nome e Categoria em estilo Badge */}
      <View style={styles.cardHeader}>
        <Text style={styles.debtName}>{name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      {/* Linha divisória sutil */}
      <View style={styles.cardDivider} />

      {/* Rodapé do Card: Juros e Valor Total alinhados */}
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.label}>Taxa de Juros</Text>
          <Text style={styles.valuePrimary}>{interestPercentage}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.label}>Valor Total</Text>
          <Text style={styles.valuePrimary}>{formattedTotalValue}</Text>
        </View>
      </View>
    </View>
  );
}

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho da Tela */}
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>Minhas Dívidas</Text>
        <Text style={styles.screenSubtitle}>
          Acompanhe seus compromissos financeiros
        </Text>
      </View>

      {/* Lista de Dívidas */}
      <FlatList
        data={debts}
        renderItem={({ item }) => (
          <DebtItem
            name={item.name}
            category={item.category}
            interest={item.interest}
            totalValue={item.totalValue}
          />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Fundo leve e moderno
    paddingTop: 24,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  screenSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  debtCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16, // Bordas bem arredondadas
    padding: 16,
    marginBottom: 12,
    // Sombras leves compatíveis com iOS e Android
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9", // Borda sutil minimalista
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  debtName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    flex: 1,
    marginRight: 8,
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
});



