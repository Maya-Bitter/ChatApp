// import the screens
import Chat from "./components/Chat";
import Start from "./components/Start";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDq6kd8SlKo59my8FbMHlhHRNt13k7qk1g",
    authDomain: "chat-app-7322f.firebaseapp.com",
    projectId: "chat-app-7322f",
    storageBucket: "chat-app-7322f.appspot.com",
    messagingSenderId: "618257410226",
    appId: "1:618257410226:web:4c0bf81f6fabff174381ab",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  const connectionStatus = useNetInfo();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
