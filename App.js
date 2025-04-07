import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import styles from './general-styles';
import {StartScreen, ListScreen, ProfileScreen} from './components/screens';
import "./global.css"


// Instanciar el Tab Navigator
const Tab = createBottomTabNavigator();

// Main

export default function App() {
  return (
    // Toda app con un Navigator debe tener un NavigationContainer como elemento raíz 
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Inicio" 
          component={StartScreen} 
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/home.png')} style={styles.icons} />
            ),
          }}
        />
        <Tab.Screen 
          name="Listado" 
          component={ListScreen} 
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/list.png')} style={styles.icons} />
            ),
          }}
        />
        <Tab.Screen 
          name="Perfil" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: () => (
              <Image source={require('./assets/profile.png')} style={styles.icons} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
