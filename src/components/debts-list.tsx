import { DebtItem } from "@/components/debt-item";
import { useDebts } from "@/hooks/use-debts";
import { MockDebtsUseCase } from "@/usecases/mock-debts-use-case";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { EmptyMessageCard } from "./empty-message-card";
import { ErrorMessageCard } from "./error-message-card";

export function DebtsList() {
  const mockDebtsUseCase = new MockDebtsUseCase();
  // const supabaseDebtsUseCase = new SupabaseDebtsUseCase();
  const {
    debts,
    isPending,
    error,
    deleteDebtMutation,
    createDebtMutation,
    refetch,
  } = useDebts({
    debtsUseCase: mockDebtsUseCase,
  });

  const isMutating =
    deleteDebtMutation.isPending || createDebtMutation.isPending;

  if (isPending) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#23ad99" />
      </View>
    );
  }

  if (error) {
    return <ErrorMessageCard onTryAgain={refetch}>{error}</ErrorMessageCard>;
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
          isRefreshing={isMutating}
        />
      )}
      keyExtractor={(debt) => String(debt.id)}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<EmptyMessageCard />}
      onRefresh={() => {
        refetch();
      }}
      refreshing={isMutating}
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
