import {StyleSheet} from 'react-native';
import {customTheme} from '../../../theme/customTheme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: customTheme.lightBlue,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 16,
  },
  title: {
    fontFamily: 'VT323',
    fontSize: 20,
    fontWeight: 'bold',
    color: customTheme.white,
  },
});

export default styles;
