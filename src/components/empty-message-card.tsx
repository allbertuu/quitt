import { trophyIcon } from "@/components/icons";
import { Host, Icon } from "@expo/ui";
import { Text, View } from "react-native";

export function EmptyMessageCard() {
  return (
    <View className="p-4 flex flex-row gap-2 items-center bg-card dark:bg-neutral-800 border rounded-md border-gray-300 dark:border-gray-950 ">
      <Host matchContents>
        <Icon name={trophyIcon} size={54} color="rgb(138 148 122)" />
      </Host>

      <View className="flex-1">
        <Text className="text-foreground dark:text-white/80">
          <Text className="font-bold">Parabéns!</Text> Onde há determinação, o
          caminho pode ser encontrado.{" "}
          <Text className="font-bold">Mantenha-se assim</Text>.
        </Text>
      </View>
    </View>
  );
}
