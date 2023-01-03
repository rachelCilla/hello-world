import React, { Component } from "react";
import { View, Platform, StyleSheet, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
const firebase = require('firebase');
require('firebase/firestore');
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      }
    };

    const firebaseConfig = {
        apiKey: "AIzaSyBrIf6OrFkwvUjd5oTXlG15AB8Ep1bSG9g",
        authDomain: "chat-app-6b9ff.firebaseapp.com",
        projectId: "chat-app-6b9ff",
        storageBucket: "chat-app-6b9ff.appspot.com",
        messagingSenderId: "444428490307",
      };

    if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

    //this stores and retrieves the chat messages your users send
    this.referenceChatMessages = firebase.firestore().collection("messages");
      }

    onCollectionUpdate = (querySnapshot) => {
      if (!this.state.isConnected) return;
      const messages = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        let data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar,
        },
        });
      });
      this.setState({
        messages,
    });
};

// retrieve chat messages from asyncStorage
async getMessages() {
  let messages = "";
  try {
    messages = (await AsyncStorage.getItem("messages")) || [];
    console.log("called set state for messages", messages);
    this.setState({
      messages: JSON.parse(messages),
    });
  } catch (error) {
    console.log(error.message);
  }
}

    componentDidMount() {
      let { name } = this.props.route.params;
      this.props.navigation.setOptions({ title: name });
//To find out the user's connection status, you can call the fetch() method on NetInfo, which returns a promise. An object will be returned that contains several properties
      this.getMessages();
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });
      } else {
        this.setState({
          isConnected: false,
        });
      }
    });


         //Anonymous user authentication 
         this.referenceChatMessages = firebase.firestore().collection('messages');

      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }
        this.setState({
          uid: user.uid,
          messages: [],
          user: {
            _id: user.uid,
            name: name,
        },
        });
        this.unsubscribe = this.referenceChatMessages
          .orderBy("createdAt", "desc")
          .onSnapshot(this.onCollectionUpdate);
      });
    }

 componentWillUnmount() {
   this.unsubscribe();
   this.authUnsubscribe();
}

onSend(messages = []) {
  // the function setState() is called with the parameter previousState, which is a reference to the component’s state at the time the change is applied. 
  this.setState((previousState) => ({
      //the message a user has just sent gets appended to the state messages so that it can be displayed in the chat.
    messages: GiftedChat.append(previousState.messages, messages),
  }), () => {
    // adds a callback function to setState so that once the state object is updated, you’ll save its current state into asyncStorage by calling your custom function saveMessages():
    const message = messages[0];
    this.addMessage(message);
    this.saveMessages();
});
}

addMessages= (message) => {
  this.referenceChatMessages.add({
  uid: this.state.uid,
  _id: message._id,
  text: message.text,
  createdAt: message.createdAt,
  user: message.user,
});
}



// To save messages, you’re using the setItem method that takes two parameters: a key and a value.
async saveMessages() {
  try {
    await AsyncStorage.setItem(
      "messages",
      JSON.stringify(this.state.messages)
    );
  } catch (error) {
    console.log(error.message);
  }
}

//To delete stored messages, you need to use the removeItem method, which takes the key of the item you want to clear.
async deleteMessages() {
  try {
    await AsyncStorage.removeItem("messages");
    this.setState({
      messages: [],
    });
  } catch (error) {
    console.log(error.message);
  }}
//Customizes text bubbles
renderBubble(props) {
  return (
      <Bubble
          {...props}
          wrapperStyle={styles.bubble}
      />
  )
}
  //renders the default InputToolbar only when the user is online
  renderInputToolbar(props) {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

render() {
  //let color = this.props.route.params.color;
  const { color,name } = this.props.route.params;
    
  return (

<View style={{flex:1, backgroundColor:color}}>


{/*the code for rending your chat interface*/}
<GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: name,
        }}
        />
{/*if the platform’s OS is Android, add the component KeyboardAvoidingView; else, insert nothing.*/}
{ Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
</View>

);
};
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  chatTitle: {
      color: '#FFFFFF'
  },
  bubble: {
      left: {
          backgroundColor: 'white',
      },
      right: {
          backgroundColor: 'black'
      }
  }
})




