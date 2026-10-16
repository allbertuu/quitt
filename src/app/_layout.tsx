import { QueryClientProvider } from "@/infra/react-query-client";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <QueryClientProvider>
      <Stack />
    </QueryClientProvider>
  );
}

