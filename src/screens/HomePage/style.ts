import {StyleSheet} from 'react-native';
import {customTheme} from '../../theme/customTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'VT323',
    fontSize: 20,
    textAlign: 'center',
    color: customTheme.white,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 25,
    padding: 30,
    marginBottom: 10,
  },
  pokemonList: {
    flex: 1,
    width: '80%',
    backgroundColor: customTheme.yellowShadow,
    borderRadius: 25,
    padding: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
});

export default styles;
