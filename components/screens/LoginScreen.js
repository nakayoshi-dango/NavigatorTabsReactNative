import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth } from '../../firebaseConfig'; // Ajusta la ruta si es necesario
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario autenticado:', user);
      Alert.alert('Éxito', 'Sesión iniciada correctamente.');
      navigation.navigate('Profile')
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      Alert.alert('Error al iniciar sesión: ', error.message);
    }
  };

  return (
    <View className="deadcenter">
      <Text className="h2text">Iniciar Sesión</Text>
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
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}