
import {Text, View, Button } from 'react-native';
import * as React from 'react';


export default function Home({ navigation }) {
    return (
        <View>
            <Text>Home</Text>
            <Button
                title="Go to Create Recipe"
                onPress={() =>
                    navigation.navigate('CreateRecipe')
                }
            />
        </View>
        
      
    );
  }