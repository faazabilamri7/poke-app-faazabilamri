// styles.ts
import {StyleSheet} from 'react-native';
import {customTheme} from '../../../theme/customTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: customTheme.yellowShadow,
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 0.3,
    elevation: 8,
  },
  pokemonImage: {
    marginRight: 16,
    borderRadius: 25,
  },
  pokemonName: {
    fontFamily: 'VT323',
    fontSize: 25,
    color: customTheme.grey,
  },
  loadingIndicator: {
    marginVertical: 20,
    color: '#000',
  },
});

export default styles;
