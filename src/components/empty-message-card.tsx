import { searchOffIcon } from "@/components/icons";
import { Host, Icon } from "@expo/ui";
import { Text, View } from "react-native";

export function EmptyMessageCard() {
  return (
    <View className="p-4 flex flex-row gap-2 items-center bg-card dark:bg-neutral-800 border rounded-md border-gray-300 dark:border-gray-950 ">
      <Host matchContents>
        <Icon name={searchOffIcon} size={40} color="#10b981" />
      </Host>

      <View className="flex-1">
        <Text className="text-foreground dark:text-white/80">
          Não há dívidas cadastradas.
        </Text>
      </View>
    </View>
  );
}
