import {
  FlatList,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TextInput,
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import MovieDisplay from "../MovieDisplay";
import useMovieStore from "../useMovieStore";
import { createStackNavigator } from "@react-navigation/stack";
import getGlobalStyles from "../../general-styles";
import useLikeStore from "../useLikeStore";

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView>
      <MovieDisplay movie={movie} />
    </ScrollView>
  );
};

const ListScreen = ({ navigation }) => {
  const likedCount = useLikeStore((state) => state.likedMovies.length);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text testID="liked-count" style={{ marginRight: 16, fontWeight: "bold", fontSize: 16 }}>
          ❤️ {likedCount}
        </Text>
      ),
    });
  }, [navigation, likedCount]);

  const { movies, movieKeys, setMovies, setMovieKeys, mergeMovies } =
    useMovieStore();
  const colorScheme = useColorScheme();
  const styles = getGlobalStyles(colorScheme === "dark");
  const [searchText, setSearchText] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

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
      console.error("Error fetch:", error);
      Alert.alert("Error al cargar películas", error.message);
    }
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        (movie.name || "").toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
    fetchMovies();
  }, [searchText, movies]);

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <TextInput
        testID="searchbar"
        placeholder="Buscar película..."
        value={searchText}
        onChangeText={setSearchText}
        style={{ padding: 8, borderWidth: 1, margin: 10, borderRadius: 5 }}
      />
      <FlatList
        data={filteredMovies}
        keyExtractor={(item, index) => movieKeys[index]}
        renderItem={({ item, index }) => (
          <View key={movieKeys[index]} style={styles.listitem}>
            <TouchableOpacity
              testID={`movie-item-${movieKeys[index]}`}
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
              <Text style={styles.h2text} testID={`movie-title-${movieKeys[index]}`}>{item.name}</Text>
              <Text style={styles.year}>{item.year}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
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
