import React from 'react';
import GroupList from '../GroupList';
import HomeScreen from '../../screens/HomeScreen';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<GroupList />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('New group was added correctly', ()=>{
  let GroupData=renderer.create(<GroupList/>).getInstance();
  GroupData.newGroup()

  if (expect(GroupData.state.Group.length).toEqual(1)) {
    expect(GroupData.state.Group[0].title).toEqual("Group 1")
    if (expect(GroupData.state.Group[0].billItem.length).toEqual(1)) {
      expect(GroupData.state.Group[0].billItem[0].toEqual({id: 0, itemAmount: '0.00', itemIcon: 'restaurant'}))
    }
  }
})
/*
it('Bill total was updated correctly', ()=>{
  let GroupData=renderer.create(<GroupList/>).getInstance();

  let testGroupData = [
    {
      key: 1,
      title: "Group 1",
      groupTotal: 0,
      billItem: [
        {
          id: 0,
          itemAmount: "11.91",
          itemIcon: "restaurant"
        },
        {
          id: 1,
          itemAmount: "12.35",
          itemIcon: "restaurant"
        },
        {
          id: 2,
          itemAmount: "2.57",
          itemIcon: "restaurant"
        }
      ]
    },
    {
      key: 2,
      title: "Group 2",
      groupTotal: 0,
      billItem: [
        {
          id: 0,
          itemAmount: "5.33",
          itemIcon: "restaurant"
        },
        {
          id: 1,
          itemAmount: "1.72",
          itemIcon: "restaurant"
        }
      ]
    }
  ]

  GroupData.state.Group = testGroupData

  GroupData.updateBillTotal()

  console.log(JSON.stringify(GroupData.state.Group, null, 1))

  expect(GroupData.state.billTotal).toEqual(33.88)

})

*/

// New group was added

// Group was deleted

// Group was editted
