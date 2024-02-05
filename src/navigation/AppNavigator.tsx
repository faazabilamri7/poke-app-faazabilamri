import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {customTheme} from '../theme/customTheme';
import {DetailPokemonPage, HomePage, ComparePage} from '../screens';

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
          tabBarStyle: {
            backgroundColor: customTheme.white,
            paddingTop: 7,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderLeftWidth: 0.2,
            borderRightWidth: 0.2,
            position: 'absolute',
            overflow: 'hidden',
          },
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeTab}
          options={{
            //TODO : fix the TS rules
            tabBarIcon: ({size, focused}) => (
              <Icon
                name="home-outline"
                color={focused ? customTheme.orange : 'gray'}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Compare"
          component={ComparePage}
          options={{
            //TODO : fix the TS rules
            tabBarIcon: ({size, focused}) => (
              <Icon
                name="podium-outline"
                color={focused ? customTheme.orange : 'gray'}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
