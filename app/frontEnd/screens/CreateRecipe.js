/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, Button, TextInput,
} from 'react-native';
import * as React from 'react';
import axios from 'axios';
import apiClient from '../http-common';

export default function CreateRecipe({ navigation }) {
  // General
  const [name, onChangeName] = React.useState('Name');

  const [description, onChangeDescription] = React.useState('Description');

  const [servings, onChangeServings] = React.useState(1);

  const [prepTime, onChangePrepTime] = React.useState(1);

  const [cookTime, onChangeCookTime] = React.useState(1);

  const [ingredients, onChangeIngredients] = React.useState([]);

  const [instructions, onChangeInstructions] = React.useState([]);

  // Ingredient params

  const [ingredientName, onChangeIngredientName] = React.useState('Ingredient Name');
  const [quantity, onChangeQuantity] = React.useState(1);
  const [metric, onChangeMetric] = React.useState('Metric');

  // Instruction params

  const [stepNumber, onChangeStepNumber] = React.useState(1);
  const [instructionDescription, onChangeInstructionDescription] = React.useState('Instruction description');

  // add new ingredient
  const addIngredient = () => {
    const newIngredient = {
      ingredientName,
      quantity,
      metric,
    };

    const updateIngredients = [
      // copy the current users state
      ...ingredients,
      // now you can add a new object to add to the array
      newIngredient,
    ];
    onChangeIngredients(updateIngredients);
  };

  // add new instruction

  const addInstruction = () => {
    const newInstruction = {
      stepNumber,
      instructionDescription,
    };

    const updateInstructions = [
      // copy the current users state
      ...instructions,
      // now you can add a new object to add to the array
      newInstruction,
    ];
    onChangeInstructions(updateInstructions);
    onChangeStepNumber(stepNumber + 1);
  };

  // make new recipe
  const makeRecipe = async () => {
    const recipe = {
      user: 'Test',
      name,
      description,
      servings,
      prepTime,
      cookTime,
      ingredients,
      instructions,
    };
    axios.post('http://localhost:3000/api/postRecipe', recipe)
      .then((res) => {
        console.log(res.data);
      }).catch((error) => {
        console.log(error);
      });
    navigation.navigate('Home');
  };

  const displayAddIngredients = () => (
    <View>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => onChangeIngredientName(text)}
        value={ingredientName}
        style={{ padding: 10 }}
      />
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => onChangeQuantity(text)}
        value={quantity}
        style={{ padding: 10 }}
      />

      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => onChangeMetric(text)}
        value={metric}
        style={{ padding: 10 }}
      />

      <Button
        title="Add Ingredient"
        onPress={() => addIngredient()}
      />
      {
    ingredients ? (
      <View>
        {ingredients.map((item) => (
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
    ) : <View><Text>No ingredients yet</Text></View>
   }

    </View>
  );

  const displayAddInstructions = () => (
    <View style={{ backgroundColor: 'white', width: 1000 }}>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => onChangeInstructionDescription(text)}
        value={instructionDescription}
        style={{ padding: 10 }}
      />

      <Button
        title="Add Instruction"
        onPress={() => addInstruction()}
      />
      {
    instructions ? (
      <View>
        {instructions.map((item) => (
          <View>
            <Text style={{ fontSize: 20, fontWeight: '300' }}>{item.stepNumber}</Text>
            <Text style={{ fontSize: 15, fontWeight: '300' }}>
              {item.instructionDescription}
            </Text>

          </View>

        ))}
      </View>
    ) : <View><Text>No instructions yet</Text></View>
   }
    </View>
  );

  return (
    <View>
      <View
        style={{
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          width: 400,
          padding: 20,
        }}
      >
        <Button
          title="Go back"
          onPress={() => navigation.navigate('Home')}
        />
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

        {/* Add ingredients */}
        <Text style={{ fontSize: 25, fontWeight: '500' }}>
          Ingredients
        </Text>
        {displayAddIngredients()}

        {/* Add instructions */}
        <Text style={{ fontSize: 25, fontWeight: '500' }}>
          Instructions
        </Text>
        {displayAddInstructions()}

        <View style={{ width: 500, margin: 20, justifyContent: 'center' }}>
          <Button
            title="Submit"
            onPress={() => makeRecipe()}
          />

        </View>

      </View>
    </View>

  );
}
