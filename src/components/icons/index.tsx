import { Icon } from "@expo/ui";

export const sadIcon = Icon.select({
  ios: "die.face.1.fill",
  android: import("@expo/material-symbols/sentiment_dissatisfied.xml"),
});

export const trashIcon = Icon.select({
  ios: "trash.fill",
  android: import("@expo/material-symbols/delete.xml"),
});

export const trophyIcon = Icon.select({
  ios: "trophy.fill",
  android: import("@expo/material-symbols/trophy.xml"),
});

export const errorIcon = Icon.select({
  ios: "warninglight.fill",
  android: import("@expo/material-symbols/error.xml"),
});

export const addIcon = Icon.select({
  ios: "plus.circle.fill",
  android: import("@expo/material-symbols/add.xml"),
});

export const sortIcon = Icon.select({
  ios: "arrow.down",
  android: import("@expo/material-symbols/sort.xml"),
});

export const moreIcon = Icon.select({
  ios: "dots.and.line.vertical.and.pointer.arrow.rectangle",
  android: import("@expo/material-symbols/more_vert.xml"),
});

export const searchOffIcon = Icon.select({
  ios: "location.circle.fill",
  android: import("@expo/material-symbols/search_off.xml"),
});
