import { Image, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import Styles from '../general-styles';

const MovieDisplay = ({ movie }) => {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={Styles.listitem}>

      {/* Operador ternario (if else) */}

      {imageError ? (
        <Text style={Styles.normaltext}>La imagen no está disponible</Text>
      ) : (
        <Image
          source={{ uri: movie.pictureUrl }}
          style={Styles.image}
          onError={handleImageError}
        />
      )}

      <Text style={Styles.h2text}>Id: {movie.id}</Text>
      <Text style={Styles.h2text}>Nombre: {movie.name}</Text>
      <Text style={Styles.normaltext}>Duración: {movie.duration}</Text>
      <Text style={Styles.normaltext}>Likes: {movie.likes}</Text>
      <Text style={Styles.normaltext}>Rating: {movie.rating}</Text>
      <Text style={Styles.normaltext}>Descripción: {movie.description}</Text>

      {/* Actores */}
      <Text style={Styles.h2text}>Actores:</Text>
      {movie.actors && movie.actors.length > 0 ? (
        movie.actors.map((actor, idx) => (
          <Text key={idx} style={Styles.normaltext}>- {actor}</Text>
        ))
      ) : (
        <Text style={Styles.h2text}>No hay actores disponibles</Text>
      )}

      {/* Categorías */}
      <Text style={Styles.h2text}>Categorías:</Text>
      {movie.categories && movie.categories.length > 0 ? (
        movie.categories.map((category, idx) => (
          <Text key={idx} style={Styles.normaltext}>- {category}</Text>
        ))
      ) : (
        <Text style={Styles.h2text}>No hay categorías disponibles</Text>
      )}

      {/* Valoraciones */}
      <Text style={Styles.h2text}>Valoraciones:</Text>
      {movie.ratings && movie.ratings.length > 0 ? (
        movie.ratings.map((rating, idx) => (
          <Text key={idx} style={Styles.normaltext}>
            - {rating.comment ? `"${rating.comment}"` : "Sin comentario"} ({rating.rating}/5)
          </Text>
        ))
      ) : (
        <Text style={Styles.h2text}>No hay valoraciones disponibles</Text>
      )}

      {/* Usuarios que han dado "like" */}
      <Text style={Styles.h2text}>Usuarios que dieron like:</Text>
      {movie.userLiked && movie.userLiked.length > 0 ? (
        movie.userLiked.map((user, idx) => (
          <Text key={idx} style={Styles.normaltext}>- {user}</Text>
        ))
      ) : (
        <Text style={Styles.h2text}>Nadie ha dado like aún</Text>
      )}

    </View>
  );
}

export default MovieDisplay;