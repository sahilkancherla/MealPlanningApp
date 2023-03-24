/* eslint-disable react/jsx-filename-extension */
import {
  View, StyleSheet, Text, TextInput, TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import Color from '../../modules/Color';

function SearchBar({ navigation }) {
  const [screens, setScreens] = useState(null);
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => setQuery(text)}
        value={query}
        style={{ padding: 10, outlineStyle: 'none' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    borderRadius: 10,
    width: '35%',
    marginVertical: 15,
    backgroundColor: Color.backgroundColorSideBar,
  },

});

export default SearchBar;
