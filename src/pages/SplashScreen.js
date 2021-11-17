import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/Colors';

const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(()=>{
                navigation.navigate('Welcome');
        },3000);
    }, [navigation]);

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
