import {
  Column,
  Picker as ExpoUIPicker,
  PickerProps as ExpoUIPickerProps,
  Text,
} from "@expo/ui";

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
      <Text textStyle={{ color: "#141414" }}>{label}</Text>

      <ExpoUIPicker {...rest}>
        {options.map((category) => (
          <ExpoUIPicker.Item
            key={category.value}
            label={category.label}
            value={category.value}
          />
        ))}
      </ExpoUIPicker>

      <Text textStyle={{ color: "#8b2525" }}>{errorMessage}</Text>
    </Column>
  );
}
