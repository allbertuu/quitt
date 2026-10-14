// import { AddDebtBottomSheet } from "@/components/add-debt-bottom-sheet";
import { DebtsList } from "@/components/debts-list";
import { Text } from "@/components/ui/text";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Cabeçalho da Tela */}
        <View style={styles.headerContainer}>
          <Text style={styles.screenTitle}>Minhas Dívidas</Text>
          <Text style={styles.screenSubtitle}>
            Acompanhe seus compromissos financeiros
          </Text>
        </View>

        {/* Lista de Dívidas */}
        <DebtsList />

        {/* <AddDebtBottomSheet /> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Fundo leve e moderno
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
});

