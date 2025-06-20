import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  useColorScheme,
} from "react-native";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import getGlobalStyles from "../../general-styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmail = (text) => {
    setEmail(text);
    if (!text) {
      setEmailError("El correo electrónico es obligatorio.");
    } else if (!isValidEmail(text)) {
      setEmailError("El correo electrónico no es válido.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (!text) {
      setPasswordError("La contraseña es obligatoria.");
    } else {
      setPasswordError("");
    }
  };

  const sendResetPassword = async () => {
    if (!email) {
      setEmailError("El correo electrónico es obligatorio.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("El correo electrónico no es válido.");
      isValid = false;
    } else {
      setEmailError("");
    }
    try {
      sendPasswordResetEmail(auth, email);
      Alert.alert("Enviado", "Correo de recuperación enviado.");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      Alert.alert("Error al iniciar sesión: ", error.message);
    }
  };

  const handleLogin = async () => {
    let isValid = true;

    if (!email) {
      setEmailError("El correo electrónico es obligatorio.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("El correo electrónico no es válido.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Usuario autenticado:", user);
        Alert.alert("Éxito", "Sesión iniciada correctamente.");
        navigation.navigate("Profile");
      } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        Alert.alert("Error al iniciar sesión: ", error.message);
      }
    }
  };

  return (
    <View style={styles.deadcenter}>
      <Text style={styles.h2text}>Iniciar Sesión</Text>
      <TextInput
        testID="login-email"
        style={styles.textinput}
        placeholder="Correo electrónico"
        placeholderTextColor="#6b7280"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={{ color: "red" }}>{emailError}</Text> : null}
      <TextInput
        testID="login-password"
        style={styles.textinput}
        placeholder="Contraseña"
        placeholderTextColor="#6b7280"
        value={password}
        onChangeText={validatePassword}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={{ color: "red" }}>{passwordError}</Text>
      ) : null}
      <Button title="Iniciar Sesión" testID="login-login-button" onPress={handleLogin} />
      <Button title="Restablecer contraseña" onPress={sendResetPassword} />
    </View>
  );
}
