/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import apiClient from '../http-common';

const queryClient = new QueryClient();

function RecipeDetails({ route, navigation }) {
  const [responseData, setResponseData] = useState(null);

  // get all recipes data
  const getData = async () => {
    axios.get('http://localhost:3000/api/getRecipe', {
      params: {
        id: route.params.itemId,
      },
    })
      .then((response) => {
        setResponseData(response.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ padding: 50 }}>
      <View>
        {
                responseData
                  ? (
                    <View>

                      <Text style={{ fontSize: 50, fontWeight: '500' }}>
                        {responseData.name}
                      </Text>
                      <Text style={{ fontSize: 30, fontWeight: '300' }}>
                        {responseData.description}
                      </Text>
                      <View style={{ marginTop: 20 }} />
                      <Text style={{ fontSize: 20, fontWeight: '300' }}>
                        Servings:
                        {' '}
                        {responseData.servings}
                      </Text>
                      <Text style={{ fontSize: 20, fontWeight: '300' }}>
                        Prep time:
                        {' '}
                        {responseData.prepTime}
                      </Text>
                      <Text style={{ fontSize: 20, fontWeight: '300' }}>
                        Cook time:
                        {' '}
                        {responseData.cookTime}
                      </Text>

                      <View style={{ marginTop: 20 }} />
                      <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        Ingredients:
                      </Text>

                      <View>
                        {responseData.ingredients.map((item) => (
                          <View>
                            <Text style={{ fontSize: 20, fontWeight: '300' }}>{item.ingredientName}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '300' }}>
                              {item.quantity}
                              {' '}
                              {item.metric}
                              {' '}
                            </Text>

                          </View>

                        ))}

                      </View>
                      <View style={{ marginTop: 20 }} />

                      <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        Instructions:
                      </Text>

                      <View>

                        {responseData.instructions.map((item) => (
                          <View>
                            <Text style={{ fontSize: 20, fontWeight: '300' }}>{item.instructionDescription}</Text>
                          </View>

                        ))}
                      </View>
                    </View>
                  )
                  : <View />
            }
      </View>

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />

    </View>

  );
}

export default RecipeDetails;
