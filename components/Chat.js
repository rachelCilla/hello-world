import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default class Chat extends React.Component {
  componentDidMount() {
    let name = this.props.route.params.name;

    /*In the Chat screen, you can access the user’s name via this.props.route.params.name */
    /*To display the user’s name in the navigation bar at the top of Chat, you need to configure it. To do so, you can use the function setOptions of the navigation prop in the Chat component to set the title:*/
    this.props.navigation.setOptions({ title: name });
  }
  render() {
    let color = this.props.route.params.color;
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text>Hello Chat!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
