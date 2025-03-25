import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Styles from './general-styles';
import {StartScreen, ListScreen, ProfileScreen} from './components/screens';


// Create the Tab Navigator
const Tab = createBottomTabNavigator();

// Main

export default function App() {
  return (
    // Every app with a navigator should have a NavigationContainer as the root element 
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Inicio" 
          component={StartScreen} 
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/home.png')} style={Styles.icons} />
            ),
          }}
        />
        <Tab.Screen 
          name="Listado" 
          component={ListScreen} 
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/list.png')} style={Styles.icons} />
            ),
          }}
        />
        <Tab.Screen 
          name="Perfil" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/profile.png')} style={Styles.icons} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
