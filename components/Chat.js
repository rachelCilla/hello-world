import React, { Component } from "react";
import { View, Platform, Text, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Chat extends Component {
    constructor() {
      super();
      this.state = {
        messages: [],
      };
    }

    componentDidMount() {
        const name = this.props.route.params.name;
        

        //     /*In the Chat screen, you can access the user’s name via this.props.route.params.name */
        //     /*To display the user’s name in the navigation bar at the top of Chat, you need to configure it. To do so, you can use the function setOptions of the navigation prop in the Chat component to set the title:*/
          this.props.navigation.setOptions({ title: name });
        //A chat app needs to send, receive, and display messages, so it makes sense to add messages into the state object.
        //Let’s set the state with a static message so that you’ll be able to see each element of the UI displayed on screen right away. You do this with the setState() function:
        this.setState({
            //, each message requires an ID, a creation date, and a user object. The user object, likewise, requires a user ID, name, and avatar. 
            messages: [
                {
                    _id:1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user:{
                        _id: 2,
                        name: 'React Native',
                        avatar:'https://placeimg.com/140/140/any', 
                    },
                },
            //creates a system message- commonly used to display the last time a user was active in the app—or if someone new joins the chat.
            {
             _id: 2,
             text: "You've entered the chat ",
             createdAt: new Date(),
             system: true,
            },

            ],
        });
    }
        
        onSend(messages = []) {
            // the function setState() is called with the parameter previousState, which is a reference to the component’s state at the time the change is applied. 
            this.setState((previousState) => ({
                //the message a user has just sent gets appended to the state messages so that it can be displayed in the chat.
              messages: GiftedChat.append(previousState.messages, messages),
            }));
          }

//Customizes text bubbles
          renderBubble(props) {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                    left:{
                        backgroundColor: "#fff",
                    },
                  right: {
                    backgroundColor: "#894c9c",
                  },
                }}
              />
            );
          }
        

    
   
render() {
  //let color = this.props.route.params.color;
  const { color } = this.props.route.params;
    return (

<View style={{flex:1, backgroundColor:color}}>


{/*the code for rending your chat interface*/}
<GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
{/*if the platform’s OS is Android, add the component KeyboardAvoidingView; else, insert nothing.*/}
{ Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
</View>

);
}
}
