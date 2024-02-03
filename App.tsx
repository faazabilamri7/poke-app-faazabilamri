import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {PaperProvider} from 'react-native-paper';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;

// import React, {useState} from 'react';
// import {View} from 'react-native';
// import BottomNavigation from './src/components/BottomNavigation';
// import Home from './src/screens/HomePage/Home';

// const App = () => {
//   const [selectedTab, setSelectedTab] = useState('Home');

//   const renderPage = () => {
//     switch (selectedTab) {
//       case 'Home':
//         return <Home />;
//       case 'Compare':
//         return <Home />;
//       // Add cases for other pages as needed
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       {/* Content */}
//       {renderPage()}

//       {/* Bottom Navigation */}
//       <BottomNavigation
//         selectedTab={selectedTab}
//         onSelectTab={setSelectedTab}
//       />
//     </View>
//   );
// };

// export default App;

// import React from 'react';
// import {StyleSheet, View} from 'react-native';
// import Home from './src/screens/HomePage/Home';

// const App: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Home />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;

// import React, {useEffect, useState} from 'react';
// import {View, Text} from 'react-native';
// import {getPokemonList} from './src/services/api';
// import {Pokemon} from './src/types/Pokemon';

// const App = () => {
//   const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getPokemonList(25, 0);
//       setPokemonList(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <View>
//       {pokemonList.map(pokemon => (
//         <Text key={pokemon.id}>
//           {pokemon.name} - {pokemon.id}
//         </Text>
//       ))}
//     </View>
//   );
// };

// export default App;
