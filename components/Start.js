import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

//Color options for "Choose Background Color". HEX codes: #090C08; #474056; #8A95A5; #B9C6AE
const backgroundColors = {
  black: "#090C08",
  purple: "#474056",
  grey: "#8A95A5",
  green: "#B9C6AE",
};

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    //create the state object in the class constructor
    this.state = { name: "", color: "" };
  }
  //All that alertMyText() should do is take the user input and display it in an Alert box.(username)
  alertMyText(input = []) {
    Alert.alert(input.name);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/backgroundImage.png")}
          style={styles.image}
        >
          {/* Title of the App */}
          <Text style={styles.title}>Chat App</Text>
          {/*Text Input for users to enter their name + be taken to chat screen */}
          <View style={styles.whiteContainer}>
            <TextInput
              style={[styles.input, styles.text]}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Name"
            />

            {/* Creates a 'Choose Background Color' Feature. User chooses btw Black, Purple, Grey, and Green background on chat screen*/}
            <View style={styles.colorWrapper}>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.colors}>
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.black },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.black })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.purple },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.purple })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.grey },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.grey })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.green },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.green })
                  }
                />
              </View>
            </View>

            {/*  you’ll have to create, in a Button component, an onPress function that gets called whenever the user presses a button. In this function, you can update your state name and navigate the user to the chat screen.*/}
            {/*You can add an object as a second parameter to navigate and add the data you want to use in the screen you’re transitioning to: */}
            <View style={styles.chatButton}>
              <Button
                title="Start Chatting"
                color="#fff"
                onPress={() =>
                  this.props.navigation.navigate("Chat", {
                    name: this.state.name,
                    color: this.state.color,
                  })
                }
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Start chatting button: font size 16, font weight 600, font color #fff, button color #757083
  chatButton: {
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#757083",
    height: 60,
    width: "88%",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    resizeMode: "cover",
  },
  //App title: font size 45, font weight 600, font color #FFFF
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFF",
    textAlign: "center",
  },

  input: {
    height: 50,
    width: "88%",
    borderColor: "gray",
    color: "#757083",
    borderWidth: 2,
  },
  //“Your name”: font size 16, font weight 300, font color #757083, 50% opacity
  text: {
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    opacity: "50%",
  },
  //the container for "your name" text input, 'choose background color' selections, and 'start chatting' button
  whiteContainer: {
    backgroundColor: "white",
    height: "44%",
    width: "88%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: "10%",
  },

  //Background Color Container + Options Below
  colorWrapper: {
    width: "88%",
    justifyContent: "left",
  },

  colorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },

  colors: {
    flexDirection: "row",
  },

  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 25,
  },
});
