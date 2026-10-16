import { TextInput as ExpoUITextInput, TextInputProps } from "@expo/ui";
import { StyleSheet } from "react-native";

export function TextInput({ ...rest }: TextInputProps) {
  return (
    <ExpoUITextInput
      {...rest}
      placeholderTextColor="#999898"
      style={{ ...styles.textInput, ...rest.style }}
      textStyle={{ color: "#000" }}
    />
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
