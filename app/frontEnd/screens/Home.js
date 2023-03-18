/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, Button, FlatList, TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Home({ navigation }) {
  const [responseData, setResponseData] = useState(null);

  // get all recipes data
  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/getRecipes');
      setResponseData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [responseData]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '500' }}>All Recipes</Text>
      <View>
        {responseData && responseData.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={{
              width: 200, padding: 20, margin: 5, backgroundColor: 'white',
            }}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate('RecipeDetails', {
                itemId: item._id,

              });
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '500' }}>{item.name}</Text>
            <Text style={{ fontSize: 15, fontWeight: '300' }}>{item.description}</Text>

          </TouchableOpacity>

        ))}

      </View>

      <Button
        title="Create new recipe"
        onPress={() => {
          navigation.navigate('CreateRecipe');
        }}
      />
    </View>

  );
}
