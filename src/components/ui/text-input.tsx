import {
  Column,
  TextInput as ExpoUITextInput,
  TextInputProps as ExpoUITextInputProps,
  Text,
} from "@expo/ui";
import { StyleSheet } from "react-native";

type TextInputProps = ExpoUITextInputProps & {
  errorMessage?: string;
  label: string;
};

export function TextInput({ errorMessage, label, ...rest }: TextInputProps) {
  return (
    <Column spacing={4}>
      <Text textStyle={{ color: "#141414" }}>{label}</Text>

      <ExpoUITextInput
        {...rest}
        placeholderTextColor="#999898"
        style={{ ...styles.textInput, ...rest.style }}
        textStyle={{ color: "#000" }}
      />

      <Text textStyle={{ color: "#8b2525" }}>{errorMessage}</Text>
    </Column>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
  },
});
