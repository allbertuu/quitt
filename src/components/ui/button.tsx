import {
  Button as ExpoUIButton,
  ButtonProps as ExpoUIButtonProps,
} from "@expo/ui";
import { StyleSheet } from "react-native";

type ButtonProps = ExpoUIButtonProps;

export function Button({ ...rest }: ButtonProps) {
  return <ExpoUIButton {...rest} style={{ ...styles.button, ...rest.style }} />;
}

const styles = StyleSheet.create({
  button: {},
});
