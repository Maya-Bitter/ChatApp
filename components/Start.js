import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Button,
  TextInput,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/Background-Image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.BigWhite}>CHAT APP</Text>
        <Text style={styles.Name}>Your name</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Type your username here"
        />
        <Text style={styles.Button}></Text>
        <Button
          title="Start chatting"
          color="#757083"
          fontSize="16"
          fontWeigh="600"
          onPress={() => navigation.navigate("Chat", { name: name })}
        />
        <Text style={styles.Choose}>Choose background color</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  //container: {
  //  flex: 1,
  //  justifyContent: "center",
  //  alignItems: "center",
  //},

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  //<Image
  //style={{
  //width: 51,
  //height: 51,
  //resizeMode: 'contain',
  //}}

  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
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
