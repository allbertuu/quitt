import { Host, Icon } from "@expo/ui";
import { Pressable, Text, View } from "react-native";
import { errorIcon } from "./icons";

export function ErrorMessageCard({
  children,
  onTryAgain,
}: {
  children: React.ReactNode;
  onTryAgain: () => void;
}) {
  return (
    <View className="mx-8 p-4 flex flex-row gap-4 items-center bg-card dark:bg-neutral-800 border rounded-md border-gray-300 dark:border-gray-950 ">
      <Host matchContents>
        <Icon name={errorIcon} size={42} color="#EF4444" />
      </Host>

      <View className="flex flex-1 flex-col gap-2">
        <Text className="text-foreground dark:text-white/80">
          Houve o seguinte erro: {children}
        </Text>

        <Pressable
          className="px-3 py-2 bg-accent dark:bg-accent/40 rounded-md"
          onPress={onTryAgain}
        >
          <Text className="text-accent-foreground dark:text-accent-foreground/80">
            Tentar novamente
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
