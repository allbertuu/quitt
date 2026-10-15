import { DebtItem } from "@/components/debt-item";
import { Text as CustomText } from "@/components/ui/text";
import { useDebts } from "@/hooks/use-debts";
import { Host, Text } from "@expo/ui";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

export function DebtsList() {
  const { debts, isPending, error, deleteDebtMutation, refetch } = useDebts();
  const colorScheme = useColorScheme();

  if (isPending) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#23ad99" />
      </View>
    );
  }

  if (error) {
    const errorMessage = `Erro ao buscar todas as dívidas: \n | ${error}`;

    return (
      <Host matchContents>
        <Text
          textStyle={{
            color: colorScheme === "dark" ? "#000000" : "#FFF",
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
          }}
          style={{ paddingHorizontal: 16 }}
        >
          {errorMessage}
        </Text>
      </Host>
    );
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
      ListEmptyComponent={<CustomText>Não há dívidas cadastradas.</CustomText>}
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
