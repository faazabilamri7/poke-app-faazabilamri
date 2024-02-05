import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  fetchPokemonDetails,
  clearSelectedPokemon,
} from '../../redux/slices/pokemonSlice';
import {BarChart} from 'react-native-chart-kit';
import {capitalizeAndSpace} from '../../helper/capitalizeAndSpace';
import {customTheme} from '../../theme/customTheme';
import styles from './styles';
import ImageLoader from '../../components/atoms/ImageLoader/ImageLoader';

type DetailPokemonRouteProps = {
  DetailPokemon: {
    id: number;
  };
};

const DetailPokemonPage: React.FC = () => {
  const route = useRoute<RouteProp<DetailPokemonRouteProps, 'DetailPokemon'>>();
  const {id} = route.params;
  const [selectedTab, setSelectedTab] = useState<'Stats' | 'Abilities'>(
    'Stats',
  );
  const dispatch = useDispatch();
  const {detailPokemon} = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    //TODO: Fix the TS Rules
    // @ts-ignore
    dispatch(fetchPokemonDetails(id));

    return () => {
      dispatch(clearSelectedPokemon());
    };
  }, [dispatch, id]);

  if (!detailPokemon) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={customTheme.orange} />
      </View>
    );
  }

  const {name, height, weight, types, stats, abilities, sprites} =
    detailPokemon;

  const chartData = {
    labels: stats.map(item => capitalizeAndSpace(item.stat.name)),
    datasets: [
      {
        data: stats.map(item => item.base_stat),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: customTheme.white,
    backgroundGradientTo: customTheme.white,
    decimalPlaces: 0,
    color: () => customTheme.grey,
    labelColor: () => customTheme.grey,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <ImageLoader
            uri={sprites?.other?.dream_world?.front_default}
            width={300}
            height={300}
            isSvg={true}
          />

          <Text style={styles.headerText}>{capitalizeAndSpace(name)}</Text>
          <View style={styles.section}>
            <ImageLoader
              uri={sprites?.front_default}
              width={100}
              height={100}
              isSvg={false}
            />
            <View style={styles.innerSection}>
              <Text style={styles.headerText}>Size</Text>
              <Text>Height: {height}</Text>
              <Text>Weight: {weight}</Text>
            </View>
            <View style={styles.type}>
              <Text style={styles.headerText}>Type:</Text>
              {types.map((item, index) => (
                <View key={index}>
                  <Text>
                    {item.slot}
                    <Text style={{fontWeight: 'bold'}} />
                    {'. '}
                    {capitalizeAndSpace(item.type.name)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Stats' && styles.selectedTab,
              ]}
              onPress={() => setSelectedTab('Stats')}>
              <Text style={styles.tabText}>Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Abilities' && styles.selectedTab,
              ]}
              onPress={() => setSelectedTab('Abilities')}>
              <Text style={styles.tabText}>Abilities</Text>
            </TouchableOpacity>
          </View>

          {selectedTab === 'Stats' && (
            <BarChart
              withHorizontalLabels={true}
              withInnerLines={true}
              segments={3}
              withCustomBarColorFromData={true}
              flatColor={true}
              data={chartData}
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').width}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              fromZero={true}
              showBarTops={true}
              showValuesOnTopOfBars={true}
            />
          )}

          {selectedTab === 'Abilities' && (
            <View style={styles.sectionAbilities}>
              {abilities.map((item, index) => (
                <View key={index}>
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {index + 1}. {capitalizeAndSpace(item.name)}
                    </Text>
                    {'\n'}
                    {item.effect_entries.map(
                      (effect: {
                        language: {name: string};
                        short_effect: any;
                      }) => {
                        if (effect.language.name === 'en') {
                          return effect.short_effect;
                        }
                        return null;
                      },
                    )}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailPokemonPage;
