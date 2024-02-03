import React, {useEffect, memo, useState} from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {fetchPokemonList} from '../../../redux/slices/pokemonSlice';
import {capitalizeFirstLetter} from '../../../helper/capitalizeFirstLetter';
import {getPokemonImage} from '../../../services/pokeAPI';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {customTheme} from '../../../theme/customTheme';
import {PokemonList} from '../../../types/Pokemon';

// Define the PokemonItem component
const PokemonItem: React.FC<{item: PokemonList}> = React.memo(({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailPokemon', {id: item.id})}>
      <Image
        source={{uri: getPokemonImage(item.id)}}
        style={styles.pokemonImage}
      />
      <Text style={styles.pokemonName}>
        {item.id}. {capitalizeFirstLetter(item.name)}
      </Text>
    </TouchableOpacity>
  );
});

// Memoize the PokemonItem component
const MemoizedPokemonItem = memo(PokemonItem);

// Define the PokemonListComponent
const PokemonListComponent: React.FC = () => {
  const dispatch = useDispatch();
  const {list: pokemonList} = useSelector((state: RootState) => state.pokemon);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchPokemonList(25, 0));
  }, [dispatch]);

  // Fetch more data when reaching the end of the list
  const handleEndReached = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      dispatch(fetchPokemonList(25, pokemonList.length)).then(() => {
        setLoadingMore(false);
      });
    }
  };

  // Render the FlatList with MemoizedPokemonItem and loading indicator
  return (
    <LinearGradient colors={['#FFCC00', '#FF6600']} style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        data={pokemonList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <MemoizedPokemonItem item={item} />}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loadingMore && (
            <ActivityIndicator
              size="large"
              color={customTheme.darkBlue}
              style={styles.loadingIndicator}
            />
          )
        }
      />
    </LinearGradient>
  );
};

// Export the PokemonListComponent as the default component
export default PokemonListComponent;
