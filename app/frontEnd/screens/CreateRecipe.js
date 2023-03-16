/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, Button,
} from 'react-native';
import * as React from 'react';
import apiClient from '../http-common';

export default function CreateRecipe({ route, navigation }) {
  const { itemId } = route.params;

  return (
    <View>
      <Text>
        {itemId}
      </Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />

    </View>

  );
}
