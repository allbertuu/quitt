import { Debt } from "@/application/ports/debt-repository";
import { EmptyMessageCard } from "@/presentation/components/empty-message-card";
import { ErrorMessageCard } from "@/presentation/components/error-message-card";
import { UserDebtItem } from "@/presentation/components/user-debt-item";
import { useUserDebts } from "@/presentation/hooks/use-user-debts";
import { Host, Icon } from "@expo/ui";
import { cn } from "cn";
import { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { sortIcon } from "./icons";
import { Button } from "./ui/button";

type SortableDebtOptions = keyof Pick<Debt, "interest" | "total_value">;

export function UserDebtsList() {
  const { debts, isPending, error, refetch } = useUserDebts();

  const [sortBy, setSortBy] = useState<SortableDebtOptions>("interest");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedData = useMemo(() => {
    return [...debts].sort((a, b) => {
      // 1. Prioriza dívidas não pagas (is_paid === false vem antes de true)
      const isPaidA = a.is_paid;
      const isPaidB = b.is_paid;

      if (isPaidA !== isPaidB) {
        return isPaidA ? 1 : -1;
      }

      const valueA = a[sortBy];
      const valueB = b[sortBy];

      // 2. Dentro do mesmo grupo (pagas ou não pagas), joga valores nulos para o final
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // 3. Ordenação normal pelo critério escolhido
      if (sortOrder === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  }, [debts, sortBy, sortOrder]);

  const numberOfDebtsPaid = debts.filter((debt) => !debt.is_paid).length;

  if (error) {
    return <ErrorMessageCard onTryAgain={refetch}>{error}</ErrorMessageCard>;
  }

  return (
    <>
      <View className="flex flex-row justify-between mb-2">
        <Text className="text-lg font-bold text-foreground dark:text-white/80">
          Suas dívidas
        </Text>

        <Text className="text-muted-foreground text-base dark:text-white/60">
          {numberOfDebtsPaid} restante
          {numberOfDebtsPaid > 1 && "s"}
        </Text>
      </View>

      <View className="my-2">
        <Text className="text-base text-muted-foreground dark:text-white/60 mb-2">
          Minha estratégia:
        </Text>

        <View className="flex-row gap-2 items-center mb-3">
          <SortButton
            label="Avalanche (juros)"
            targetSortBy="interest"
            currentSortBy={sortBy}
            onPress={() => {
              setSortOrder("desc");
              setSortBy("interest");
            }}
          />

          <SortButton
            label="Bola de neve (total)"
            targetSortBy="total_value"
            currentSortBy={sortBy}
            onPress={() => {
              setSortOrder("asc");
              setSortBy("total_value");
            }}
          />

          {/* Botão de Direção */}
          <TouchableOpacity hitSlop={16} onPress={toggleSortOrder}>
            <Host matchContents>
              <Icon name={sortIcon} color="#959595" />
            </Host>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sortedData}
        renderItem={({ item: debt, index }) => (
          <UserDebtItem
            id={debt.id}
            name={debt.name}
            category={debt.category}
            interest={debt.interest}
            totalValue={debt.total_value}
            isPaid={debt.is_paid}
            isRefreshing={isPending}
            isFirstItem={index === 0}
          />
        )}
        keyExtractor={(debt) => String(debt.id)}
        contentContainerClassName="pb-6 pt-2"
        ListEmptyComponent={<EmptyMessageCard />}
        onRefresh={() => {
          refetch();
        }}
        refreshing={isPending}
        initialNumToRender={6}
      />
    </>
  );
}

interface SortButtonProps {
  label: string;
  currentSortBy: SortableDebtOptions;
  targetSortBy: SortableDebtOptions;
  onPress: () => void;
}

function SortButton({
  label,
  currentSortBy,
  targetSortBy,
  onPress,
}: SortButtonProps) {
  return (
    <Button
      className={cn(
        "border border-secondary-foreground/30 dark:border-secondary/30",
        currentSortBy === targetSortBy ? "bg-emerald-600" : "bg-transparent",
      )}
      labelStyle={
        currentSortBy === targetSortBy
          ? "text-white"
          : "text-zinc-950 dark:text-white/70"
      }
      onPress={onPress}
      label={label}
      size="sm"
    />
  );
}
