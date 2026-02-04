import {
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียดร้าน",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#695740" },
          headerTitleStyle: { color: "#fff", fontFamily: "Kanit_400Regular" },
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Top 10 Bangkok Coffee Shops",
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#6c512f" },
          headerTitleStyle: { color: "#fff", fontFamily: "Kanit_400Regular" },
        }}
      />
    </Stack>
  );
}
