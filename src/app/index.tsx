import { AddDebtButton } from "@/components/add-debt-button";
import { DebtsList } from "@/components/debts-list";
import { formatCurrency } from "@/utils/format-currency";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-foreground px-8">
      <StatusBar animated={true} barStyle="dark-content" />

      <View className="mb-6 mt-12">
        <Text className="text-base text-muted-foreground dark:text-white/60">
          Total em dívidas
        </Text>

        <Text className="text-3xl text-foreground dark:text-white/80 font-bold my-2">
          {formatCurrency(5186.51)}
        </Text>

        <Text className="text-lg text-muted-foreground dark:text-white/80">
          Acompanhe tudo em um só lugar
        </Text>
      </View>

      <DebtsList />

      <AddDebtButton />
    </SafeAreaView>
  );
}
