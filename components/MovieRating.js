import React, { useState, useEffect } from "react";
import {
  Text,
  Pressable,
  TextInput,
  Alert,
  useColorScheme,
  View,
} from "react-native";
import getGlobalStyles from "../general-styles";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useRatingStore } from "./useRatingStore";
import { getAuth } from "firebase/auth";

const MovieRating = ({ movie }) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [rating, setRating] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [loginError, setLoginError] = useState("");
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");
  const { addRating, getRating } = useRatingStore();
  const auth = FIREBASE_AUTH;
  const [localRating, setLocalRating] = useState(null);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const rating = useRatingStore.getState().getRating(user.email, movie.id);
      if (rating) {
        setLocalRating(rating);
      }
    }
  }, [movie.id]);

  const isValidRating = (rating) => {
    const numberRegex = /^[0-5]$/;
    return numberRegex.test(rating);
  };

  const validateRating = (text) => {
    setRating(text);
    if (!text) {
      setRatingError("La valoración es obligatoria.");
    } else if (!isValidRating(text)) {
      setRatingError("La valoración debe ser entre 0 y 5");
    } else {
      setRatingError("");
    }
  };

  const validateComment = (text) => {
    setComment(text);
    if (!text) {
      setCommentError("El comentario es obligatorio.");
    } else {
      setCommentError("");
    }
  };

  const handleRating = async () => {
    let isValid = true;

    if (!rating) {
      setRatingError("La valoración es obligatoria.");
      isValid = false;
    } else if (!isValidRating(rating)) {
      setRatingError("La valoración debe ser entre 0 y 5");
      isValid = false;
    } else {
      setRatingError("");
    }

    if (!comment) {
      setCommentError("El comentario es obligatorio.");
      isValid = false;
    } else {
      setCommentError("");
    }

    // Verificamos si el usuario está autenticado
    const user = auth.currentUser?.email;
    if (!user) {
      setLoginError("Debes estar logueado para valorar una película.");
      isValid = false;
    } else {
      setLoginError("");
    }

    if (isValid) {
      try {
        // Llamamos a la función de Zustand para guardar la valoración
        addRating(user, movie.id, {
          rating,
          comment,
        });

        Alert.alert("Éxito", "Película valorada.");
      } catch (error) {
        console.error("Error al valorar película:", error.message);
        Alert.alert("Error al valorar película: ", error.message);
      }
    }
  };

  // Verificamos si ya hay una valoración almacenada para esta película
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Accedemos a las valoraciones usando el hook correctamente
      const existingRating = getRating(user.email, movie.id); // Obtenemos la valoración si existe
      if (existingRating) {
        setRating(existingRating.rating);
        setComment(existingRating.comment);
      }
    }
  }, [movie.id, getRating]); // Aseguramos que getRating esté disponible

  return (
    <View>
      {localRating && (
        <>
          <Text style={styles.h2text}>Tu valoración:</Text>
          <Text style={styles.normaltext}>
            {localRating.comment
              ? `"${localRating.comment}"`
              : "Sin comentario"}{" "}
            ({localRating.rating}/5)
          </Text>
        </>
      )}

      <Text style={styles.h2text}>Valorar</Text>

      <TextInput
        style={styles.textinput}
        placeholder="Comentario"
        placeholderTextColor="#6b7280"
        value={comment}
        onChangeText={validateComment}
        keyboardType="default"
      />
      {commentError ? (
        <Text style={{ color: "red" }}>{commentError}</Text>
      ) : null}

      <TextInput
        style={styles.textinput}
        placeholder="Valoración"
        placeholderTextColor="#6b7280"
        value={rating}
        onChangeText={validateRating}
        keyboardType="numeric"
      />
      {ratingError ? <Text style={{ color: "red" }}>{ratingError}</Text> : null}

      {loginError ? <Text style={{ color: "red" }}>{loginError}</Text> : null}

      <Pressable onPress={handleRating} style={styles.pressableOpacity}>
        <Text style={styles.boldtext}>Valorar</Text>
      </Pressable>
    </View>
  );
};

export default MovieRating;
