import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useUserDetailsStore } from "./useUserDetailsStore";
import getGlobalStyles from "../general-styles";

const UserDetailsForm = () => {
  const { getUserDetails, setUserDetails } = useUserDetailsStore();
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");

  const [displayName, setDisplayName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [genderVist, setGenderVist] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const details = getUserDetails();
    setDisplayName(details.displayName || "");
    setSurname(details.surname || "");
    setPhoneNumber(details.phoneNumber || "");
    setGenderVist(details.genderVist || "");
    setDateOfBirth(details.dateOfBirth || "");
  }, []);

  const validatePhoneNumber = (number) => /^[0-9]{9}$/.test(number);
  const validateDate = (date) =>
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(date);

  const handleSave = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("El número de teléfono debe tener exactamente 9 dígitos.");
      return;
    }

    if (!validateDate(dateOfBirth)) {
      setError("La fecha debe tener el formato dd/mm/yyyy.");
      return;
    }

    if (!genderVist) {
      setError("Debe seleccionar un género.");
      return;
    }

    setUserDetails({
      displayName,
      surname,
      phoneNumber,
      genderVist,
      dateOfBirth,
    });

    Alert.alert("Éxito", "Datos guardados correctamente.");
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text>Nombre</Text>
      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Introduce tu nombre"
        style={styles.inputStyle}
      />

      <Text>Apellido</Text>
      <TextInput
        value={surname}
        onChangeText={setSurname}
        placeholder="Introduce tu apellido"
        style={styles.inputStyle}
      />

      <Text>Teléfono</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        maxLength={9}
        placeholder="123456789"
        style={styles.inputStyle}
      />

      <Text>Fecha de nacimiento</Text>
      <TextInput
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholder="dd/mm/yyyy"
        style={styles.inputStyle}
      />

      <Text>Género</Text>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {["hombre", "mujer"].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setGenderVist(option)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#333",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              {genderVist === option && (
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: "#333",
                  }}
                />
              )}
            </View>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {error !== "" && (
        <Text style={{ color: "red", marginBottom: 15 }}>{error}</Text>
      )}

      <Button title="Guardar cambios" onPress={handleSave} />
    </ScrollView>
  );
};

export default UserDetailsForm;
