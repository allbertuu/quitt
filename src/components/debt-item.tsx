import { Debt } from "@/entities/debt";
import { formatCurrency } from "@/utils/format-currency";
import { formatPercentage } from "@/utils/format-percentage";
import { Host, Icon } from "@expo/ui";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { trashIcon } from "./icons";
import { Modal } from "./ui/modal";

type DebtItemProps = {
  name: Debt["name"];
  category: Debt["category"];
  interest: Debt["interest"];
  totalValue: Debt["total_value"];
  onDelete: () => void;
  isRefreshing: boolean;
};

export function DebtItem({
  name,
  category,
  interest,
  totalValue,
  onDelete,
  isRefreshing,
}: DebtItemProps) {
  const interestPercentage = formatPercentage(interest);
  const formattedTotalValue = formatCurrency(totalValue);

  return (
    <View
      className="bg-card dark:bg-neutral-800 border border-gray-300 dark:border-gray-950 rounded-3xl p-6 mb-4"
      style={{
        opacity: isRefreshing ? 0.6 : 1,
      }}
      pointerEvents={isRefreshing ? "none" : "auto"}
    >
      {/* Cabeçalho do Card: Nome e Categoria em estilo Badge */}
      <View className="flex flex-row justify-between">
        <View className="flex flex-col gap-1">
          <Text
            className="text-card-foreground dark:text-white/80 font-medium text-lg"
            numberOfLines={1}
          >
            {name}
          </Text>

          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-bold text-foreground dark:text-white/80">
              {formattedTotalValue}
            </Text>
            <View className="bg-muted dark:bg-white/10 rounded-xl px-2">
              <Text className="text-muted-foreground dark:text-white/70">
                {interestPercentage} a.m.
              </Text>
            </View>
          </View>

          {category && (
            <View className="bg-accent dark:bg-accent/30 rounded-xl px-2 self-start">
              <Text className="text-accent-foreground dark:text-accent-foreground/60 text-sm">
                {category}
              </Text>
            </View>
          )}
        </View>

        <DeleteAction onDelete={onDelete} debtName={name} />
      </View>
    </View>
  );
}

interface DeleteActionProps {
  onDelete: () => void;
  debtName: string;
}

function DeleteAction({ onDelete, debtName }: DeleteActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmação de exclusão"
        description={`Você deseja excluir ${debtName}?`}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={onDelete}
      />

      <Pressable
        onPress={() => setIsOpen(true)}
        className="bg-[#FEF2F2] dark:bg-[#FEF2F2]/10 p-1 self-start rounded-md"
        style={({ pressed }) => [pressed && { opacity: 0.6 }]}
        // Aumenta a área de toque
        hitSlop={16}
      >
        <Host matchContents>
          <Icon name={trashIcon} size={16 * 1.4} color="#EF4444" />
        </Host>
      </Pressable>
    </>
  );
}
