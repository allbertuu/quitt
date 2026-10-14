import { DebtItem } from "@/components/debt-item";
import { SupabaseListDebtsController } from "@/controllers/supabase-list-debts-controller";
import { Debt } from "@/entities/debt";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

async function fetchAllDebts() {
  const db = new SupabaseListDebtsController();
  return db.getAllDebts();
}

export function DebtsList() {
  const [debts, setDebts] = useState<Debt[]>([]);

  useEffect(() => {
    const getDebts = async () => {
      try {
        const debts = await fetchAllDebts();
        setDebts(debts);
      } catch (error) {
        console.error("Erro ao buscar dívidas: ", error);
      }
    };

    getDebts();
  }, []);

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
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
