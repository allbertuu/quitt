import {
  focusManager,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    // sincroniza os dados quando de volta ao primeiro plano
    focusManager.setFocused(status === "active");
  }
}

AppState.addEventListener("change", onAppStateChange);

const queryClient = new QueryClient();

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
