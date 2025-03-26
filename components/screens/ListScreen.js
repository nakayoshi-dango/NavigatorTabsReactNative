import { FlatList, View } from 'react-native';
import { useState, useEffect } from 'react';
import MovieDisplay from '../MovieDisplay';

export default function ListScreen() {
    const [movies, setMovies] = useState([]);
    const [movieKeys, setMovieKeys] = useState([]);

    const fetchMovies = async () => {
        try {
            const response = await fetch('https://api-w6avz2it7a-uc.a.run.app/movies', {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
            });
            const data = await response.json();
            const moviesArray = Object.values(data);
            const keysArray = Object.keys(data);  // Obtén las claves del mapa (índices de las películas)
            setMovies(moviesArray);
            setMovieKeys(keysArray);  // Guarda las claves en el estado
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <FlatList
            data={movies}
            keyExtractor={(item, index) => movieKeys[index]} // Usa las claves originales de las películas como key
            renderItem={({ item, index }) => (
                <MovieDisplay key={movieKeys[index]} index={movieKeys[index]} movie={item} />
            )}
        />
    );
}