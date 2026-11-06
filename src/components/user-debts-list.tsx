import { EmptyMessageCard } from "@/components/empty-message-card";
import { ErrorMessageCard } from "@/components/error-message-card";
import { UserDebtItem } from "@/components/user-debt-item";
import { Debt } from "@/domain/debt";
import { useUserDebts } from "@/hooks/use-user-debts";
import { Host, Icon } from "@expo/ui";
import { cn } from "cn";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { sortIcon } from "./icons";
import { Button } from "./ui/button";

type SortableDebtOptions = keyof Pick<Debt, "interest" | "total_value">;

export function UserDebtsList() {
  const {
    debts,
    isPending,
    error,
    deleteDebtMutation,
    createDebtMutation,
    refetch,
  } = useUserDebts();

  const isMutating =
    deleteDebtMutation.isPending || createDebtMutation.isPending;

  const [sortBy, setSortBy] = useState<SortableDebtOptions>("interest");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedData = useMemo(() => {
    return [...debts].sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      // 1. Verifica se ambos são nulos (mantém a posição relativa)
      if (valueA == null && valueB == null) return 0;

      // 2. Se apenas o A for nulo, joga o A para o final
      if (valueA == null) return 1;

      // 3. Se apenas o B for nulo, joga o B para o final
      if (valueB == null) return -1;

      // 4. Lógica normal para valores válidos
      if (sortOrder === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  }, [debts, sortBy, sortOrder]);

  if (isPending) {
    return (
      <View className="mx-auto pt-16">
        <ActivityIndicator size="large" color="#23ad99" />
      </View>
    );
  }

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
          {debts.length} restante{debts.length > 1 && "s"}
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
            isRefreshing={isMutating}
            isFirstItem={index === 0}
          />
        )}
        keyExtractor={(debt) => String(debt.id)}
        contentContainerClassName="pb-6 pt-2"
        ListEmptyComponent={<EmptyMessageCard />}
        onRefresh={() => {
          refetch();
        }}
        refreshing={isMutating}
        extraData={debts}
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
