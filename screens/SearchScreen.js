import { StyleSheet, TextInput, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { data } from "../data";
import SearchResults from "../components/SearchResults";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const SearchScreen = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db, "places");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
    };

    fetchProducts();
  }, [items]);

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder="Enter Your Destination"
        />
        <Feather name="search" size={22} color="black" />
      </View>

      <SearchResults data={data} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#FFC72C",
    borderWidth: 4,
    borderRadius: 10,
  },
});
