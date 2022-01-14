import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/Colors';
import GetDataLocal from '../utils/GetDataLocal';

import { CredentialsContext } from '../components/CredentialContext';

const SplashScreen = ({navigation}) => {
    const [userToken, setUserToken] = useState('')

    useEffect(() => {
        const validate = getUser()
        // console.log("validate", validate)
        // console.log("data storage: ",userData);
        // console.log("data token: ",userData.token);
        // setTimeout(()=>{
        //     if(userToken) {
        //         navigation.replace('MainApp')
        //     }else {
        //         navigation.navigate('Welcome');
        //     }
        // },3000);
    }, [navigation]);

    const getUser = () => {
        GetDataLocal('user').then(res => {
            // console.log("getuser :", res);
            if(res === null) {
                setTimeout(()=>{
                navigation.navigate('Welcome');
                },3000)
            }else {
                setUserToken(res.token);
                // console.log("gettoken :", res.token);
                setTimeout(()=>{
                    if(res.token !== '') {
                        navigation.replace('MainApp')
                    }else {
                        navigation.navigate('Welcome');
                    }
                },3000);            
            }
            // console.log("user token :", userToken);
            // console.log("user token :", userData.userToken);
        });
    };

    return (
        <View style={styles.page}>
        <Image
          source={require('../../assets/ilustration/logoSANsmall.png')} 
        />
        <Text style={styles.title}>PT Seger Agro Nusantara</Text>
      </View>
      )
}

export default SplashScreen;

const styles = StyleSheet.create({
    page: {
        backgroundColor:colors.white,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        fontSize: 20,
        fontWeight:'600',
        color:colors.text.primary, 
        marginTop: 20
    },
})
