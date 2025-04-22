import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../general-styles";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();

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

  const handleSignUp = async () => {
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
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        const user = userCredential.user;
        console.log("Usuario registrado:", user);
        Alert.alert("Éxito", "Usuario registrado correctamente.");
        navigation.navigate("Profile");
      } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={globalStyles.deadcenter}>
      <Text style={globalStyles.h2text}>Registro</Text>
      <TextInput
        style={globalStyles.textinput}
        placeholder="Correo electrónico"
        placeholderTextColor="#6b7280"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
      <TextInput
        style={globalStyles.textinput}
        placeholder="Contraseña"
        placeholderTextColor="#6b7280"
        value={password}
        onChangeText={validatePassword}
        secureTextEntry
      />
      {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
      <Button title="Registrarse" onPress={handleSignUp} />
    </View>
  );
}
