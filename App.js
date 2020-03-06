import React, { useEffect } from 'react';
import { Provider, useDispatch, } from 'react-redux';
import Store from './src/redux/Store';
import { SafeAreaView } from 'react-native';
import AppNavigation from './src/navigation';
import 'react-native-gesture-handler';
import { setLogged } from './src/redux/action/authenticationActions';
console.disableYellowBox = true;
/**
 * Class App extends React.Component
 */
const App = () => {
  return (
    <Provider store={Store}>
      <SafeAreaView />
      <AppNavigation />
    </Provider>
  );
};

export default App;
