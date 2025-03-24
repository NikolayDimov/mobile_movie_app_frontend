import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

import useFetch from "@/services/usefetch";
import { getMovies } from "@/services/api";

import SearchBar from "@/components/SearchBar";
import MovieDisplayCard from "@/components/MovieCard/movieCard";
import Movie from "@/components/MovieCard/movieCard.static";
import useFilter from "@/utils/search";

const Search = () => {
    const { data: movies, loading, error } = useFetch(() => getMovies());
    const { filteredItems, setSearchQuery } = useFilter<Movie>({ items: movies || [] });
    const [hasStartedTyping, setHasStartedTyping] = useState(false);
    const handleSearchChange = (text: string) => {
        setHasStartedTyping(true);
        setSearchQuery(text);
    };

    return (
        <View style={styles.container}>
            <Image
                source={images.bg}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.movie_id ?? item.title}
                renderItem={({ item }) => <MovieDisplayCard {...item} />}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.contentContainer}
                ListHeaderComponent={
                    <>
                        <View style={styles.logoContainer}>
                            <Image source={icons.logo} style={styles.logo} />
                        </View>

                        <View style={styles.searchContainer}>
                            <SearchBar
                                placeholder="Search for a movie"
                                onChangeText={handleSearchChange}
                            />
                        </View>

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                style={styles.loadingIndicator}
                            />
                        )}

                        {error && (
                            <Text style={styles.errorText}>
                                Error: {error.message}
                            </Text>
                        )}

                        {!loading &&
                            !error &&
                            filteredItems.length > 0 && (
                                <Text style={styles.resultText}>
                                    Search Results for{" "}
                                    <Text style={styles.accentText}>{filteredItems.length}</Text> movies
                                </Text>
                            )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                {hasStartedTyping
                                    ? filteredItems.length === 0
                                        ? "No movies found"
                                        : ""
                                    : "Start typing to search for movies"}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    contentContainer: {
        paddingBottom: 100,
        paddingHorizontal: 16,
    },
    logoContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
        alignItems: "center",
    },
    logo: {
        width: 48,
        height: 40,
    },
    searchContainer: {
        marginVertical: 20,
    },
    columnWrapper: {
        justifyContent: "flex-start",
        gap: 16,
        marginVertical: 16,
    },
    loadingIndicator: {
        marginVertical: 12,
    },
    errorText: {
        color: "red",
        marginHorizontal: 16,
        marginVertical: 12,
    },
    resultText: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "bold",
        marginBottom: 8,
    },
    accentText: {
        color: "#FF5722",
    },
    emptyContainer: {
        marginTop: 40,
        paddingHorizontal: 16,
    },
    emptyText: {
        textAlign: "center",
        color: "#FFFFFF",
    },
});

export default Search;
