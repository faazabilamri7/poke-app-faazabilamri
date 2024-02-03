import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage/HomePage';
import DetailPokemonPage from '../screens/DetailPage/DetailPage';
import ComparePokemonPage from '../screens/ComparePage/ComparePage';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function HomeTab() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPokemon"
        component={DetailPokemonPage}
        options={{title: 'Detail'}}
      />
    </Stack.Navigator>
  );
}

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeTab}
          options={{
            tabBarIcon: ({size, focused}) => (
              <Icon
                name="home-outline"
                color={focused ? 'red' : 'gray'}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen name="Compare" component={ComparePokemonPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
