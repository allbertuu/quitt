import { DebtItem } from "@/components/debt-item";
import { Text } from "@/components/ui/text";
import { DEBTS } from "@/services/db";
import { FlatList, StyleSheet, View } from "react-native";

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
        data={DEBTS}
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
});

