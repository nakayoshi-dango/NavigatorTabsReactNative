import { Image, useColorScheme } from "react-native";
import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import getGlobalStyles from "./general-styles";
import { StartScreen, ListScreen, ProfileScreen } from "./components/screens";


const App = () => {
  const Tab = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");
  return (
    // Toda app con un Navigator debe tener un NavigationContainer como elemento raíz
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Inicio"
          component={StartScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={require("./assets/home.png")}
                style={styles.icons}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Listado"
          component={ListScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={require("./assets/list.png")}
                style={styles.icons}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={require("./assets/profile.png")}
                style={styles.icons}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
