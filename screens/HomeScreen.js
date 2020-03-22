import React, { Component } from 'react';
import { Image, TVEventHandler, FlatList, Alert, Platform, ListItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';


import { Icon, Input } from 'react-native-elements'


import { MonoText } from '../components/StyledText';

import GroupList from '../components/GroupList';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      textInput_Holder: '',
      count: 3,
      billTotal: 0.00,
      selectedGroupIndex: 0,
      Group: [
        {
          key: 0,
          title: 'Group 1',
          billItem: [{itemAmount: '1.20', itemIcon: 'restaurant'}, {itemAmount: '3.50', itemIcon: 'restaurant'}],
        },
        {
          key: 1,
          title: 'Group 2',
          billItem: [{itemAmount: '10.20', itemIcon: 'restaurant'}, {itemAmount: '2.99', itemIcon: 'restaurant'}, {itemAmount: '2.99', itemIcon: 'restaurant'}],
        }
      ],
    }

  }

  joinData = () => {
    // TODO: scroll screen to bottom

    this.setState({count: this.state.count + 1})

    this.setState({ Group: [...this.state.Group, ...[{key: this.state.count-1, title: 'Group ' + this.state.count, billItem: [{itemAmount: '£0.00', itemIcon: 'restaurant'}]}]] })
    this.ListView_Ref.scrollToEnd({ animated: true });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: "100%",
        }}
      />
    );
  }

  handleOnChangeText = () => {
    //console.log("onChangeText: True")
    //console.log(value)
    // TODO: sum a groups bills into one
    // TODO: sum all bills into one
    // TODO: update state for total bill and group x bill

    let output2 = this.state.Group.map(d=>({
      groupTitle : d.title,
      groupTotal : d.billItem.reduce((a,b)=>parseFloat(a.itemAmount)+parseFloat(b.itemAmount))
    }));

    console.log(output2)
    console.log(output2[this.state.selectedGroupIndex].groupTitle);

    let initialValue = 0
    let sum = [{x: 1}, {x: 2}, {x: 3}].reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.x
    }, initialValue)

    console.log(sum) // logs 6

    //console.log(JSON.stringify(this.state.Group[0].billItem))
    //this.setState({billTotal: this.state.Group[0].billItem})
  }

  handleFocus = item => {
    console.log("onFocus: True")
    // TODO: get selected index
    // TODO: update state of selected index
    //console.log(!item.isSelect)
    //console.log(item.title)
    //console.log(item.key)
    this.setState({selectedGroupIndex: item.key})

  }

  GetItem(item) {

    Alert.alert(item);

  }

  renderGroupItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.itemBox}>
          <Text style={styles.itemTitle} onPress={this.GetItem.bind(this, item.title)}> {item.title} </Text>
        </View>

        <FlatList
            onFocus={() => this.handleFocus(item)}
            data={item.billItem}
            renderItem = {({ item, index }) => <View style={styles.groupBox}>
                                          <View style={styles.inlineContainer}>
                                            <Input
                                              placeholder={item.itemAmount}
                                              inputStyle={styles.itemAmountBox}
                                              keyboardType='numeric'
                                              onChangeText={this.handleOnChangeText}
                                            />
                                            <Icon
                                              name={item.itemIcon}
                                              type='Ionicon'
                                              iconStyle={styles.itemIconBox}
                                            />
                                          </View>
                                        </View>}
            keyExtractor={item => item.key}
            listKey={(item, index) => 'A' + index.toString()}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>

          <FlatList keyboardDismissMode='on-drag'
            data={this.state.Group}
            width='100%'

            ref={(ref) => {
              this.ListView_Ref = ref;
            }}

            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={item => item.id}
            renderItem = {this.renderGroupItem}
            extraData={this.state}
            ListFooterComponent={<View style={styles.addGroupContainer}><Icon
                                    raised
                                    name='plus'
                                    type='font-awesome'
                                    color='#a3c1ad'
                                    onPress={this.joinData}
                                  /></View>
                                }
          />
          <View style={styles.billTotalFooter}>
            <Text>Total: £{this.state.billTotal}</Text>
          </View>
      </View>

    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleExample() {
  //do something
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  billTotalFooter: {
    fontSize: 20,
    alignItems: 'center',
  },
  addGroupContainer:{
    paddingTop: 5,
    alignItems: 'center',
    marginBottom: 300,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  groupBox: {
    backgroundColor: 'blue',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  inlineContainer: {
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingTop: 5,
    marginBottom: 5,
  },
  itemBox: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'green',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 24,
  },
  itemIconBox: {
    marginTop: 12,
  },
  itemAmountBox: {
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
