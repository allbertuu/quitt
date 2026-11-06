import { errorIcon } from "@/components/icons";
import { Host, Icon } from "@expo/ui";
import { Text, TouchableOpacity, View } from "react-native";

export function ErrorMessageCard({
  children,
  onTryAgain,
}: {
  children: React.ReactNode;
  onTryAgain: () => void;
}) {
  return (
    <View className="p-4 w-full flex-row gap-4 items-center bg-card dark:bg-neutral-800 border rounded-md border-gray-300 dark:border-gray-950">
      <Host matchContents>
        <Icon name={errorIcon} size={42} color="#EF4444" />
      </Host>

      <View className="flex-1 flex-col">
        <Text className="text-foreground dark:text-white/80 font-semibold text-lg">
          Oops!
        </Text>

        <Text>{children}</Text>

        <TouchableOpacity
          className="px-3 py-2 bg-accent dark:bg-accent/40 rounded-md mt-2"
          onPress={onTryAgain}
        >
          <Text className="text-accent-foreground dark:text-accent-foreground/80">
            Tentar novamente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
