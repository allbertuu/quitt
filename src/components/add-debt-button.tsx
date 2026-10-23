import { AddDebtBottomSheet } from "@/components/add-debt-bottom-sheet";
import { addIcon } from "@/components/icons";
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
          className="p-4 bg-accent rounded-full"
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
        <AddDebtForm onSuccess={() => setBottomSheetOpen(false)} />
      </AddDebtBottomSheet>
    </>
  );
}
