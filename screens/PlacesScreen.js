import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Octicons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import {
  BottomModal,
  ModalFooter,
  SlideAnimation,
  ModalTitle,
  ModalContent,
} from "react-native-modals";
import PropertyCard from "../components/PropertyCard";
import { data } from "../data";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const PlacesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(data);
  const [sortedData, setSortedData] = useState(items);
  const [modalVisibile, setModalVisibile] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);

  useEffect(() => {
    if (items.length > 0) return;

    setLoading(true);

    const fetchProducts = async () => {
      const colRef = collection(db, "places");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      setLoading(false);
    };
    fetchProducts();
  }, [items]);

  const searchPlaces = data?.filter(
    (item) => item.place === route.params.place
  );

  const filters = [
    {
      id: "0",
      filter: "Cost: Low to High",
    },
    {
      id: "1",
      filter: "Cost: High to Low",
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Popular Places",
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

  const compareHtL = (a, b) => {
    if (a.newPrice > b.newPrice) {
      return -1;
    }
    if (a.newPrice < b.newPrice) {
      return 1;
    }
    return 0;
  };

  const compareLtH = (a, b) => {
    if (a.newPrice < b.newPrice) {
      return -1;
    }
    if (a.newPrice > b.newPrice) {
      return 1;
    }
    return 0;
  };

  const applyFilter = (filter) => {
    setModalVisibile(false);
    switch (filter) {
      case "Cost: High to Low":
        searchPlaces.map((val) => val.properties.sort(compareHtL));
        setSortedData(searchPlaces);
        break;
      case "Cost: Low to High":
        searchPlaces.map((val) => val.properties.sort(compareLtH));
        setSortedData(searchPlaces);
        break;
    }
  };

  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Pressable
          onPress={() => setModalVisibile(!modalVisibile)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Octicons name="arrow-switch" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Sort
          </Text>
        </Pressable>
        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="filter" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Filter
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("Map", {
              searchResults: searchPlaces,
            })
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome5 name="map-marker-alt" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Map
          </Text>
        </Pressable>
      </Pressable>

      {loading ? (
        <Text>Fetching places....</Text>
      ) : (
        <ScrollView style={{ backgroundColor: "#F5F5F5" }}>
          {sortedData
            ?.filter((item) => item.place === route.params.place)
            .map((item) =>
              item.properties.map((property, index) => (
                <PropertyCard
                  key={index}
                  rooms={route.params.rooms}
                  children={route.params.children}
                  adults={route.params.adults}
                  selectedDates={route.params.selectedDates}
                  property={property}
                  availableRooms={property.rooms}
                />
              ))
            )}
        </ScrollView>
      )}

      <BottomModal
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable
              onPress={() => applyFilter(selectedFilter)}
              style={styles.modalFooterButton}
            >
              <Text>Apply</Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Sort and Filter" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.modalContentTitle}>
              <Text style={{ textAlign: "center" }}>Sort </Text>
            </View>

            <View style={{ flex: 3, margin: 10 }}>
              {filters.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedFilter(item.filter)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  {selectedFilter.includes(item.filter) ? (
                    <FontAwesome name="circle" size={18} color="green" />
                  ) : (
                    <Entypo name="circle" size={18} color="black" />
                  )}
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }}
                  >
                    {item.filter}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContentTitle: {
    marginVertical: 10,
    flex: 2,
    height: 280,
    borderRightWidth: 1,
    borderColor: "#E0E0E0",
  },
  modalFooterButton: {
    paddingRight: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 10,
    marginBottom: 30,
  },
});
