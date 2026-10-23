import { AddDebtButton } from "@/components/add-debt-button";
import { DebtsList } from "@/components/debts-list";
import { formatCurrency } from "@/utils/format-currency";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <>
      <SafeAreaView className="flex-1 bg-background dark:bg-foreground">
        <StatusBar animated={true} barStyle="dark-content" />

        <View className="mb-6 px-8">
          <Text className="text-base text-muted-foreground dark:text-white/60">
            Total em dívidas
          </Text>

          <Text className="text-3xl text-foreground dark:text-white/80 font-bold my-2">
            {formatCurrency(18450.05)}
          </Text>

          <Text className="text-lg text-muted-foreground dark:text-white/80">
            Acompanhe tudo em um só lugar
          </Text>
        </View>

        <View className="flex flex-row justify-between px-8 mb-2">
          <Text className="text-lg font-bold text-foreground dark:text-white/80">
            Suas dívidas
          </Text>

          <Text className="text-muted-foreground text-base dark:text-white/60">
            4 registros
          </Text>
        </View>

        <DebtsList />

        <AddDebtButton />
      </SafeAreaView>
    </>
  );
}
