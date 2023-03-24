/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, Button, FlatList, TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import SideBar from '../components/SideBar';

export default function GroceryList({ navigation, route }) {
  const [totalList, setTotalList] = useState(null);
  const [meals, setMeals] = useState(Array.from({ length: 7 }, () => Array.from({ length: 3 }, () => null)));

  const createList = async () => {
    axios.get('http://localhost:3000/api/getGroceryList', {
      params: {
        meals,
      },
    })
      .then((response) => {
        setTotalList(response.data);
        // console.log(response.data);
      });
  };

  useEffect(() => {
    setMeals(route?.params?.meals);
    createList(meals);
  }, [meals]);

  return (
    <View style={{ flexDirection: 'row', height: '100%' }}>
      <SideBar currScreen="Grocery List" navigation={navigation} />

      <Text style={{ fontSize: 20, fontWeight: '500' }}>Grocery List</Text>
      <View>
        {totalList && totalList.map((item) => (
          <View>
            <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.item}</Text>
            <Text style={{ fontSize: 15, fontWeight: '300' }}>{item.count}</Text>

          </View>

        ))}
      </View>
    </View>

  );
}
