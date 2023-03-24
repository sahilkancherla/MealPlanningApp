/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/Home';
import CreateRecipe from './screens/CreateRecipe';
import CreateRecipeFromLink from './screens/CreateRecipeFromLink';

import Discover from './screens/Discover';

import RecipeDetails from './screens/RecipeDetails';
import WeeklySchedule from './screens/WeeklySchedule';
import GroceryList from './screens/GroceryList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();
function HomeStack() {
  return (
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
      <Stack.Screen name="Discover" component={Discover} />

      <Stack.Screen name="CreateRecipe" component={CreateRecipe} />
      <Stack.Screen name="CreateRecipeFromLink" component={CreateRecipeFromLink} />

      <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      <Stack.Screen
        name="WeeklySchedule"
        component={WeeklySchedule}
      />
      <Stack.Screen
        name="GroceryList"
        component={GroceryList}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {HomeStack()}
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
