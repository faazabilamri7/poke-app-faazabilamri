import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import ImageLoader from '../../atoms/ImageLoader/ImageLoader';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <ImageLoader
        uri={require('../../../assets/images/pokeball.png')}
        imageStyle={styles.logo}
        width={40}
        height={40}
        isSvg={false}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;
