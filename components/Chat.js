import React, { Component } from "react";
import { View, Platform, StyleSheet, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
const firebase = require('firebase');
require('firebase/firestore');

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

    componentDidMount() {
      let { name } = this.props.route.params;
      this.props.navigation.setOptions({ title: name });

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
    this.addMessages(this.state.messages[0]);
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

//Customizes text bubbles
renderBubble(props) {
  return (
      <Bubble
          {...props}
          wrapperStyle={styles.bubble}
      />
  )
}

render() {
  //let color = this.props.route.params.color;
  const { color,name } = this.props.route.params;
    
  return (

<View style={{flex:1, backgroundColor:color}}>


{/*the code for rending your chat interface*/}
<GiftedChat
          renderBubble={this.renderBubble.bind(this)}
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




