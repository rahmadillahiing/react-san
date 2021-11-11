import React from 'react';
import Routes from './src/router/Routes';

import { NavigationContainer } from '@react-navigation/native';

const App = () => { 
  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  )
}

export default App;