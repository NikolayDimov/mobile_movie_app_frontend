import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { icons } from '@/constants/icons';
import useFetch from "@/services/usefetch";
import { getMovieDetails } from "@/services/api";

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View style={styles.infoContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || 'N/A'}</Text>
    </View>
);

const MovieDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    console.log('id', id);
    const { data: movie, loading, error } = useFetch(() =>
        getMovieDetails(id as string)
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#fff" style={styles.loader} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    const movieYear = movie?.release_date?.split("-")[0] ?? 'N/A';

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View>
                    <Image
                        source={movie?.image}
                        style={styles.image}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{movie?.title}</Text>
                    <View style={styles.yearAndRuntime}>
                        <Text style={styles.year}>{movieYear} •</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Image source={icons.star} style={styles.starIcon} />
                    </View>

                    <MovieInfo label="Overview" value={movie?.description} />
                    <MovieInfo label="Genres" value={movie?.genre} />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.goBackButton} onPress={router.back}>
                <Image source={icons.arrow} style={styles.arrowIcon} tintColor="#fff" />
                <Text style={styles.goBackText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161622",
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    image: {
        width: '100%',
        height: 550,
        resizeMode: "cover"
    },
    detailsContainer: {
        padding: 16,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    yearAndRuntime: {
        flexDirection: 'row',
        marginTop: 8,
    },
    year: {
        color: '#aaa',
        fontSize: 14,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        padding: 8,
        borderRadius: 8,
        marginTop: 12,
    },
    starIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    rating: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    voteCount: {
        color: '#aaa',
        fontSize: 12,
    },
    infoContainer: {
        marginTop: 12,

    },
    label: {
        color: '#A8B5DB',
        fontSize: 14,
        fontWeight: '400',
    },
    value: {
        color: '#D6C6FF',
        fontSize: 14,
        fontWeight: '700',
        marginTop: 8,
    },
    financialsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    goBackButton: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
        backgroundColor: '#AB8BFF',
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
        transform: [{ rotate: '180deg' }],
    },
    goBackText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default MovieDetails;
