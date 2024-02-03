import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  fetchPokemonDetails,
  clearSelectedPokemon,
} from '../../redux/slices/pokemonSlice';
import {getPokemonImage} from '../../services/pokeAPI';
import Icon from 'react-native-vector-icons/Ionicons';

type DetailPokemonRouteProps = {
  DetailPokemon: {
    id: number;
  };
};

const DetailPokemonPage: React.FC = () => {
  const route = useRoute<RouteProp<DetailPokemonRouteProps, 'DetailPokemon'>>();
  const {id} = route.params;

  const dispatch = useDispatch();
  const {detailPokemon, loading} = useSelector(
    (state: RootState) => state.pokemon,
  );

  useEffect(() => {
    dispatch(fetchPokemonDetails(id));

    return () => {
      // Clear selectedPokemon when the component unmounts
      dispatch(clearSelectedPokemon());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!detailPokemon) {
    return (
      <View>
        <Text>No Pokemon details found</Text>
      </View>
    );
  }

  const {name, height, weight, types} = detailPokemon;

  return (
    <View style={styles.container}>
      <Image source={{uri: getPokemonImage(id)}} style={styles.pokemonImage} />
      <Icon name="ios-person" size={30} color="#4F8EF7" />
      {/* Pokemon Information */}
      <View style={styles.section}>
        <Text style={styles.headerText}>{name}</Text>
        <Text>Height: {height}</Text>
        <Text>Weight: {weight}</Text>
        <Text>Types: {types.join(', ')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    borderRadius: 25,
  },
  section: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DetailPokemonPage;
