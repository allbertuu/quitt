import { moreIcon, trashIcon, trophyIcon } from "@/components/icons";
import { Modal } from "@/components/ui/modal";
import { useUserDebts } from "@/hooks/use-user-debts";
import { formatCurrency } from "@/utils/format-currency";
import { formatPercentage } from "@/utils/format-percentage";
import { Host, Icon } from "@expo/ui";
import { cn } from "cn";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ErrorModal } from "./ui/error-modal";

interface UserDebtItemProps {
  id: number;
  name: string;
  category: string | null;
  interest: number | null;
  totalValue: number;
  isRefreshing: boolean;
  isFirstItem: boolean;
  isPaid: boolean;
}

export function UserDebtItem({
  id,
  name,
  category,
  interest,
  totalValue,
  isRefreshing,
  isFirstItem,
  isPaid,
}: UserDebtItemProps) {
  const interestPercentage = formatPercentage(interest);
  const formattedTotalValue = formatCurrency(totalValue);

  return (
    <View
      className={cn(
        "bg-white dark:bg-zinc-800 border border-border dark:border-zinc-800 rounded-3xl py-4 px-6 pr-3 mb-4",
        !isFirstItem && "py-3 px-5 pr-2 mb-2 mx-2",
        isRefreshing ? "opacity-60" : "",
        isPaid ? "opacity-60" : "",
      )}
      // style={{
      //   opacity: isRefreshing || isPaid ? 0.6 : 1,
      // }}
      pointerEvents={isRefreshing ? "none" : "auto"}
    >
      {isFirstItem && (
        <View className="bg-emerald-600 dark:bg-emerald-700 rounded-full -mt-6 self-start px-2 mb-1">
          <Text className="text-white font-semibold dark:text-white/90">
            Prioridade
          </Text>
        </View>
      )}

      <View className="flex-row justify-between">
        <View className={cn("flex-col gap-1", !isFirstItem && "gap-0")}>
          <Text
            className={cn(
              "text-lg text-card-foreground dark:text-white/80 font-bold",
              !isFirstItem && "text-base font-medium",
            )}
            numberOfLines={1}
          >
            {name}
          </Text>

          <View className="flex-row gap-2 items-center">
            <Text
              className={cn(
                "text-xl font-bold text-foreground dark:text-white/80",
                !isFirstItem && "text-lg",
              )}
            >
              {formattedTotalValue}
            </Text>

            <View className="bg-muted dark:bg-white/10 rounded-xl px-2">
              <Text
                className={cn(
                  "text-muted-foreground dark:text-white/70",
                  !isFirstItem && "text-sm",
                )}
              >
                {interestPercentage} a.m.
              </Text>
            </View>
          </View>

          {category && (
            <View className="bg-zinc-500 dark:bg-zinc-700 rounded-xl px-2 self-start mt-1.5">
              <Text
                className={cn(
                  "text-zinc-100 dark:text-zinc-300 text-sm",
                  !isFirstItem && "text-xs",
                )}
              >
                {category}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row gap-2 self-center items-center pr-2">
          <MoreActionsDropdown>
            <DeleteAction debtId={id} debtName={name} />
          </MoreActionsDropdown>

          <PayAction debtName={name} debtIsPaid={isPaid} debtId={id} />
        </View>
      </View>
    </View>
  );
}

function MoreActionsDropdown({ children }: { children: React.ReactNode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View className="relative">
      {isDropdownOpen && (
        <View className="bg-white dark:bg-zinc-800 border border-border dark:border-zinc-800 rounded-2xl p-2 absolute -left-1 top-8 z-10">
          {children}
        </View>
      )}

      <TouchableOpacity
        onPress={() => setIsDropdownOpen((prev) => !prev)}
        className="p-1 rounded-md"
        // Aumenta a área de toque
        hitSlop={16}
      >
        <Host matchContents>
          <Icon name={moreIcon} size={16 * 1.4} />
        </Host>
      </TouchableOpacity>
    </View>
  );
}

interface DeleteActionProps {
  debtName: string;
  debtId: number;
}

function DeleteAction({ debtId, debtName }: DeleteActionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { deleteDebt } = useUserDebts();
  const apiError = deleteDebt.error;

  function handleConfirmDelete() {
    deleteDebt.mutate(debtId, {
      onError: () => {
        setIsErrorModalOpen(true);
      },
    });
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirmação de exclusão"
        description={`Você deseja excluir "${debtName}"?`}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
      />

      <ErrorModal
        errorMessage={apiError?.message}
        isPossibleTryAgain
        onTryAgain={handleConfirmDelete}
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />

      <TouchableOpacity onPress={() => setIsModalOpen(true)} hitSlop={10}>
        <Host matchContents>
          <Icon name={trashIcon} size={16 * 1.4} color="#FF2C2C" />
        </Host>
      </TouchableOpacity>
    </>
  );
}

interface PayActionProps {
  debtId: number;
  debtName: string;
  debtIsPaid: boolean;
}

function PayAction({ debtId, debtName, debtIsPaid }: PayActionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { updateDebt } = useUserDebts();

  function handleConfirmPay() {
    updateDebt.mutate(
      { id: debtId, payload: { is_paid: !debtIsPaid } },
      {
        onError: (e) => {
          setIsErrorModalOpen(true);
          setError(e.message);
        },
      },
    );
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          debtIsPaid
            ? "Desejo de desfazer o pagamento"
            : "Confirmação de pagamento"
        }
        description={
          debtIsPaid
            ? "Deseja desfazer o status de pago?"
            : `Você realmente já pagou "${debtName}"?`
        }
        confirmText={debtIsPaid ? "Sim, desfazer" : "Sim, paguei"}
        confirmButtonVariant={debtIsPaid ? "destructive" : "success"}
        cancelText="Cancelar"
        onConfirm={handleConfirmPay}
      />

      <ErrorModal
        errorMessage={error}
        isPossibleTryAgain
        onTryAgain={handleConfirmPay}
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />

      <TouchableOpacity
        onPress={() => setIsModalOpen(true)}
        className={cn(
          "p-1 rounded-md bg-emerald-50",
          debtIsPaid && "bg-slate-50",
        )}
        hitSlop={16}
      >
        <Host matchContents>
          <Icon name={trophyIcon} size={16 * 1.8} color="#047857" />
        </Host>
      </TouchableOpacity>
    </>
  );
}
