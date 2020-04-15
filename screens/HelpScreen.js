import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function HelpScreen() {
  return (
    <View style={}>

      <Text>1. Creating a new group</Text>
      // render create group button
      // draw arrow pointing to button


      <Text>2. Group header</Text>
      // render an empty group with one person
      // draw arrow pointing to delete button

      // I want to
      //  - Create a new group
      //  - Delete a group
      //  - Edit a group name
      //  - Input item prices
      //  - Change an item category
      //  - Change the number of people
      //  - Add a tip
      //  - Know how the bill is split
      //  - Know the sum total of all the groups

      //  - Split the bill evenly
      //  - Split the bill unevenly
      //  -  

    </View>
  );
}

const styles = StyleSheet.create({

  centerMsg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
