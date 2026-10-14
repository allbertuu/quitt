// import "expo-sqlite/localStorage/install";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    /**
     * permite persistir a sessão do usuário no armazenamento local do dispositivo,
     * mesmo após o aplicativo ser fechado ou reiniciado
     */
    // storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    // "false" porquê Android e iOS não tem uma URL para ler a sessão
    detectSessionInUrl: false,
  },
});
