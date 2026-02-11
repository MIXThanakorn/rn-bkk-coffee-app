import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  const handleOpenInMaps = () => {
    const latitude = parseFloat(params.latitude as string);
    const longitude = parseFloat(params.longitude as string);
    const googleMapurl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const appleMapurl = `https://maps.apple.com/?q=${latitude},${longitude}`;
    const url = Platform.OS === "ios" ? appleMapurl : googleMapurl;
    Linking.openURL(url);
  };
  const params = useLocalSearchParams();
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: params.image_url as string }}
          style={{ width: "100%", height: 200 }}
        />
        <View style={{ padding: 15, paddingBottom: 30 }}>
          <Text style={styles.shopName}>{params.name}</Text>
          <Text style={[styles.text, { color: "#848484b7" }]}>
            {params.district}
          </Text>
          <Text style={styles.text}>{params.description}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${params.phone}`)}
            style={{
              backgroundColor: "#00a043",
              height: 55,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={[styles.text, { color: "white", textAlign: "center" }]}
            >
              📞 โทร {params.phone}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 18 }]}>แผนที่ร้าน</Text>
          <MapView
            style={{ width: "100%", height: 300, borderRadius: 10 }}
            initialRegion={{
              latitude: parseFloat(params.latitude as string),
              longitude: parseFloat(params.longitude as string),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: parseFloat(params.latitude as string),
                longitude: parseFloat(params.longitude as string),
              }}
              title={params.name as string}
              description={params.district as string}
              onPress={handleOpenInMaps}
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  shopName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Kanit_700Bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Kanit_400Regular",
  },
});
