import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  selectPokemon1,
  selectPokemon2,
  clearSelectedComparePokemon,
  fetchPokemonDetails2,
  fetchPokemonDetails1,
  setLoadingPokemonDetails1,
  setLoadingPokemonDetails2,
} from '../../redux/slices/pokemonSlice';
import {BarChart} from 'react-native-chart-kit';
import {Header, Placeholder, PokemonListComponent} from '../../components';
import {capitalizeAndSpace} from '../../helper/capitalizeAndSpace';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageLoader from '../../components/atoms/ImageLoader/ImageLoader';
import {customTheme} from '../../theme/customTheme';

const ComparePage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    selectedPokemon1,
    selectedDetailPokemon1,
    selectedDetailPokemon2,
    selectedPokemon2,
    loadingPokemonDetails1,
    loadingPokemonDetails2,
  } = useSelector((state: RootState) => state.pokemon);

  const [isDialog1Open, setIsDialog1Open] = useState(false);
  const [isDialog2Open, setIsDialog2Open] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPokemon1) {
        dispatch(setLoadingPokemonDetails1(true));
        try {
          //TODO: Fix the TS Rules
          // @ts-ignore
          await dispatch(fetchPokemonDetails1(selectedPokemon1.id));
        } catch (error) {
          console.error(
            'Error fetching Pokemon details for first Pokemon:',
            error,
          );
        } finally {
          dispatch(setLoadingPokemonDetails1(false));
        }
      }

      if (selectedPokemon2) {
        dispatch(setLoadingPokemonDetails2(true));
        try {
          //TODO: Fix the TS Rules
          // @ts-ignore
          await dispatch(fetchPokemonDetails2(selectedPokemon2.id));
        } catch (error) {
          console.error(
            'Error fetching Pokemon details for second Pokemon:',
            error,
          );
        } finally {
          dispatch(setLoadingPokemonDetails2(false));
        }
      }
    };

    fetchData();
  }, [dispatch, selectedPokemon1, selectedPokemon2]);

  const openDialog1 = () => {
    setIsDialog1Open(true);
  };

  const openDialog2 = () => {
    setIsDialog2Open(true);
  };

  const closeDialog = () => {
    setIsDialog1Open(false);
    setIsDialog2Open(false);
  };

  const clearSelection = () => {
    dispatch(clearSelectedComparePokemon());
  };

  const getWinner = (
    stat1: {base_stat: any; effort?: number; stat?: {name: string}},
    stat2:
      | {base_stat: number; effort: number; stat: {name: string}}
      | undefined,
  ) => {
    //TODO: Fix the TS Rules
    // @ts-ignore
    if (stat1.base_stat > stat2.base_stat) {
      //TODO: Fix the TS Rules
      // @ts-ignore
      return capitalizeAndSpace(selectedDetailPokemon1.name);
      //TODO: Fix the TS Rules
      // @ts-ignore
    } else if (stat1.base_stat < stat2.base_stat) {
      //TODO: Fix the TS Rules
      // @ts-ignore
      return capitalizeAndSpace(selectedDetailPokemon2.name);
    } else {
      return 'Draw';
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Header title="Let's Compare Pokemons !" />
        <View style={styles.pokemonContainer}>
          {renderPokemonSection(
            'Pokemon 1',
            selectedPokemon1,
            selectedDetailPokemon1,
            openDialog1,
          )}
          <ImageLoader
            uri={require('../../assets/images/versus.png')}
            imageStyle={styles.versus}
            width={50}
            height={40}
            isSvg={false}
          />
          {renderPokemonSection(
            'Pokemon 2',
            selectedPokemon2,
            selectedDetailPokemon2,
            openDialog2,
          )}
        </View>
        {loadingPokemonDetails1 || loadingPokemonDetails2 ? (
          <ActivityIndicator size="large" color={customTheme.orange} />
        ) : selectedDetailPokemon1 && selectedDetailPokemon2 ? (
          <View style={styles.comparisonChartContainer}>
            <Text style={styles.comparisonChartTitle}>Comparison Chart</Text>
            {selectedDetailPokemon1.stats.map(stat1 => {
              const matchingStat2 = selectedDetailPokemon2.stats.find(
                stat2 => stat2.stat.name === stat1.stat.name,
              );

              return (
                <View key={stat1.stat.name} style={styles.chartItem}>
                  <Text style={styles.chartTitle}>
                    {capitalizeAndSpace(stat1.stat.name)}{' '}
                    <Text style={styles.winnerText}>
                      ( Winner: {getWinner(stat1, matchingStat2)} )
                    </Text>
                  </Text>
                  {/* TODO: fix the TS rules */}
                  <BarChart
                    data={{
                      labels: [
                        selectedDetailPokemon1.name,
                        selectedDetailPokemon2.name,
                      ],
                      datasets: [
                        {
                          data: [stat1.base_stat, matchingStat2.base_stat],
                        },
                      ],
                    }}
                    width={350}
                    height={200}
                    chartConfig={{
                      backgroundColor: '#e26a00',
                      backgroundGradientFrom: '#fb8c00',
                      backgroundGradientTo: '#ffa726',
                      decimalPlaces: 2,

                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                      },
                    }}
                    showValuesOnTopOfBars={true}
                    showBarTops={true}
                    fromZero={true}
                    withHorizontalLabels={true}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={{textAlign: 'center'}}>
            Please select both Pokemon for comparison
          </Text>
        )}

        {loadingPokemonDetails1 || loadingPokemonDetails2 ? null : (
          <View style={styles.clearSelectionButtonContainer}>
            <Button title="Clear Selection" onPress={clearSelection} />
          </View>
        )}
        {renderPokemonModal(
          'Choose Pokemon 1',
          isDialog1Open,
          closeDialog,
          dispatch,
          selectPokemon1,
        )}
        {renderPokemonModal(
          'Choose Pokemon 2',
          isDialog2Open,
          closeDialog,
          dispatch,
          selectPokemon2,
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const renderPokemonSection = (
  title: string,
  selectedPokemon: any,
  selectedDetailPokemon: any,
  openDialog: () => void,
) => {
  return (
    <View style={styles.pokemon}>
      <View style={styles.pokemonDetails}>
        <Text style={styles.pokemonTitle}>{title}</Text>
        {selectedPokemon == null ? (
          <Placeholder width={100} height={100} />
        ) : (
          <View>
            <ImageLoader
              uri={selectedDetailPokemon?.sprites.front_default}
              imageStyle={styles.pokemonImage}
              width={100}
              height={100}
              isSvg={false}
            />

            <Text style={styles.pokemonDetailsName}>
              {capitalizeAndSpace(selectedPokemon.name)}
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.chooseButton} onPress={openDialog}>
        <Text style={styles.buttonText}>Choose {title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderPokemonModal = (
  modalTitle: string,
  isOpen: boolean,
  closeModal: () => void,
  dispatch: any,
  selectPokemon: (pokemon: any) => void,
) => {
  return (
    <Modal visible={isOpen} onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{modalTitle}</Text>
        <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
          <Icon style={styles.modalCloseButtonText} name="close-circle" />
        </TouchableOpacity>
        <PokemonListComponent
          customOnPress={selectedPokemon => {
            dispatch(selectPokemon(selectedPokemon));
            closeModal();
          }}
        />
      </View>
    </Modal>
  );
};

export default ComparePage;
