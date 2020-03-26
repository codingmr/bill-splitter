import React, { Component } from 'react';
import { Image, SafeAreaView, FlatList, Alert, Platform, ListItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { TextInputMask } from 'react-native-masked-text';

import { Icon, Input } from 'react-native-elements'


import { MonoText } from '../components/StyledText';

import GroupList from '../components/GroupList';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)

    this.state = {
      billTotal: 0,
      advanced: 0,
    }

  }

  parentMethod(childData) {
    console.log(childData)
    this.setState({billTotal: childData})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <GroupList onRef={ref => (this.parentReference = ref)}
                     parentReference={this.parentMethod.bind(this)}/>

          <TextInputMask
             type={'money'}
             value={this.state.advanced}
             options={{
               precision: 2,
               separator: '.',
               delimiter: ',',
               unit: '£',
               suffixUnit: '',
             }}
             includeRawValueInChangeText={true}
             onChangeText={(maskedText, rawText) =>{
               console.log("Mask: " + maskedText)
               console.log("rawText: " + rawText)
               this.setState({advanced: maskedText})
             }}
           />

          <View style={styles.billTotalFooter}>
            <Text style={{fontSize: 27, padding: 5}}>Bill total: £{this.state.billTotal}</Text>
          </View>

      </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  billTotalFooter: {
    fontSize: 20,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.00,

    elevation: 3,
  },
});
