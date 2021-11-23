import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { colors } from '../utils/Colors'
import getData from '../utils/GetDataLocal'
import Button from './Button'

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from './CredentialContext';

const HomeProfile = ({navigation}) => {
    const {storedCredential, setStoredCredentials} = useContext(CredentialsContext);
    // const { fullname, token } = storedCredential ;
    
    const clearLogin = () => {
        AsyncStorage
        .removeItem('user')
        .then(() => {
            // setStoredCredentials("");
            navigation.replace('Login')
        })
        .catch(error => console.log(error))
    }
    // useEffect(() => {
    //     getData('user').then(res => {
    //         const data = res
    //         console.log('data :',data)
    //         setProfile(data);
    //     })
    // },[]);

    // const signOut = async() => {
    //     getData('user').then(res=>{
    //         const user = res
    //         console.log("tokenn", tokenn)
    //         if(user !== null) {
    //             //axios disini
    //             await AsyncStorage.removeItem('user');
    //             return navigation.replace("Splash");
    //         }
    //     })
        // try {
        //     const user = await AsyncStorage.getData('user');
        //     if(user !== null) {
        //         const url =`http://182.23.53.73:1340/apiuser/v1/logoutuser/${user.fullname}`;
        //         axios
        //             .patch(url,)
        //     }
        // } catch(e) {
        //     console.log(e);
        // }
    // }   

    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={require('../../assets/icons/corn.png')} />
            <View style={styles.nameview}>
                <Text style={styles.name} >Rahmadillah</Text>
                {/* <Text style={styles.name} >{ token || token}</Text> */}

                {/* <Button type= 'icon-only' icon='poweroff' onPress={()=> alert("tes klik")} /> */}
                <Button 
                    title="Sign Out" 
                    onPress={clearLogin}
                />
            </View>
        </View>
    )
}

export default HomeProfile

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        flex:1,
    },
    avatar: {
        // height: 46,
        // width: 46,
        // borderRadius: 46 / 2,
        // marginRight:12,
        width: 50,
        height: 50,
        margin: 'auto',
        borderRadius : 50,
        marginBottom: 10,
        marginTop: 10,        
    },
    name:{
        fontSize:16,
        fontWeight: '700',
        color: colors.text.primary,
    },
    nameview: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',        
        justifyContent: 'space-between'
    },  
})
