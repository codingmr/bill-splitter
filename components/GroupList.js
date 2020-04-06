import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import { ListItem, Icon, Input } from 'react-native-elements';

import DialogInput from 'react-native-dialog-input';

export default class GroupList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      billTotal: 0,
      selectedGroupIndex: -1,
      selectedItemIndex: -1,
      textHolder: '',
      Group: [],
      isDialogVisible: false,
    }

  }

  newGroup() {
    this.setState({count: this.state.count + 1})
    this.groupList_Ref.scrollToEnd({animated: true });

    this.setState(prevState => {
      // set focus to first textbox in the correct group
      return { Group: [...prevState.Group, ...[{key: this.state.count, title: 'Group ' + this.state.count, groupTotal: 0, billItem: [{id: 0, itemAmount: '0.00', itemIcon: 'restaurant'}]}]] }
    })

  }

  handleOnChangeText(value) {
    /// ADD BOX
    // To achieve adding only 1 new box when input is entered in to the previous one:
    //  match the number of inputboxs with the selected inputbox index

    this.setState(prevState => {
      let groupies = [...prevState.Group]
      let groupIdx = this.state.selectedGroupIndex
      let itemIdx = this.state.selectedItemIndex

      let itemies = [...groupies[groupIdx].billItem ]
      let initialValue = value

      if (isNaN(initialValue) || initialValue=='') {initialValue = 0}

      itemies[itemIdx] = {...itemies[itemIdx], itemAmount: initialValue}
      groupies[groupIdx] = {...groupies[groupIdx], billItem: itemies}

      // sum group totals into object array
      let groupTotals = groupies.map(group => ({
        key: group.key,
        groupTitle: group.title,
        groupTot: group.billItem.reduce(function (accumulator, currentValue) {
          return Math.round( ((parseFloat(accumulator) + parseFloat(currentValue.itemAmount)) + Number.EPSILON) * 100) / 100
        }, 0)
      }));
      groupies[groupIdx] = {...groupies[groupIdx], groupTotal: groupTotals[groupIdx].groupTot}

      // ADD BOX
      if (value != '' && (itemies.length-1 == itemIdx)) {

          itemies = [...itemies, {id: itemies.length, itemAmount: '0.00', itemIcon: 'restaurant'}]
          groupies[groupIdx] = {...groupies[groupIdx], billItem: itemies}
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
          itemies.pop()
          groupies[groupIdx] = {...groupies[groupIdx], billItem: itemies}
      }
      return {Group: groupies}
    })

    // UPDATE STATE AFTER SUM TOTALS
    this.updateBillTotal()
  }

  handleDeleteGroup = (item, index) => {
    this.setState(prevState => {
      let groupies = [...prevState.Group]
      let filteredGroupies = groupies.slice(0, index).concat(groupies.slice(index + 1, groupies.length))

      return {Group: filteredGroupies}
    })
    this.setState(prevState => {
      return {count: prevState.count-1}
    })

    this.setState({selectedGroupIndex: 0})
    this.setState({selectedItemIndex: 0})

    // Update bill total
    this.updateBillTotal()
  }

    updateBillTotal(){
      this.setState(prevState => {
        let groupies = [...prevState.Group]

        let groupTotals = groupies.map(group => ({
          key: group.key,
          groupTitle: group.title,
          groupTot: group.groupTotal
        }))

        let sum = groupTotals.reduce(function (accumulator, currentValue) {
          return Math.round( ((parseFloat(accumulator) + parseFloat(currentValue.groupTot)) + Number.EPSILON) * 100) / 100
        }, 0)

        this.callParentGiveSum(sum)

        return {billTotal: sum}
      })
    }

    callParentGiveSum(sum){
      this.props.parentReference(sum)
    }

  handleInputFocus = (item, index) => {
    this.setState({selectedItemIndex: index})
  }

  handleGroupFocus = (item, index) => {
    this.setState({selectedGroupIndex: index})
  }

  sendInput(inputText) {
    let groupIdx = this.state.selectedGroupIndex

    this.setState({isDialogVisible: false})
    this.setState(prevState => {
      let groupies = [...prevState.Group]
      groupies[groupIdx] = {...groupies[groupIdx], title: inputText}

      return {Group: groupies}
    })

  }

  handleEditGroupName(item, index) {
    this.setState({selectedGroupIndex: index})
    this.setState({isDialogVisible: true})
  }

  renderGroupItemInput = ({item, index}) => {
    return (
      <View style={styles.itemBox}>
        <View style={styles.inlineContainer}>
          <Text style={styles.currencySymbol}>£</Text>
          <Input
            ref={ref => { this.input = ref }}
            placeholder={'0.00'}
            inputStyle={styles.itemAmountBox}
            placeholderTextColor="#000"
            keyboardType='numeric'
            onFocus={() => this.handleInputFocus(item, index)}
            onChangeText={item => this.handleOnChangeText(item)}
          />
          <Icon
            name={item.itemIcon}
            type='Ionicon'
            iconStyle={styles.itemIconBox}
          />
        </View>
      </View>
    )
  }

  renderGroupItem = ({item, index}) => {
    return (
      <View style={styles.mainView} >
        <View style={styles.titleBox}>
          <Icon
              size={26}
              name='trash'
              type='font-awesome'
              color='#cc6666'
              onPress={() => this.handleDeleteGroup(item, index)}
              iconStyle={{padding: 5, paddingHorizontal: 10}}
          />
          <Text style={styles.itemTitle}> {item.title} </Text>
          <Icon
              size={26}
              name='edit'
              type='font-awesome'
              color='#bab6b3'
              iconStyle={{padding: 5, paddingHorizontal: 10}}
              onPress={() => this.handleEditGroupName(item, index)}
          />
        </View>

        <View style={styles.groupBox}>
          <FlatList
              keyboardDismissMode='on-drag'
              onFocus={() => this.handleGroupFocus(item, index)}
              data={item.billItem}
              renderItem = {this.renderGroupItemInput}
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
        <FlatList
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'
          data={this.state.Group}
          width='100%'

          ref={(ref) => {
            this.groupList_Ref = ref;
          }}

          keyExtractor={(item, index) => 'item.key'+index}
          renderItem = {this.renderGroupItem}
          extraData={this.state}
          ListHeaderComponent={
            <DialogInput isDialogVisible={this.state.isDialogVisible}
              title={"Edit group name"}
              message={"Enter a new name for the group"}
              hintInput ={"Group " + this.state.selectedGroupIndex}
              submitInput={ (inputText) => {this.sendInput(inputText)} }
              closeDialog={ () => {this.setState({isDialogVisible: false})}}>
            </DialogInput>
          }
          ListFooterComponent={<View style={styles.addGroupContainer}><Icon
                                  raised
                                  name='plus'
                                  type='font-awesome'
                                  color='#a3c1ad'
                                  onPress={() => this.newGroup()}
                                /></View>
          }
        />

    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 30,
  },
  currencySymbol: {
    fontSize: 18,
    marginTop: 8,
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
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 50,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
