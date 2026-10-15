import { QueryClientProvider } from "@/infra/react-query-client";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider>
        <Stack />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

