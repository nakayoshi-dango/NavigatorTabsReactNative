import { Image, useColorScheme } from "react-native";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import getGlobalStyles from "./general-styles";
import NotificationsManager from "./components/NotificationsManager";
import { StartScreen, ListScreen, ProfileScreen } from "./components/screens";
import HomeIcon from './assets/icons/home-icon.svg';
import ListIcon from './assets/icons/list-icon.svg';
import ProfileIcon from './assets/icons/profile-icon.svg';


const App = () => {
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");
  useEffect(() => {
    // Pedir permisos para notificaciones
    NotificationsManager.requestUserPermission();

    NotificationsManager.getDeviceToken();
    
    // Suscribirse a un canal
    NotificationsManager.subscribeToTopic('general');
    
    // Escuchar notificaciones
    NotificationsManager.listenForNotifications();
  }, []);
  return (
    // Toda app con un Navigator debe tener un NavigationContainer como elemento raíz
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Inicio"
          component={StartScreen}
          options={{
            tabBarIcon: () => (
              <HomeIcon width={24} height={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Listado"
          component={ListScreen}
          testID="Listado"
          options={{
            tabBarIcon: () => (
              <ListIcon width={24} height={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          testID="Perfil"
          options={{
            tabBarIcon: () => (
              <ProfileIcon width={24} height={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
