// ComparePage.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  selectPokemon1,
  selectPokemon2,
  clearSelectedComparePokemon,
  fetchPokemonDetails2,
  fetchPokemonDetails1,
} from '../../redux/slices/pokemonSlice';
import {fetchPokemonDetails} from '../../redux/slices/pokemonSlice'; // Import the action

const ComparePage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    selectedPokemon1,
    selectedDetailPokemon1,
    selectedDetailPokemon2,
    selectedPokemon2,
    list,
  } = useSelector((state: RootState) => state.pokemon);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [details1, setDetails1] = useState(null);
  const [details2, setDetails2] = useState(null);

  useEffect(() => {
    // const fetchDetails1 = async ({id}: any) => {
    //   try {
    //     const details = await dispatch(fetchPokemonDetails1(id));
    //     setDetails1(details);
    //   } catch (error) {
    //     console.error('Error fetching Pokemon details:', error);
    //   }
    // };

    // const fetchDetails2 = async ({id}: any) => {
    //   try {
    //     const details = await dispatch(fetchPokemonDetails2(id));
    //     setDetails2(details);
    //   } catch (error) {
    //     console.error('Error fetching Pokemon details:', error);
    //   }
    // };

    if (selectedPokemon1) {
      dispatch(fetchPokemonDetails1(selectedPokemon1.id));
      // fetchDetails1(selectedPokemon1);
    }
    if (selectedPokemon2) {
      dispatch(fetchPokemonDetails2(selectedPokemon2.id));
      // fetchDetails2(selectedPokemon2);
    }
  }, [dispatch, selectedPokemon1, selectedPokemon2]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const selectPokemon = pokemon => {
    if (!selectedPokemon1) {
      dispatch(selectPokemon1(pokemon));
    } else if (!selectedPokemon2) {
      dispatch(selectPokemon2(pokemon));
      closeDialog();
    }
  };

  const clearSelection = () => {
    dispatch(clearSelectedComparePokemon());
    setDetails1(null);
    setDetails2(null);
  };

  const renderPokemonItem = ({item}) => (
    <TouchableOpacity onPress={() => selectPokemon(item)}>
      <View>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Selected Pokemon Component */}
      <View>
        <Text>Selected Pokemon 1:</Text>
        {selectedPokemon1 && (
          <View>
            <Text>{selectedPokemon1.name}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      </View>

      <View>
        <Text>Selected Pokemon 2:</Text>
        {selectedPokemon2 && (
          <View>
            <Text>{selectedPokemon2.name}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      </View>

      {/* Chart of Comparison Component */}
      {/* {details1 && details2 && (
        <View>
          <Text>Comparison Chart</Text>
          <Text>
            {details1.name}: {details1.height}, {details1.weight}
          </Text>
          <Text>
            {details2.name}: {details2.height}, {details2.weight}
          </Text>
        </View>
      )} */}

      {selectedDetailPokemon1 && selectedDetailPokemon2 && (
        <View>
          <Text>Comparison Chart</Text>
          <Text>
            {selectedDetailPokemon1?.name}: {selectedDetailPokemon1?.height},{' '}
            {selectedDetailPokemon1?.weight}
          </Text>
          <Text>
            {selectedDetailPokemon2?.name}: {selectedDetailPokemon2?.height},{' '}
            {selectedDetailPokemon2?.weight}
          </Text>
        </View>
      )}

      {/* Button to open the Pokemon List Dialog */}
      <TouchableOpacity onPress={openDialog}>
        <Text>Choose Pokemon</Text>
      </TouchableOpacity>

      {/* Clear Button */}
      <Button title="Clear Selection" onPress={clearSelection} />

      {/* Dialog of List Pokemon Component */}
      <Modal visible={isDialogOpen} onRequestClose={closeDialog}>
        <View>
          <Text>Choose Pokemon</Text>
          <FlatList
            data={list}
            keyExtractor={item => item.name}
            renderItem={renderPokemonItem}
          />
          <TouchableOpacity onPress={closeDialog}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ComparePage;
