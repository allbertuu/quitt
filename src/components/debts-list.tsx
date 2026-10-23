import { DebtItem } from "@/components/debt-item";
import { EmptyMessageCard } from "@/components/empty-message-card";
import { ErrorMessageCard } from "@/components/error-message-card";
import { useDebts } from "@/hooks/use-debts";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export function DebtsList() {
  const {
    debts,
    isPending,
    error,
    deleteDebtMutation,
    createDebtMutation,
    refetch,
  } = useDebts();

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
