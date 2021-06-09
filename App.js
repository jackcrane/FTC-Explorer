// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home.js';
import EventDetails from './components/EventDetails.js';

function HomeScreen({ navigation }) {
  return (
    <Home nav={navigation} />
  );
}

function DetailsScreen({ route, navigation }) {
  const { eventId } = route.params;
  return (
    <EventDetails seasonYear='2020' eventCode={eventId} nav={navigation} />
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Event Details" component={DetailsScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
