/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, Button, FlatList, TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import SideBar from '../components/SideBar';

export default function Discover({ navigation, route }) {
  return (
    <View style={{ flexDirection: 'row', height: '100%' }}>
      <SideBar currScreen="Discover" navigation={navigation} />

      <Text style={{ fontSize: 20, fontWeight: '500' }}>Discover</Text>

    </View>

  );
}
