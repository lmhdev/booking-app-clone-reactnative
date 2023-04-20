import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = () => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  return (
    <View style={styles.header}>
      <Pressable
        style={{
          ...styles.btn,
          borderColor: selectedBtn === 0 ? "white" : "transparent",
          borderWidth: selectedBtn === 0 ? 1 : 0,
        }}
        onPress={() => setSelectedBtn(0)}
      >
        <Ionicons name="bed-outline" size={24} color="white" />
        <Text style={styles.btnText}>Stays</Text>
      </Pressable>
      <Pressable
        style={{
          ...styles.btn,
          borderColor: selectedBtn === 1 ? "white" : "transparent",
          borderWidth: selectedBtn === 1 ? 1 : 0,
        }}
        onPress={() => setSelectedBtn(1)}
      >
        <Ionicons name="ios-airplane-outline" size={24} color="white" />
        <Text style={styles.btnText}>Flights</Text>
      </Pressable>
      <Pressable
        style={{
          ...styles.btn,
          borderColor: selectedBtn === 2 ? "white" : "transparent",
          borderWidth: selectedBtn === 2 ? 1 : 0,
        }}
        onPress={() => setSelectedBtn(2)}
      >
        <FontAwesome5 name="car" size={24} color="white" />
        <Text style={styles.btnText}>Cars</Text>
      </Pressable>
      <Pressable
        style={{
          ...styles.btn,
          borderColor: selectedBtn === 3 ? "white" : "transparent",
          borderWidth: selectedBtn === 3 ? 1 : 0,
        }}
        onPress={() => setSelectedBtn(3)}
      >
        <FontAwesome5 name="taxi" size={24} color="white" />
        <Text style={styles.btnText}>Taxi</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#003580",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 25,
  },
  btnText: { marginLeft: 8, fontWeight: "bold", color: "white", fontSize: 14 },
});
