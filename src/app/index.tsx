import { AddDebtButton } from "@/components/add-debt-button";
import { ProgressHeader } from "@/components/progress-header";
import { UserDebtsList } from "@/components/user-debts-list";
import { UserDebtsProvider } from "@/contexts/user-debts";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-100 dark:bg-zinc-900 px-8 pb-2 pt-8">
      <StatusBar animated={true} barStyle="default" />

      <View className="flex-row gap-2 w-full justify-center mb-8">
        <Text className="text-2xl text-emerald-700 dark:text-emerald-600 italic font-bold">
          Quitt
        </Text>
        <View className="h-full w-[1px] bg-emerald-800 rotate-12" />
        <Text className="text-lg text-muted-foreground dark:text-white/70">
          Apenas uma <Text className="font-semibold">questão de tempo</Text>.
        </Text>
      </View>

      <ProgressHeader totalPaid={3847} totalInitialDebt={9400} />

      <UserDebtsProvider>
        <UserDebtsList />
      </UserDebtsProvider>

      <AddDebtButton />
    </SafeAreaView>
  );
}
