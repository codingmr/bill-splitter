import React, { Component } from 'react';
import { Image, TVEventHandler, FlatList, Alert, Platform, ListItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';


import { Icon, Input } from 'react-native-elements'


import { MonoText } from '../components/StyledText';

import GroupList from '../components/GroupList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
    header: {
      visible: false,
    },
    visible: false,
  };
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
          billItem: [{id: 0, itemAmount: '0.00', itemIcon: 'restaurant'}, {id: 1, itemAmount: '0.00', itemIcon: 'restaurant'}],
          billTotal: 0,
        },
        {
          key: 1,
          title: 'Group 2',
          billItem: [{id: 0, itemAmount: '0.00', itemIcon: 'restaurant'}, {id: 1, itemAmount: '0.00', itemIcon: 'restaurant'}, {id: 2, itemAmount: '0.00', itemIcon: 'restaurant'}],
          billTotal: 0,
        }
      ],
    }

  }

  joinData = () => {
    // TODO: scroll screen to bottom

    this.setState({count: this.state.count + 1})

    this.setState({ Group: [...this.state.Group, ...[{key: this.state.count-1, title: 'Group ' + this.state.count, billTotal: 0, billItem: [{id: 0, itemAmount: '0.00', itemIcon: 'restaurant'}]}]] })
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

    this.setState(prevState => {
      let groupies = [...prevState.Group]
      let groupIdx = this.state.selectedGroupIndex
      let itemIdx = this.state.selectedItemIndex
      //console.log("Group index: " + groupIdx)
      //console.log("Item index: " + itemIdx)
      //this.setState({textHolder: value})

      //console.log(value)
      let itemies = [...groupies[groupIdx].billItem]
      itemies[itemIdx] = {...itemies[itemIdx], itemAmount: value}

      groupies[groupIdx] = {...groupies[groupIdx], billItem: itemies}
      //console.log(groupies)


      //ISSUE: parseFloat causes rounding error
      //ISSUE: returns NaN if textbox input is empty
      let groupTotals = groupies.map(x => ({
        key: x.key,
        groupTitle: x.title,
        groupTot: x.billItem.reduce(function (accumulator, currentValue) {
          return parseFloat(accumulator) + parseFloat(currentValue.itemAmount)
        }, 0)
      }));
      groupies[groupIdx] = {...groupies[groupIdx], billTotal: groupTotals[groupIdx].groupTot}


      this.setState({Group: groupies })

      //console.log(JSON.stringify(this.state.Group))
      console.log(groupTotals)

      let sum = groupTotals.reduce(function (accumulator, currentValue) {
        return parseFloat(accumulator) + parseFloat(currentValue.groupTot)
      }, 0)

      this.setState({billTotal: sum})
      //this.setState({GroupTot: output3})
      //console.log("billtotal state: " + this.state.billTotal)
      return {groupies}
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
      <View>
        <View style={styles.itemBox}>
          <Text style={styles.itemTitle} onPress={this.GetItem.bind(this, item.title)}> {item.title} </Text>
        </View>

        <FlatList
            onFocus={() => this.handleGroupFocus(item)}
            data={item.billItem}
            renderItem = {({ item, index }) => <View style={styles.groupBox}>
                                          <View style={styles.inlineContainer}>
                                            <Input
                                              placeholder={'0.00'}
                                              inputStyle={styles.itemAmountBox}
                                              keyboardType='numeric'
                                              onFocus={() => this.handleInputFocus(item)}
                                              onChangeText={item => this.handleOnChangeText(item)}
                                              defaultValue={item.itemAmount}
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

        <Text>Total: {item.billTotal}</Text>
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
  headerShown: false,
  header: null,
  visible: false,
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
