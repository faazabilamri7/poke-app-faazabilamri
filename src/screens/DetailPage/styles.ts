import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginBottom: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  section: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
    gap: 30,
  },
  sectionAbilities: {
    marginVertical: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    gap: 10,
  },
  innerSection: {},
  type: {justifyContent: 'flex-start'},
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  selectedTab: {
    backgroundColor: '#ddd',
  },
  tabText: {
    fontWeight: 'bold',
  },
});

export default styles;
