import { AddDebtBottomSheet } from "@/components/add-debt-bottom-sheet";
import { DebtsList } from "@/components/debts-list";
import { Button } from "@/components/ui/button";
import { Column, Host, Row, Spacer, Text } from "@expo/ui";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar animated={true} barStyle="dark-content" />
        {/* Cabeçalho da Tela */}
        <Host matchContents style={styles.headerViewContainer}>
          <Column spacing={16 * 0.3} style={styles.headerContainer}>
            <Text textStyle={styles.screenTitle}>Minhas Dívidas</Text>
            <Text textStyle={styles.screenSubtitle}>
              Acompanhe seus compromissos financeiros
            </Text>
          </Column>
        </Host>

        <Host
          matchContents={{ vertical: true }}
          style={styles.actionsViewContainer}
        >
          <Row style={styles.actionsContainer}>
            <AddDebtBottomSheet />
            <Spacer flexible />
            <Button label="Filtros" disabled />
          </Row>
        </Host>

        <DebtsList />
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
  },
  headerViewContainer: {
    marginBottom: 16,
  },
  actionsViewContainer: {
    marginBottom: 16,
  },
  actionsContainer: {
    paddingHorizontal: 20,
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


