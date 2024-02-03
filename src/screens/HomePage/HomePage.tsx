import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Header, PokemonListComponent} from '../../components';
import {customTheme} from '../../theme/customTheme';
import styles from './style';

const HomePage: React.FC = () => {
  return (
    <LinearGradient
      colors={[customTheme.orange, customTheme.darkBlue]} // Add your desired gradient colors
      style={styles.container}>
      <View style={styles.header}>
        <Header title="Faaza Bil Amri" />
        <Image
          source={require('../../assets/images/pokemon-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Learn and Compare your monsters !</Text>
      </View>
      <View style={styles.pokemonList}>
        <PokemonListComponent />
      </View>
    </LinearGradient>
  );
};

export default HomePage;
