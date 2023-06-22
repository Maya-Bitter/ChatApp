import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const backgroundColor = {
    black: { backgroundColor: "#090C08" },
    purple: { backgroundColor: "#474056" },
    gray: { backgroundColor: "#8A95A5" },
    green: { backgroundColor: "#B9C6AE" },
  };

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Background-Image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.titlebox}>
          <Text style={styles.BigWhite}>CHAT APP</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.Name}>Your name</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your username here"
          />
          <View style={styles.box}>
            <Text style={styles.Choose}>
              Choose background color{color.backgroundColor}
            </Text>
            <View style={styles.colorbox}>
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  backgroundColor.black,
                  color === backgroundColor.black.backgroundColor
                    ? styles.selectedColorButton
                    : "",
                ]}
                onPress={() => setColor(backgroundColor.black.backgroundColor)}
              ></TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.colorButton,
                  backgroundColor.purple,
                  color === backgroundColor.purple.backgroundColor
                    ? styles.selectedColorButton
                    : "",
                ]}
                onPress={() => setColor(backgroundColor.purple.backgroundColor)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  backgroundColor.gray,
                  color === backgroundColor.gray.backgroundColor
                    ? styles.selectedColorButton
                    : "",
                ]}
                onPress={() => setColor(backgroundColor.gray.backgroundColor)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  backgroundColor.green,
                  color === backgroundColor.green.backgroundColor
                    ? styles.selectedColorButton
                    : "",
                ]}
                onPress={() => setColor(backgroundColor.green.backgroundColor)}
              ></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.ButtonStart} onPress={signInUser}>
              <Text style={styles.ButtonStartText}>Start chatting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    padding: "6%",
  },

  titlebox: {
    flex: 50,
  },

  box: {
    flex: 44,
    backgroundColor: "#FFFFFF",
    padding: 6,
  },

  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },

  colorbox: {
    flexDirection: "row",
    marginBottom: 10,
  },

  ButtonStartText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    justifyContent: "center",
    textAlign: "center",
  },

  ButtonStart: {
    padding: 10,
    backgroundColor: "#757083",
    alignContent: "center",
  },

  colorButton: {
    height: 40,
    width: 40,
    margin: 15,
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColorButton: {
    borderColor: "#555",
  },

  blue: {
    color: "blue",
    fontWeight: "600",
    fontSize: 45,
  },

  BigWhite: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "600",
    textAlign: "center",
  },

  Name: {
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
    opacity: 0.5,
  },

  Choose: {
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
  },
});

export default Start;
