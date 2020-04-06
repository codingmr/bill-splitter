import React, {useState} from 'react';
import { StyleSheet, Text, View,  Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { ListItem, Icon, Input } from 'react-native-elements';

export default function CustomPicker() {
  const [selectedValue, setSelectedValue] = useState("one");
  return (
    <View style={styles.centerMsg}>
      <Picker
        selectedValue={selectedValue}
        style={{ alignSelf: 'stretch', }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        mode="dropdown"
      >
        <Picker.Item label="1%" value="one" />
        <Picker.Item label="2%" value="2" />
        <Picker.Item label="3%" value="3" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({

  centerMsg: {
    flex: 1,
    alignItems: 'center',
  },
});
