/* eslint-disable react/jsx-filename-extension */
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import Color from '../../modules/Color';

function SideBar({ navigation, currScreen }) {
  const [screens, setScreens] = useState(null);

  const [activeScreen, setActiveScreen] = useState(currScreen);

  useEffect(() => {
    const allScreens = new Map();

    allScreens.set('Home', 'Home');
    allScreens.set('Discover', 'Discover');
    allScreens.set('Meal Plan', 'WeeklySchedule');
    allScreens.set('Grocery List', 'GroceryList');
    setScreens(allScreens);
  }, [screens]);

  const renderStack = (name) => (
    <View style={{
      flexDirection: 'row', alignItems: 'center', margin: 15,
    }}
    >
      {
            activeScreen === name
              ? (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 3, backgroundColor: 'black', marginRight: 20 }} />
                  <TouchableOpacity>
                    <Text value={name} style={{ fontSize: 17, fontWeight: '700' }}>{name}</Text>
                  </TouchableOpacity>
                </View>
              )
              : (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 3, backgroundColor: Color.backgroundColorSideBar, marginRight: 20 }} />
                  <TouchableOpacity onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate(screens.get(name));
                  }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: '700', color: 'rgb(155,155,155)' }}>{name}</Text>
                  </TouchableOpacity>
                </View>
              )
        }
    </View>
  );
  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 17, fontWeight: '700' }}>My App </Text>
      <View style={{ height: 100 }} />
      {renderStack('Home')}
      {renderStack('Discover')}
      {renderStack('Meal Plan')}
      {renderStack('Grocery List')}
    </View>
  );
}

const styles = StyleSheet.create({
//   header: {
//     minHeight: 44,
//     width: '100%',
//     justifyContent: 'center',
//     shadowColor: 'black',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     backgroundColor: 'white',
//     shadowOpacity: 0.16,
//     shadowRadius: 4,
//     elevation: 10,
//     paddingHorizontal: 16,
//     zIndex: 100,
//   },

  container: {
    width: 250,
    backgroundColor: Color.backgroundColorSideBar,
    height: '100%',
    padding: 20,
  },

});

export default SideBar;
