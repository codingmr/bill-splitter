import React, {useState} from 'react';
import { StyleSheet, Text, View,  Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { ListItem, Icon, Input } from 'react-native-elements';

export default function ItemTypePicker() {
  const [selectedValue, setSelectedValue] = useState("md-restaurant");
  return (
    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      <Icon
        name={selectedValue}
        type='ionicon'
        iconStyle={{marginTop: 12}}
      />
      <Picker
        selectedValue={selectedValue}
        style={{width: 30, marginLeft: 15}}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        mode={'dropdown'}
      >
        <Picker.Item label="Meal" value="md-restaurant" />
        <Picker.Item label="Drink" value="md-beer" />
        <Picker.Item label="Pizza" value="md-pizza" />
      </Picker>
    </View>

  );
}
