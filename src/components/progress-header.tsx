import { formatCurrency } from "@/utils/format-currency";
import { Text, View } from "react-native";

interface ProgressHeaderProps {
  /** Valor total de todas as dívidas somadas no início (montante original) */
  totalInitialDebt: number;
  /** Valor total que já foi pago/concluído */
  totalPaid: number;
  /** Valor da última dívida paga (para exibir o badge de delta). Opcional. */
  recentPaymentDelta?: number;
  onSettingsPress?: () => void;
}

export function ProgressHeader({
  totalInitialDebt,
  totalPaid,
  recentPaymentDelta,
  onSettingsPress,
}: ProgressHeaderProps) {
  // Cálculos de progresso
  const remainingDebt = Math.max(0, totalInitialDebt - totalPaid);
  const progressPercentage =
    totalInitialDebt > 0
      ? Math.min(100, (totalPaid / totalInitialDebt) * 100)
      : 0;

  // const totalDebtsValue = useMemo(() => {
  //   return debts.reduce(
  //     (acc, debt) => acc + (Number(debt.total_value) || 0),
  //     0,
  //   );
  // }, [debts]);

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
              // Se usar Reanimated depois, pode animar essa propriedade 'width'
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </View>
        </View>

        {/* Métricas de Valores (Duas Colunas) */}
        <View className="flex-row justify-between items-end mt-1">
          {/* Esquerda: Conquista (Verde) */}
          <View>
            <Text className="text-sm text-muted-foreground dark:text-white/60 mb-1">
              Já quitado
            </Text>
            <Text className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(totalPaid)}
            </Text>
          </View>

          {/* Direita: Restante (Neutro) */}
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

      {/* Badge de Delta Temporário (Exibe apenas se houver um pagamento recente) */}
      {/* O ideal é envolver isso num componente do Reanimated/Moti para fazer o FadeInDown / FadeOutUp */}
      {recentPaymentDelta ? (
        <View className="self-center mt-[-12px] bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 rounded-full z-10 shadow-sm flex-row items-center">
          <Text className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            🎉 - {formatCurrency(recentPaymentDelta)} abatidos!
          </Text>
        </View>
      ) : null}
    </View>
  );
}
