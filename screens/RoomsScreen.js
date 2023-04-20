import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Amenities from "../components/Amenities";

export const RoomsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [selected, setSelected] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Available Rooms",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  return (
    <>
      <ScrollView>
        {route.params.rooms.map((item, index) => (
          <Pressable
            style={{ margin: 10, backgroundColor: "white", padding: 10 }}
            key={index}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#007FFF", fontSize: 17, fontWeight: "500" }}
              >
                {item.name}
              </Text>
              <AntDesign name="infocirlceo" size={24} color="#007FFF" />
            </View>
            <Text style={{ marginTop: 3, fontSize: 16 }}>
              pay at the property
            </Text>
            <Text style={{ marginTop: 3, color: "green", fontSize: 16 }}>
              Free cancellation Available
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "red",
                  textDecorationLine: "line-through",
                }}
              >
                US$ {route.params.oldPrice}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                US$ {route.params.newPrice}
              </Text>
            </View>
            <Amenities />

            {selected === item.name ? (
              <Pressable
                style={{
                  borderColor: "#318CE7",
                  backgroundColor: "#F0F8FF",
                  borderWidth: 2,
                  width: "100%",
                  padding: 10,
                  borderRadius: 5,
                  position: "relative",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "#318CE7",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  SELECTED
                </Text>
                <Entypo
                  onPress={() => setSelected([])}
                  name="circle-with-cross"
                  size={24}
                  color="#8f0000"
                  style={{ position: "absolute", right: 8, top: 8 }}
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setSelected(item.name)}
                style={{
                  borderColor: "#007FFF",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#007FFF",
                  }}
                >
                  SELECT
                </Text>
              </Pressable>
            )}
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={() =>
          navigation.navigate("User", {
            oldPrice: route.params.oldPrice,
            newPrice: route.params.newPrice,
            name: route.params.name,
            children: route.params.children,
            adults: route.params.adults,
            rating: route.params.rating,
            startDate: route.params.startDate,
            endDate: route.params.endDate,
          })
        }
        style={{
          backgroundColor: selected.length > 0 ? "#007FFF" : "gray",
          padding: 12,
          marginBottom: 30,
          borderRadius: 12,
          marginHorizontal: 15,
        }}
        disabled={selected.length <= 0}
      >
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          Reserve
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({});
