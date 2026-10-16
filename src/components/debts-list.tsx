import { DebtItem } from "@/components/debt-item";
import { MockDebtsController } from "@/controllers/mock-debts-controller";
import { useDebts } from "@/hooks/use-debts";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ErrorMessageCard } from "./error-message-card";
import { SuccessMessageCard } from "./success-message-card";

export function DebtsList() {
  const mockDebtsController = new MockDebtsController();
  const { debts, isPending, error, deleteDebtMutation, refetch } = useDebts({
    debtsController: mockDebtsController,
  });

  if (isPending) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#23ad99" />
      </View>
    );
  }

  if (error) {
    return <ErrorMessageCard>{error}</ErrorMessageCard>;
  }

  return (
    <FlatList
      data={debts}
      renderItem={({ item: debt }) => (
        <DebtItem
          name={debt.name}
          category={debt.category}
          interest={debt.interest}
          totalValue={debt.total_value}
          onDelete={() => deleteDebtMutation.mutate(debt.id)}
        />
      )}
      keyExtractor={(debt) => debt.name}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<SuccessMessageCard />}
      onRefresh={() => {
        refetch();
      }}
      refreshing={deleteDebtMutation.isPending}
      extraData={debts}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  loaderContainer: {
    marginHorizontal: "auto",
    paddingTop: 16 * 4,
  },
});
