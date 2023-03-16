/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import CreateRecipe from './screens/CreateRecipe';
import RecipeDetails from './screens/RecipeDetails';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen name="CreateRecipe" component={CreateRecipe} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />

        </Stack.Navigator>
      </NavigationContainer>

    </QueryClientProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
