import {
  Column,
  Picker as ExpoUIPicker,
  PickerProps as ExpoUIPickerProps,
} from "@expo/ui";
import { Text } from "react-native";

interface Option {
  label: string;
  value: string | number;
}

type PickerProps = ExpoUIPickerProps & {
  errorMessage?: string;
  label: string;
  options: Option[];
};

export function Picker({ errorMessage, label, options, ...rest }: PickerProps) {
  return (
    <Column spacing={4}>
      <Text className="text-foreground dark:text-white/80 text-lg">
        {label}
      </Text>

      <ExpoUIPicker {...rest}>
        {options.map((category) => (
          <ExpoUIPicker.Item
            key={category.value}
            label={category.label}
            value={category.value}
          />
        ))}
      </ExpoUIPicker>

      <Text className="text-destructive">{errorMessage}</Text>
    </Column>
  );
}
