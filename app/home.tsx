import { CoffeeShop } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../services/supabase";

export default function Home() {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        setCoffeeShops(data);
      }
    };
    fetchCoffeeShops();
  }, []);

  // UI สำหรับแสดงรายชื่อร้านกาแฟ
  const renderShopItem = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            id: item.id,
            name: item.name,
            image_url: item.image_url,
            district: item.district,
            description: item.description,
            phone: item.phone,
            latitude: item.latitude,
            longitude: item.longitude,
          },
        })
      }
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
      <View style={{ flexDirection: "column", flex: 1 }}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.shopLocation}>📍 {item.district}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 15, flex: 1 }}>
      <FlatList
        data={coffeeShops}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderShopItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Kanit_700Bold",
  },
  shopLocation: {
    fontSize: 14,
    color: "#848484b7",
    fontFamily: "Kanit_400Regular",
  },
});
