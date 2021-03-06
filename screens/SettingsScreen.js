import React, {useState} from 'react';
import { StyleSheet, Text, View,  Picker } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { ListItem, Icon, Input } from 'react-native-elements';

export default function SettingsScreen() {
  const [selectedValue, setSelectedValue] = useState("gbp");
  return (
    <View style={styles.centerMsg}>
      <Text>Choose a display currency:</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, alignSelf: 'stretch' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="($) Dollar" value="dollar" />
        <Picker.Item label="(£) Great British Pound" value="gbp" />
        <Picker.Item label="(€) Euro" value="euro" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({

  centerMsg: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
