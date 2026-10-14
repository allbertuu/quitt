import { Icon } from "@expo/ui";

export const sadIcon = Icon.select({
  ios: "die.face.1.fill",
  android: import("@expo/material-symbols/sentiment_dissatisfied.xml"),
});
