import {StyleSheet} from 'react-native';
import {customTheme} from '../../theme/customTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pokemonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pokemon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonDetails: {
    marginBottom: 10,
  },
  pokemonDetailsName: {
    textAlign: 'center',
  },
  pokemonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  chooseButton: {
    backgroundColor: customTheme.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  comparisonChartContainer: {},
  comparisonChartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartItem: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: customTheme.orange,
    color: customTheme.white,
    marginBottom: 10,
  },
  clearSelectionButtonContainer: {
    marginBottom: 70,
  },
  versus: {
    position: 'absolute',
    top: '30%',
    left: -20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalCloseButtonText: {
    fontSize: 30,
    color: customTheme.orange,
  },
  winnerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: customTheme.white,
  },
});

export default styles;
