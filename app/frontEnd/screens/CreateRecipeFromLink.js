/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, Button, FlatList, TouchableOpacity, TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function CreateRecipeFromLink({ navigation }) {
  const [link, setLink] = useState('');
  const [recipeData, setRecipeData] = useState(null);

  // General
  const [name, onChangeName] = React.useState('Name');

  const [description, onChangeDescription] = React.useState('Description');

  const [servings, onChangeServings] = React.useState(1);

  const [prepTime, onChangePrepTime] = React.useState(1);

  const [cookTime, onChangeCookTime] = React.useState(1);

  const [ingredients, onChangeIngredients] = React.useState([]);
  const [instructions, onChangeInstructions] = React.useState([]);

  const displayAddIngredients = () => (
    <View style={{ width: 1000 }}>

      {
    ingredients ? (
      <View>
        {ingredients.map((item) => (
          <View>
            <Text style={{ fontSize: 15, fontWeight: '300' }}>
              {item.data.NAME}
            </Text>

          </View>

        ))}
      </View>
    ) : <View><Text>No ingredients yet</Text></View>
   }
    </View>

  );

  const displayAddInstructions = () => (
    <View style={{ width: 1000 }}>

      {
    instructions ? (
      <View>
        {instructions.map((item) => (
          <View>
            <Text style={{ fontSize: 15, fontWeight: '300' }}>
              {item}
            </Text>

          </View>

        ))}
      </View>
    ) : <View><Text>No instructions yet</Text></View>
   }
    </View>
  );

  const onHandleIngredients = async (allIngredients) => {
    console.log(allIngredients);

    const all = [];

    for (let i = 0; i < allIngredients.length; i++) {
      const curr = allIngredients[i];
      const res = await axios.get(`http://127.0.0.1:7777/getCleanIngredient/?sentence=${curr}`);
      all.push(res);
    }
    console.log(all);

    onChangeIngredients(all);
  };

  const setParams = (details) => {
    onChangeName(details.title);
    onChangeDescription(details.category);
    onChangeServings(details.yields);
    onChangePrepTime(details.total_time);
    onChangeCookTime(details.total_time);
    onHandleIngredients(details.ingredients);
    onChangeInstructions(details.instructions_list);
  };

  const getRecipeFromLink = async () => {
    try {
      console.log('here');
      const res = await axios.get(`http://127.0.0.1:7777/recipes/?link=${link}`);
      console.log('here 1');

      setRecipeData(res.data);
      setParams(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (

    <View>
      <Text>Recipe Link</Text>
      <TextInput
        editable
        onChangeText={(text) => setLink(text)}
        value={link}
        style={{ padding: 10 }}
      />
      <Button
        title="Search"
        onPress={() => getRecipeFromLink()}
      />
      {
            recipeData == null
              ? <View><Text>Recipe data NOT received</Text></View>
              : (
                <View>
                  <Text>Recipe data received</Text>
                  <View
                    style={{
                      borderBottomColor: '#000000',
                      borderBottomWidth: 1,
                      width: 400,
                      padding: 20,
                    }}
                  >
                    <Text style={{ fontSize: 25, fontWeight: '500' }}>
                      Name
                    </Text>
                    <TextInput
                      editable
                      maxLength={40}
                      onChangeText={(text) => onChangeName(text)}
                      value={name}
                      style={{ padding: 10 }}
                    />

                    <Text style={{ fontSize: 25, fontWeight: '500' }}>
                      Description
                    </Text>
                    <TextInput
                      editable
                      multiline
                      numberOfLines={4}
                      onChangeText={(text) => onChangeDescription(text)}
                      value={description}
                      style={{ padding: 10 }}
                    />

                    <Text style={{ fontSize: 25, fontWeight: '500' }}>
                      Servings
                    </Text>
                    <TextInput
                      editable
                      maxLength={40}
                      onChangeText={(text) => onChangeServings(text)}
                      value={servings}
                      style={{ padding: 10 }}
                    />

                    <Text style={{ fontSize: 25, fontWeight: '500' }}>
                      Prep Time
                    </Text>
                    <TextInput
                      editable
                      maxLength={40}
                      onChangeText={(text) => onChangePrepTime(text)}
                      value={prepTime}
                      style={{ padding: 10 }}
                    />

                    <Text style={{ fontSize: 25, fontWeight: '500' }}>
                      Cook Time
                    </Text>
                    <TextInput
                      editable
                      maxLength={40}
                      onChangeText={(text) => onChangeCookTime(text)}
                      value={cookTime}
                      style={{ padding: 10 }}
                    />
                    {displayAddIngredients()}
                    {displayAddInstructions()}
                  </View>
                </View>
              )
        }
    </View>

  );
}
