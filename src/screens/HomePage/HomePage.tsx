import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Header, PokemonListComponent} from '../../components';
import {customTheme} from '../../theme/customTheme';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

const HomePage: React.FC = () => {
  const navigation = useNavigation();

  const handleDetailNavigation = (selectedPokemon: {id: any}) => {
    //TODO: Fix the TS Rules
    // @ts-ignore
    navigation.navigate('DetailPokemon', {id: selectedPokemon.id});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={[customTheme.orange, customTheme.darkBlue]}
        style={styles.container}>
        <View style={styles.header}>
          <Header title="PokeApp - Faaza Bil Amri" />
          <Image
            source={require('../../assets/images/pokemon-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Learn and Compare your monsters !</Text>
        </View>
        <View style={styles.pokemonList}>
          <PokemonListComponent customOnPress={handleDetailNavigation} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomePage;
