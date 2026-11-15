import { useUserDebts } from "@/hooks/use-user-debts";
import { formatCurrency } from "@/utils/format-currency";
import { useMemo } from "react";
import { Text, View } from "react-native";

export function ProgressHeader() {
  const { debts } = useUserDebts();

  const totalDebts = useMemo(() => {
    return debts.reduce(
      (acc, debt) => acc + (Number(debt.total_value) || 0),
      0,
    );
  }, [debts]);

  const totalDebtsPaid = useMemo(() => {
    return debts.reduce((acc, debt) => {
      return debt.is_paid ? acc + (Number(debt.total_value) || 0) : acc;
    }, 0);
  }, [debts]);

  const remainingDebt = Math.max(0, totalDebts - totalDebtsPaid);
  const progressPercentage =
    totalDebts > 0 ? Math.min(100, (totalDebtsPaid / totalDebts) * 100) : 0;

  return (
    <View className="mb-6">
      {/* Card Principal */}
      <View className="bg-card dark:bg-zinc-800 border border-border dark:border-zinc-800 rounded-3xl p-5">
        {/* Cabeçalho do Card */}
        <View className="flex-row justify-between mb-5">
          <Text className="text-lg font-bold text-foreground dark:text-white/90">
            Progresso Geral
          </Text>

          <View className="self-end">
            <Text className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {progressPercentage.toFixed(0)}% quitado
            </Text>
          </View>
        </View>

        {/* Barra de Progresso */}
        <View className="mb-2">
          <View className="h-3 w-full bg-secondary dark:bg-zinc-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </View>
        </View>

        {/* Métricas de Valores (Duas Colunas) */}
        <View className="flex-row justify-between items-end mt-1">
          <View>
            <Text className="text-sm text-muted-foreground dark:text-white/60 mb-1">
              Já quitado
            </Text>
            <Text className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(totalDebtsPaid)}
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-sm text-muted-foreground dark:text-white/60 mb-1">
              Ainda resta
            </Text>
            <Text className="text-xl font-bold text-foreground dark:text-white/90">
              {formatCurrency(remainingDebt)}
            </Text>
          </View>
        </View>
      </View>

      {/* <RecentPaymentDelta /> */}
    </View>
  );
}
