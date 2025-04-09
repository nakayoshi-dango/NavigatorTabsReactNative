import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth } from '../../firebaseConfig'; // Ajusta la ruta si es necesario
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario registrado:', user);
      Alert.alert('Éxito', 'Usuario registrado correctamente.');
            navigation.navigate('Profile')
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="deadcenter">
      <Text className="h2text">Registro</Text>
      <TextInput className="textinput"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput className="textinput"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleSignUp} />
    </View>
  );
}