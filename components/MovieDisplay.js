import { Image, Text, View, useColorScheme } from "react-native";
import { useState } from "react";
import getGlobalStyles from "../general-styles";

const MovieDisplay = ({ movie }) => {
  const [imageError, setImageError] = useState(false);
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={styles.itemdetail}>
      {imageError ? (
        <Text style={styles.normaltext}>La imagen no está disponible</Text>
      ) : (
        <Image
          style={styles.bigimage}
          source={{ uri: movie.pictureUrl }}
          onError={handleImageError}
          resizeMode="contain"
        />
      )}

      <Text style={styles.h2text}>Id: {movie.id}</Text>
      <Text style={styles.h2text}>Nombre: {movie.name}</Text>
      <Text style={styles.normaltext}>Duración: {movie.duration}</Text>
      <Text style={styles.normaltext}>Likes: {movie.likes}</Text>
      <Text style={styles.normaltext}>Rating: {movie.rating}</Text>
      <Text style={styles.normaltext}>Descripción: {movie.description}</Text>

      <Text style={styles.h2text}>Actores:</Text>
      {movie.actors && movie.actors.length > 0 ? (
        movie.actors.map((actor, idx) => (
          <Text key={idx} style={styles.normaltext}>
            - {actor}
          </Text>
        ))
      ) : (
        <Text style={styles.h2text}>No hay actores disponibles</Text>
      )}

      <Text style={styles.h2text}>Categorías:</Text>
      {movie.categories && movie.categories.length > 0 ? (
        movie.categories.map((category, idx) => (
          <Text key={idx} style={styles.normaltext}>
            - {category}
          </Text>
        ))
      ) : (
        <Text style={styles.h2text}>No hay categorías disponibles</Text>
      )}

      <Text style={styles.h2text}>Valoraciones:</Text>
      {movie.ratings && movie.ratings.length > 0 ? (
        movie.ratings.map((rating, idx) => (
          <Text key={idx} style={styles.normaltext}>
            - {rating.comment ? `"${rating.comment}"` : "Sin comentario"} (
            {rating.rating}/5)
          </Text>
        ))
      ) : (
        <Text style={styles.h2text}>No hay valoraciones disponibles</Text>
      )}

      <Text style={styles.h2text}>Usuarios que dieron like:</Text>
      {movie.userLiked && movie.userLiked.length > 0 ? (
        movie.userLiked.map((user, idx) => (
          <Text key={idx} style={styles.normaltext}>
            - {user}
          </Text>
        ))
      ) : (
        <Text style={styles.h2text}>Nadie ha dado like aún</Text>
      )}
    </View>
  );
};

export default MovieDisplay;
