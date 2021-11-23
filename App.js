import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';

import Routes from './src/router/Routes';

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//context
import { CredentialsContext } from './src/components/CredentialContext';

const App = () => { 
  const [appReady, setAppReady] = useState(false)
  const [storedCredentials,setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage
    .getItem('user')
    .then((result) => {
      console.log("credential: ",JSON.stringify(result));
      if (result !== null) {
        setStoredCredentials(JSON.stringify(result));
      }else {
        setStoredCredentials(null);
      }
    })
    .catch(error => console.log(error))
  }

  if (!appReady) {
    return(
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={()=> setAppReady(true)}
        onError={console.warn}
      />  
    );
  }

  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <Routes />
    </CredentialsContext.Provider>
  );
}

export default App;