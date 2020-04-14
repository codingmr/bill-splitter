import React, {useState} from 'react';
import { StyleSheet, Text, View,  Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { ListItem, Icon, Input } from 'react-native-elements';

export default class ItemTypePicker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 'md-restaurant'
    }
  }

  handleOnChange = (itemValue, itemIndex) => {
    this.setState({selectedValue: itemValue})
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Icon
          name={this.state.selectedValue}
          type='ionicon'
          iconStyle={{marginTop: 12}}
        />
        <Picker
          selectedValue={this.state.selectedValue}
          style={{width: 44}}
          onValueChange={this.handleOnChange}
          mode={'dropdown'}
        >
          <Picker.Item label="Meal" value="md-restaurant" />
          <Picker.Item label="Drink" value="md-beer" />
          <Picker.Item label="Pizza" value="md-pizza" />
        </Picker>
      </View>

    );
  }
}
