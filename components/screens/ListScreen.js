import { FlatList, View } from "react-native";
import { useEffect } from "react";
import MovieDisplay from "../MovieDisplay";
import useMovieStore from "../useMovieStore";

export default function ListScreen() {
  const { movies, movieKeys, setMovies, setMovieKeys, mergeMovies } = useMovieStore();

  const fetchMovies = async () => {
    try {
      const response = await fetch("https://api-w6avz2it7a-uc.a.run.app/movies", {
        method: "GET",
        headers: { Accept: "application/json" },
      });

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

  return (
    <FlatList
      data={movies}
      keyExtractor={(item, index) => movieKeys[index]}
      renderItem={({ item, index }) => (
        <MovieDisplay
          key={movieKeys[index]}
          movie={item}
        />
      )}
    />
  );
}
