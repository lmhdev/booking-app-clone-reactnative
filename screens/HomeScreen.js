import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  DatePickerModal,
  enGB,
  registerTranslation,
} from "react-native-paper-dates";
import {
  BottomModal,
  ModalFooter,
  ModalButton,
  ModalTitle,
  SlideAnimation,
  ModalContent,
} from "react-native-modals";
import moment from "moment";
import { Ionicons, Feather } from "@expo/vector-icons";
import Header from "../components/Header";

export const HomeScreen = () => {
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalVisibile, setModalVisibile] = useState(false);

  registerTranslation("en", enGB);

  const onDismiss = useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpenDatePicker(false);
      setRange({ startDate, endDate });
    },
    [setOpenDatePicker, setRange]
  );

  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking.com",
      headerTitleStyle: { fontSize: 20, fontWeight: "bold", color: "white" },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const searchPlace = (place) => {
    if (!route.params) {
      Alert.alert(
        "Invalid Details",
        "Please enter a destination to start searching",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } else if (!range.endDate || !range.startDate) {
      Alert.alert(
        "Invalid Details",
        "Please enter your check-in and check-out dates",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    }
    if (route.params && range.startDate && range.endDate) {
      navigation.navigate("Places", {
        rooms: rooms,
        adults: adults,
        children: children,
        selectedDates: {
          startDate: moment(range.startDate).format("L"),
          endDate: moment(range.endDate).format("L"),
        },
        place: place,
      });
    }
  };

  return (
    <>
      <View>
        <Header />
        <ScrollView>
          <View
            style={{
              margin: 20,
              borderColor: "#ffc72c",
              borderWidth: 4,
              borderRadius: 8,
            }}
          >
            <Pressable
              style={styles.pressable}
              onPress={() => navigation.navigate("Search")}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholder="Enter your Destination"
                value={route?.params ? route.params.input : null}
                onPressIn={() => navigation.navigate("Search")}
              />
            </Pressable>
            <Pressable style={styles.pressable}>
              <Feather name="calendar" size={24} color="black" />
              <Text onPress={() => setOpenDatePicker(true)}>
                {moment(range.startDate).format("L")}
                {" - "}
                {moment(range.endDate).format("L")}
              </Text>
              <DatePickerModal
                locale="en"
                mode="range"
                visible={openDatePicker}
                onDismiss={onDismiss}
                startDate={range.startDate}
                endDate={range.endDate}
                validRange={{ startDate: new Date() }}
                onConfirm={onConfirm}
              />
            </Pressable>
            <Pressable
              onPress={() => setModalVisibile(!modalVisibile)}
              style={styles.pressable}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholder={` ${rooms} room • ${adults} adults • ${children} Children`}
                value={
                  modalVisibile
                    ? null
                    : ` ${rooms} room • ${adults} adults • ${children} Children`
                }
                editable={false}
                onPressIn={() => setModalVisibile(!modalVisibile)}
              />
            </Pressable>
            <Pressable
              style={styles.searchBtn}
              onPress={() => searchPlace(route?.params?.input)}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>

          <Text
            style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}
          >
            Travel More spend less
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                ...styles.horizontalScrollItem,
                marginHorizontal: 20,
                backgroundColor: "#003580",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Genius
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                You are ate genius level one in our loyalty program
              </Text>
            </Pressable>

            <Pressable
              style={{
                ...styles.horizontalScrollItem,
                borderColor: "#E0E0E0",
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                15% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Complete 5 stays to unlock level 2
              </Text>
            </Pressable>

            <Pressable
              style={{
                ...styles.horizontalScrollItem,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                10% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Enjoy Discounts at participating at properties worldwide
              </Text>
            </Pressable>
          </ScrollView>
        </ScrollView>
      </View>

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
                backgroundColor: "#003580",
              }}
              textStyle={{ color: "white" }}
              onPress={() => setModalVisibile(!modalVisibile)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          <View style={styles.modalContentItem}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Rooms</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setRooms(Math.max(1, rooms - 1))}
                style={styles.quantityBtn}
              >
                <Text style={styles.quantityBtnText}>-</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.quantityValue}>{rooms}</Text>
              </Pressable>
              <Pressable
                onPress={() => setRooms((prev) => prev + 1)}
                style={styles.quantityBtn}
              >
                <Text style={styles.quantityBtnText}>+</Text>
              </Pressable>
            </Pressable>
          </View>

          <View style={styles.modalContentItem}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setAdults(Math.max(1, adults - 1))}
                style={styles.quantityBtn}
              >
                <Text style={styles.quantityBtnText}>-</Text>
              </Pressable>

              <Pressable>
                <Text style={styles.quantityValue}>{adults}</Text>
              </Pressable>

              <Pressable
                onPress={() => setAdults((prev) => prev + 1)}
                style={styles.quantityBtn}
              >
                <Text style={styles.quantityBtnText}>+</Text>
              </Pressable>
            </Pressable>
          </View>

          <View style={styles.modalContentItem}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Children</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Pressable
                onPress={() => setChildren(Math.max(0, children - 1))}
                style={styles.quantityBtn}
              >
                <Text style={styles.quantityBtnText}>-</Text>
              </Pressable>

              <Pressable>
                <Text style={styles.quantityValue}>{children}</Text>
              </Pressable>

              <Pressable
                onPress={() => setChildren((prev) => prev + 1)}
                style={styles.quantityBtn}
              >
                <Text style={styles.quantityBtnText}>+</Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: "#c7c7c7",
    borderBottomWidth: 1,
  },
  searchBtn: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#2a52be",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  modalContentItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  quantityBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
  },
  quantityBtnText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 6,
  },
  quantityValue: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    paddingHorizontal: 6,
  },
  horizontalScrollItem: {
    width: 200,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
  },
});
