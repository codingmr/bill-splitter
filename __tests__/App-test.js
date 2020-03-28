import * as React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../screens/HomeScreen';

jest.mock('expo', () => ({
  AppLoading: 'AppLoading',
}));

jest.mock('../navigation/BottomTabNavigator', () => 'BottomTab');

it(`HomeScreen renders correctly`, () => {
  const tree = renderer.create(<HomeScreen/>).toJSON();

  expect(tree).toMatchSnapshot();
});
