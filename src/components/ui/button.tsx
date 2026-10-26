import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  label: string;
  size?: "sm" | "md" | "lg";
  labelStyle?: string;
};

export function Button({
  size = "md",
  label,
  labelStyle = "",
  ...rest
}: ButtonProps) {
  const sizes = {
    sm: "py-1",
    md: "py-3",
    lg: "py-4",
  };

  return (
    <TouchableOpacity
      {...rest}
      className={`flex-1 rounded-lg items-center justify-center ${sizes[size]} ${rest.className}`}
    >
      <Text className={`font-semibold text-base ${labelStyle}`}>{label}</Text>
    </TouchableOpacity>
  );
}
