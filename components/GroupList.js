import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { ListItem, Icon } from 'react-native-elements';

const list = [
  {
    title: 'Group 1',
    icon: 'delete'
  },
  {
    title: 'Group 2',
    icon: 'delete'
  },
  {
    title: 'Group 3',
    icon: 'delete'
  },
]

export default class GroupList extends React.Component {
  render() {
    return (

        list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{ name: item.icon }}
            bottomDivider
            chevron
          />
        ))

    );
  }
}
