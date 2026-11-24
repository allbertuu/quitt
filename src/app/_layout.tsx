import { QueryClientProvider } from "@/infra/react-query/client";
import { Stack } from "expo-router";
import "../styles/globals.css";

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
