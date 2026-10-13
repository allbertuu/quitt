import { Text as NativeText, StyleSheet } from "react-native";

interface TextProps {
  type?: "default" | "smallBold" | "subtitle";
  children: React.ReactNode;
  style?: object;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
  smallBold: {
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export function Text({ type = "default", children, style }: TextProps) {
  const textStyle = [styles[type], style];

  return <NativeText style={textStyle}>{children}</NativeText>;
}
