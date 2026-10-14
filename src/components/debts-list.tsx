import { DebtItem } from "@/components/debt-item";
import { MockListDebtsController } from "@/controllers/mock-list-debts-controller";
import { Debt } from "@/entities/debt";
import { Host, Text } from "@expo/ui";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Text as CustomText } from "@/components/ui/text";

async function fetchAllDebts() {
  const db = new MockListDebtsController();
  return db.getAllDebts();
}

export function DebtsList() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const getDebts = async () => {
      try {
        const debts = await fetchAllDebts();
        setDebts(debts);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          return;
        }
        setError(String(e));
      } finally {
        setIsPending(false);
      }
    };

    getDebts();
  }, []);

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
        />
      )}
      keyExtractor={(debt) => debt.name}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<CustomText>Não há dívidas cadastradas.</CustomText>}
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
