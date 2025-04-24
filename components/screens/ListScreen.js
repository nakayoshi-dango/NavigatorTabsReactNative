import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useEffect, useState } from "react";
import MovieDisplay from "../MovieDisplay";
import useMovieStore from "../useMovieStore";
import { createStackNavigator } from "@react-navigation/stack";
import getGlobalStyles from "../../general-styles";

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView>
      <MovieDisplay movie={movie} />
    </ScrollView>
  );
};

const ListScreen = ({ navigation }) => {
  const { movies, movieKeys, setMovies, setMovieKeys, mergeMovies } =
    useMovieStore();
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");
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
      Alert.alert("Error al cargar películas", error.message);
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
        <View key={movieKeys[index]} style={styles.listitem}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Movie Details", { movie: item })
            }
          >
            {imageError ? (
              <Text style={styles.normaltext}>
                La imagen no está disponible
              </Text>
            ) : (
              <Image
                style={styles.bigimage}
                source={{ uri: item.pictureUrl }}
                onError={handleImageError}
                resizeMode="contain"
              />
            )}
            <Text style={styles.h2text}>{item.name}</Text>
            <Text style={styles.year}>{item.year}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  year: {
    color: "black", // Ejemplo de estilo específico
    fontSize: 12,
  },
  description: {
    color: "gray", // Ejemplo de estilo específico
    fontSize: 10,
  },
});

const Stack = createStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator initialRouteName="Movie List">
      <Stack.Screen name="Movie List" component={ListScreen} />
      <Stack.Screen name="Movie Details" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
};

export default ListStack;
