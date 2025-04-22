import { Image, Text, View, StyleSheet } from 'react-native';
import { useState} from 'react';
import globalStyles from '../general-styles';

const MovieDisplay = ({ movie }) => {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={globalStyles.itemdetail}>

      {imageError ? (
        <Text style={globalStyles.normaltext}>La imagen no está disponible</Text>
      ) : (
        <Image
          style={globalStyles.bigimage}
          source={{ uri: movie.pictureUrl }}
          onError={handleImageError}
          resizeMode="contain"
        />
      )}

      <Text style={globalStyles.h2text}>Id: {movie.id}</Text>
      <Text style={globalStyles.h2text}>Nombre: {movie.name}</Text>
      <Text style={globalStyles.normaltext}>Duración: {movie.duration}</Text>
      <Text style={globalStyles.normaltext}>Likes: {movie.likes}</Text>
      <Text style={globalStyles.normaltext}>Rating: {movie.rating}</Text>
      <Text style={globalStyles.normaltext}>Descripción: {movie.description}</Text>

      <Text style={globalStyles.h2text}>Actores:</Text>
      {movie.actors && movie.actors.length > 0 ? (
        movie.actors.map((actor, idx) => (
          <Text key={idx} style={globalStyles.normaltext}>- {actor}</Text>
        ))
      ) : (
        <Text style={globalStyles.h2text}>No hay actores disponibles</Text>
      )}

      <Text style={globalStyles.h2text}>Categorías:</Text>
      {movie.categories && movie.categories.length > 0 ? (
        movie.categories.map((category, idx) => (
          <Text key={idx} style={globalStyles.normaltext}>- {category}</Text>
        ))
      ) : (
        <Text style={globalStyles.h2text}>No hay categorías disponibles</Text>
      )}

      <Text style={globalStyles.h2text}>Valoraciones:</Text>
      {movie.ratings && movie.ratings.length > 0 ? (
        movie.ratings.map((rating, idx) => (
          <Text key={idx} style={globalStyles.normaltext}>
            - {rating.comment ? `"${rating.comment}"` : "Sin comentario"} ({rating.rating}/5)
          </Text>
        ))
      ) : (
        <Text style={globalStyles.h2text}>No hay valoraciones disponibles</Text>
      )}

      <Text style={globalStyles.h2text}>Usuarios que dieron like:</Text>
      {movie.userLiked && movie.userLiked.length > 0 ? (
        movie.userLiked.map((user, idx) => (
          <Text key={idx} style={globalStyles.normaltext}>- {user}</Text>
        ))
      ) : (
        <Text style={globalStyles.h2text}>Nadie ha dado like aún</Text>
      )}

    </View>
  );
}

export default MovieDisplay;