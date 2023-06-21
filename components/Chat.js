import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // const onSend = (newMessages) => {
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, newMessages)
  //   );
  // };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  // code from the task's answers //

  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  // Clean up code

  // wrote myself this code :

  //useEffect(() => {
  //  navigation.setOptions({ title: name });
  //}, []);

  //  useEffect(() => {
  //  const q = query(collection(db, "messages"), where("uid", "==", userID));

  //  const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
  //    let newMessages = [];
  //    documentsSnapshot.forEach((doc) => {
  //      newMessages.push({ id: doc.id, ...doc.data() });
  //    });
  //    setMessages(newMessages);
  //  });
  //
  //    return () => {
  //      if (unsubMessages) unsubMessages();
  //    };
  //  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>You are in the Chat</Text>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
