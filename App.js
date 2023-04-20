import { ModalPortal } from "react-native-modals";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
        <ModalPortal />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
