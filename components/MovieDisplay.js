import { Image, Text, View } from 'react-native';
import { useState} from 'react';

const MovieDisplay = ({ movie }) => {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };


  return (
    <View className="itemdetail">

      {/* Operador ternario (if else) */}

      {imageError ? (
        <Text className="normaltext">La imagen no está disponible</Text>
      ) : (
        <Image
          className="bigimage"
          source={{ uri: movie.pictureUrl }}
          onError={handleImageError}
          resizeMode="contain"
        />
      )}

      <Text className="h2text">Id: {movie.id}</Text>
      <Text className="h2text">Nombre: {movie.name}</Text>
      <Text className="normaltext">Duración: {movie.duration}</Text>
      <Text className="normaltext">Likes: {movie.likes}</Text>
      <Text className="normaltext">Rating: {movie.rating}</Text>
      <Text className="normaltext">Descripción: {movie.description}</Text>

      {/* Actores */}
      <Text className="h2text">Actores:</Text>
      {movie.actors && movie.actors.length > 0 ? (
        movie.actors.map((actor, idx) => (
          <Text key={idx} className="normaltext">- {actor}</Text>
        ))
      ) : (
        <Text className="h2text">No hay actores disponibles</Text>
      )}

      {/* Categorías */}
      <Text className="h2text">Categorías:</Text>
      {movie.categories && movie.categories.length > 0 ? (
        movie.categories.map((category, idx) => (
          <Text key={idx} className="normaltext">- {category}</Text>
        ))
      ) : (
        <Text className="h2text">No hay categorías disponibles</Text>
      )}

      {/* Valoraciones */}
      <Text className="h2text">Valoraciones:</Text>
      {movie.ratings && movie.ratings.length > 0 ? (
        movie.ratings.map((rating, idx) => (
          <Text key={idx} className="normaltext">
            - {rating.comment ? `"${rating.comment}"` : "Sin comentario"} ({rating.rating}/5)
          </Text>
        ))
      ) : (
        <Text className="h2text">No hay valoraciones disponibles</Text>
      )}

      {/* Usuarios que han dado "like" */}
      <Text className="h2text">Usuarios que dieron like:</Text>
      {movie.userLiked && movie.userLiked.length > 0 ? (
        movie.userLiked.map((user, idx) => (
          <Text key={idx} className="normaltext">- {user}</Text>
        ))
      ) : (
        <Text className="h2text">Nadie ha dado like aún</Text>
      )}

    </View>
  );
}

export default MovieDisplay;