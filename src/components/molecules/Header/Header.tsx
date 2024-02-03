// Header.tsx
import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/pokeball.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>PokeApp - {title}</Text>
    </View>
  );
};

export default Header;
