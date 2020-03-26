import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function HistoryScreen() {
  return (
    <View style={styles.centerMsg}>
      <Text>[This screen is intentionally blank]</Text>
      <Text>Updates coming soon..</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  centerMsg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
