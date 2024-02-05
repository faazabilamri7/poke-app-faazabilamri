import React, {useEffect, memo, useState} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {fetchPokemonList} from '../../../redux/slices/pokemonSlice';
import {getPokemonImage} from '../../../services/pokeAPI';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {customTheme} from '../../../theme/customTheme';
import {PokemonList} from '../../../types/Pokemon';
import {capitalizeAndSpace} from '../../../helper/capitalizeAndSpace';
import ImageLoader from '../../atoms/ImageLoader/ImageLoader';

const PokemonItem: React.FC<{
  item: PokemonList;
  onPress: (item: PokemonList) => void;
}> = React.memo(({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <ImageLoader
        uri={getPokemonImage(item.id)}
        imageStyle={styles.pokemonImage}
        width={50}
        height={50}
        isSvg={false}
      />
      <Text style={styles.pokemonName}>
        {item.id}. {capitalizeAndSpace(item.name)}
      </Text>
    </TouchableOpacity>
  );
});

const MemoizedPokemonItem = memo(PokemonItem);

const PokemonListComponent: React.FC<{
  customOnPress: (item: PokemonList) => void;
}> = ({customOnPress}) => {
  const dispatch = useDispatch();
  const {list: pokemonList} = useSelector((state: RootState) => state.pokemon);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    //TODO : fix the TS rules
    // @ts-ignore
    dispatch(fetchPokemonList(25, 0));
  }, [dispatch]);

  const handleEndReached = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      //TODO : fix the TS rules
      // @ts-ignore
      dispatch(fetchPokemonList(25, pokemonList.length)).then(() => {
        setLoadingMore(false);
      });
    }
  };

  return (
    <LinearGradient colors={['#FFCC00', '#FF6600']} style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        data={pokemonList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MemoizedPokemonItem item={item} onPress={customOnPress} />
        )}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        //TODO : fix the TS rules
        // @ts-ignore
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

export default PokemonListComponent;
