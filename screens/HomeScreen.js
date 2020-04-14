import React, { Component } from 'react';
import { Image, SafeAreaView, FlatList, Alert, Platform, ListItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';


import { Icon, Input } from 'react-native-elements'


import { MonoText } from '../components/StyledText';

import GroupList from '../components/GroupList';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      billTotal: 0,
      billTip: 0,
    }

  }

  parentMethod(childData, childData2) {
    console.log(childData)
    if (childData!=-1){
      this.setState({billTotal: childData})
    }
    if (childData2!=-1) {
      this.setState({billTip: childData2})
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <GroupList onRef={ref => (this.parentReference = ref)}
                     parentReference={this.parentMethod.bind(this)}/>

          <View style={styles.billTotalFooter}>
            <Text style={{fontSize: 18}}>£{this.state.billTotal}</Text>
            <Text style={{color: 'grey', fontSize: 16, paddingTop: 1}}>  + £{this.state.billTip}</Text>
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
    flexDirection: 'row',
    fontSize: 20,
    justifyContent: 'center',
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
