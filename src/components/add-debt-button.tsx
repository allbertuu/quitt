import { AddDebtBottomSheet } from "@/components/add-debt-bottom-sheet";
import { addIcon } from "@/components/icons";
import { UserDebtsProvider } from "@/contexts/user-debts";
import { Host, Icon } from "@expo/ui";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { AddDebtForm } from "./add-debt-form";

export function AddDebtButton() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <>
      <View className="absolute bottom-safe-or-20 right-safe-or-3">
        <Pressable
          onPress={() => setBottomSheetOpen(true)}
          className="p-4 bg-emerald-600 dark:bg-emerald-700 rounded-full"
        >
          <Host matchContents>
            <Icon name={addIcon} color={"#FFF"} />
          </Host>
        </Pressable>
      </View>

      <AddDebtBottomSheet
        open={bottomSheetOpen}
        onClose={() => setBottomSheetOpen(false)}
      >
        <UserDebtsProvider>
          <AddDebtForm onSuccess={() => setBottomSheetOpen(false)} />
        </UserDebtsProvider>
      </AddDebtBottomSheet>
    </>
  );
}
