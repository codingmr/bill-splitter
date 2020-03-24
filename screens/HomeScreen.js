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
      textInput_Holder: '',
      count: 3,
      billTotal: 0.00,
      selectedGroupIndex: 0,
      selectedItemIndex: 0,
      textHolder: '',
      Group: [
        {
          key: 0,
          title: 'Group 1',
          billItem: [{id: 0, itemAmount: '0.00', itemIcon: 'restaurant'}],
          groupTotal: 0,
        },
        {
          key: 1,
          title: 'Group 2',
          billItem: [{id: 0, itemAmount: '0.00', itemIcon: 'restaurant'}, {id: 1, itemAmount: '0.00', itemIcon: 'restaurant'}, {id: 2, itemAmount: '0.00', itemIcon: 'restaurant'}],
          groupTotal: 0,
        }
      ],
    }

  }


  joinData = () => {
    this.setState({count: this.state.count + 1})

    this.setState({ Group: [...this.state.Group, ...[{key: this.state.count-1, title: 'Group ' + this.state.count, groupTotal: 0, billItem: [{id: 0, itemAmount: '0.00', itemIcon: 'restaurant'}]}]] })
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

  componentDidUpdate() {
  }

  handleOnChangeText(value) {
    //ISSUE: parseFloat causes rounding error
    //ISSUE: returns NaN if textbox input is empty

    let initialValue = value

    // if selected index is -1 of list length
    let groupIdx = this.state.selectedGroupIndex
    let itemIdx = this.state.selectedItemIndex
    let groupies = this.state.Group
    let itemies = [...groupies[groupIdx].billItem]


    /// ADD BOX
    // To achieve adding only 1 new box when input is entered in to the previous one:
    //  match the number of inputboxs with the selected inputbox index
    console.log("itemies length: " + itemies.length)
    console.log("itemIdx: " + itemIdx)
    if (initialValue > 0 && (itemies.length-1 == itemIdx)) {
      console.log("true")
      this.setState(prevState => {
        //TODO: hold group
        //TODO: join a new entry of items to group
        let groupies = [...prevState.Group]
        let groupIdx = this.state.selectedGroupIndex
        let itemIdx = this.state.selectedItemIndex

        let itemies = [...groupies[groupIdx].billItem ]
        //console.log("itemies length: " + itemies.length)
        itemies = [...itemies, {id: itemies.length, itemAmount: '0.00', itemIcon: 'restaurant'}]
        //console.log("itemies: " + JSON.stringify(itemies))

        groupies[groupIdx] = {...groupies[groupIdx], billItem: itemies}

        //console.log(JSON.stringify(groupies[0]))
        return {Group: groupies}
      })
    }
    // DELETE BOX
    else if (itemies.length-1 != itemIdx
                && (initialValue==''
                && (itemies[itemIdx+1].itemAmount=='' || itemies[itemIdx+1].itemAmount=='0.00')
                && itemies.length-2 == itemIdx )) {
      // if not last inputbox
      // and current input is empty
      // and next inputbox is empty
      // and selected inputbox is one from the last inputbox
      this.setState(prevState => {
        //TODO: hold group
        //TODO: join a new entry of items to group
        let groupies = [...prevState.Group]
        let groupIdx = this.state.selectedGroupIndex
        let itemIdx = this.state.selectedItemIndex

        let itemies = [...groupies[groupIdx].billItem ]
        //console.log("itemies length: " + itemies.length)
        itemies.pop()
        //console.log("itemies: " + JSON.stringify(itemies))

        groupies[groupIdx] = {...groupies[groupIdx], billItem: itemies}

        //console.log(JSON.stringify(groupies[0]))
        return {Group: groupies}
      })


      console.log("trigger mammoth")
    }

    // UPDATE STATE WITH BOX INPUT
    this.setState(prevState => {
      let initialValue = value

      if (isNaN(initialValue) || initialValue=='') {initialValue = 0}
      console.log("initialValue: " + initialValue)

      let groupies = [...prevState.Group]
      let groupIdx = this.state.selectedGroupIndex
      let itemIdx = this.state.selectedItemIndex

      let itemies = [...groupies[groupIdx].billItem]
      itemies[itemIdx] = {...itemies[itemIdx], itemAmount: initialValue}

      groupies[groupIdx] = {...groupies[groupIdx], billItem: itemies}

      let groupTotals = groupies.map(x => ({
        key: x.key,
        groupTitle: x.title,
        groupTot: x.billItem.reduce(function (accumulator, currentValue) {
          return parseFloat(accumulator) + parseFloat(currentValue.itemAmount)
        }, 0)
      }));
      groupies[groupIdx] = {...groupies[groupIdx], groupTotal: groupTotals[groupIdx].groupTot}


      //console.log(JSON.stringify(this.state.Group))
      //console.log(groupTotals)

      let sum = groupTotals.reduce(function (accumulator, currentValue) {
        return parseFloat(accumulator) + parseFloat(currentValue.groupTot)
      }, 0)

      return {Group: groupies}
    });

    // UPDATE STATE AFTER SUM TOTALS
    this.setState(prevState => {
      let groupies = [...prevState.Group]
      let groupIdx = this.state.selectedGroupIndex
      let itemIdx = this.state.selectedItemIndex

      let groupTotals = groupies.map(x => ({
        key: x.key,
        groupTitle: x.title,
        groupTot: x.groupTotal
      }))

      //console.log("groupTotals: " + JSON.stringify(groupTotals))

      let sum = groupTotals.reduce(function (accumulator, currentValue) {
        return parseFloat(accumulator) + parseFloat(currentValue.groupTot)
      }, 0)

      return {billTotal: sum}
    });

  }



  handleInputFocus = item => {
    console.log("onInputFocus: True")
    this.setState({selectedItemIndex: item.id})
    //console.log(item.id)
    //console.log(JSON.stringify(this.state.Group))
  }

  handleGroupFocus = item => {
    console.log("onGroupFocus: True")
    // TODO: get selected index
    // TODO: update state of selected index
    //console.log(!item.isSelect)
    //console.log(item.title)
    //console.log(item.key)
    this.setState({selectedGroupIndex: item.key})
    //console.log(item.key)

  }

  GetItem(item) {

    Alert.alert(item);

  }

  renderGroupItem = ({item, index}) => {
    return (
      <View style={styles.mainView} >
        <View style={styles.titleBox}>
          <Text style={styles.itemTitle} onPress={this.GetItem.bind(this, item.title)}> {item.title} </Text>
        </View>

        <View style={styles.groupBox}>
          <FlatList
              onFocus={() => this.handleGroupFocus(item)}
              data={item.billItem}
              renderItem = {({ item, index }) => <View style={styles.itemBox}>
                                            <View style={styles.inlineContainer}>
                                              <Input
                                                placeholder={'£0.00'}
                                                inputStyle={styles.itemAmountBox}
                                                placeholderTextColor="#000"
                                                keyboardType='numeric'
                                                onFocus={() => this.handleInputFocus(item)}
                                                onChangeText={item => this.handleOnChangeText(item)}
                                              />
                                              <Icon
                                                name={item.itemIcon}
                                                type='Ionicon'
                                                iconStyle={styles.itemIconBox}
                                              />
                                            </View>
                                          </View>}
              keyExtractor={(item, index) => 'item.id'+index}
          />
          <View style={styles.groupTotalBox}>
            <Text style={{fontSize: 18}}>Group total: £{item.groupTotal}</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <FlatList keyboardDismissMode='on-drag'
            data={this.state.Group}
            width='100%'

            ref={(ref) => {
              this.ListView_Ref = ref;
            }}

            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={(item, index) => 'item.key'+index}
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
            <Text style={{fontSize: 27, padding: 5}}>Bill total: £{this.state.billTotal}</Text>
          </View>
      </SafeAreaView>

    );
  }
}

HomeScreen.navigationOptions = {
  headerShown: false,
  header: null,
  visible: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  mainView: {
    marginTop: 30,
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
  addGroupContainer:{
    paddingTop: 15,
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
  groupTotalBox: {
    backgroundColor: '#bfc1c2',
    paddingVertical: 10,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  groupBox: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#ededed',
    borderRadius: 1.8,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 3,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '20%',
  },
  itemBox: {
    backgroundColor: '#ededed',
    marginBottom: 10,
  },
  titleBox: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3A4A4D',
    alignItems: 'center',
    borderRadius: 3.6,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemTitle: {
    fontSize: 20,
    padding: 4,
    color: '#bfc1c2',
  },
  itemIconBox: {
    marginTop: 12,
  },
  itemAmountBox: {
    color: '#424142',
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
