import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import MovieDisplay from "../MovieDisplay";
import useMovieStore from "../useMovieStore";
import { createStackNavigator } from "@react-navigation/stack";

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params; // Obtenemos los datos de la película desde los parámetros

  return (
    <ScrollView>
      <MovieDisplay movie={movie} />
    </ScrollView>
  );
};

const ListScreen = ({ navigation }) => {
  const { movies, movieKeys, setMovies, setMovieKeys, mergeMovies } =
    useMovieStore();

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://api-w6avz2it7a-uc.a.run.app/movies",
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );

      const data = await response.json();
      const moviesArray = Object.values(data);
      const keysArray = Object.keys(data);

      mergeMovies(moviesArray, keysArray);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <FlatList
      data={movies}
      keyExtractor={(item, index) => movieKeys[index]}
      renderItem={({ item, index }) => (
        <View key={movieKeys[index]} className="listitem">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Movie Details", { movie: item })
            }
          >
            {imageError ? (
              <Text className="normaltext">La imagen no está disponible</Text>
            ) : (
              <Image
                className="bigimage"
                source={{ uri: item.pictureUrl }}
                onError={handleImageError}
                resizeMode="contain"
              />
            )}
            <Text className="h2text">{item.name}</Text>
            <Text>{item.year}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

// Crear el Stack Navigator dentro de la tab de Lista
const Stack = createStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Movie List" component={ListScreen} />
      <Stack.Screen name="Movie Details" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
};

export default ListStack;
