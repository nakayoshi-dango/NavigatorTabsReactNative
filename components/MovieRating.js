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
import useLikeStore from "./useLikeStore";

const MovieRating = ({ movie }) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [rating, setRating] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [loginError, setLoginError] = useState("");
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");
  const { addRating, getRating, ratings } = useRatingStore();
  const auth = FIREBASE_AUTH;
  const [localRating, setLocalRating] = useState(null);
  const { addLike, removeLike, isLiked } = useLikeStore();

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const rating = useRatingStore.getState().getRating(user.email, movie.id);
      if (rating) {
        setLocalRating(rating);
      }
    }
  }, [movie.id, ratings]);

  useEffect(() => {
  const user = auth.currentUser;
  if (user) {
    const existingRating = getRating(user.email, movie.id);
    if (existingRating) {
      setRating(existingRating.rating);
      setComment(existingRating.comment);
    }
  }
}, [movie.id, ratings]); // este era el fallo original también


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

  const handleLike = () => {
    if (isLiked(movie.id)) {
      removeLike(movie.id); // Si ya le dio like, lo elimina
    } else {
      addLike(movie.id); // Si no le dio like, lo agrega
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


  return (
    <View>
      {localRating && (
        <>
          <Text style={styles.h2text}>Tu valoración:</Text>
          <Text style={styles.normaltext} testID="your-rating">
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
        testID="comment-input"
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
        testID="rating-input"
        style={styles.textinput}
        placeholder="Valoración"
        placeholderTextColor="#6b7280"
        value={rating}
        onChangeText={validateRating}
        keyboardType="numeric"
      />
      {ratingError ? <Text style={{ color: "red" }}>{ratingError}</Text> : null}

      {loginError ? <Text style={{ color: "red" }}>{loginError}</Text> : null}

      <Pressable testID="comment-button" onPress={handleRating} style={styles.pressableOpacity}>
        <Text style={styles.boldtext}>Valorar</Text>
      </Pressable>

      <Pressable testID="like-button" onPress={handleLike} style={styles.pressableOpacity}>
        <Text style={styles.boldtext}>{isLiked(movie.id) ? "Quitar like" : "Dar like"}</Text>
      </Pressable>
    </View>
  );
};

export default MovieRating;
