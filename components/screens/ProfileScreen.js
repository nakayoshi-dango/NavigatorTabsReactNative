import { useState, useEffect } from "react";
import { View, Button, Alert, Text } from "react-native";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada correctamente.");
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Usuario conectado
        setUser(authUser);
      } else {
        // Usuario desconectado
        setUser(null);
      }
      setLoading(false);
    });

    // Importante: Cancela la suscripción cuando el componente se desmonte
    return unsubscribe;
  }, []);

  return (
    <View>
      {loading ? (
        <Text >Cargando estado de autenticación...</Text>
      ) : user ? (
        <>
          <Text className="h2text">Usuario conectado: {user.email}</Text>
          <Button title="Cerrar Sesión" onPress={handleSignOut} />
        </>
      ) : (
        <>
          <Button
            title="Iniciar Sesión"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            title="Registrarse"
            onPress={() => navigation.navigate("SignUp")}
          />
        </>
      )}
    </View>
  );
};

const Stack = createStackNavigator();

const ProfileStack = () => {
  return ( 
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;