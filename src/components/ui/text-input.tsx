import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from "react-native";
import colors from "tailwindcss/colors";

type TextInputProps = RNTextInputProps & {
  label: string;
  errorMessage?: string;
  helperText?: string;
};

export function TextInput({
  errorMessage,
  label,
  helperText,
  ...rest
}: TextInputProps) {
  return (
    <View className="flex flex-col gap-1">
      <Text className="text-lg text-foreground dark:text-white/80">
        {label}
      </Text>

      <RNTextInput
        {...rest}
        placeholderTextColor={colors.gray[400]}
        className="bg-input dark:bg-foreground text-foreground dark:text-white/80 p-4 border border-gray-400 rounded-lg"
      />

      {helperText && (
        <Text className="text-muted-foreground dark:text-white/60">
          {helperText}
        </Text>
      )}

      <Text className="text-destructive">{errorMessage}</Text>
    </View>
  );
}