import { useState, useEffect } from "react";
import { View, Button, Alert, Text, useColorScheme, ScrollView } from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import FileScreen from "./FileScreen";
import UserDetailsForm from "../UserDetailsForm";
import getGlobalStyles from "../../general-styles";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");

  const handleSignOut = async () => {
    try {
      const response = await signOut(auth);
      console.log("Sesión cerrada correctamente. " + response);
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth user:", currentUser); // Agrega este log para inspeccionar el estado del usuario
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Verificación explícita de que el usuario no es null antes de acceder a sus propiedades
  if (loading) {
    return (
      <View>
        <Text style={styles.h2text}>Cargando estado de autenticación...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {user ? (
        <>
          <Text style={styles.h2text} testID="current-user">
            Usuario conectado: {user.email ? user.email : "No disponible"}
          </Text>
          <UserDetailsForm />
          <Button title="Cerrar Sesión" onPress={handleSignOut} />

          <Text style={styles.h2text}>Firebase Storage</Text>
          <Button
            testID="files"
            title="Archivos"
            onPress={() => navigation.navigate("Files")}
          />
        </>
      ) : (
        <>
          <Button
            title="Iniciar Sesión"
            testID="login-button"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            testID="register-button"
            title="Registrarse"
            onPress={() => navigation.navigate("SignUp")}
          />
        </>
      )}
    </ScrollView>
  );
};

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Files" component={FileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
