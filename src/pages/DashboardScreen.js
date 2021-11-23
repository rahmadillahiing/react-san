import React, {useContext} from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import DataItem from '../components/DataItem';
import Gap from '../components/Gap';
import Grafik from '../components/Grafik';
import HomeProfile from '../components/HomeProfile';
import { colors } from '../utils/Colors';
import Button from '../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialContext';

const DashboardScreen = ({navigation}) => {
    const {storedCredential, setStoredCredentials} = useContext(CredentialsContext);
  // credentials context

    const clearLogin = () => {
        setStoredCredentials("");

        AsyncStorage
        .removeItem('user')
        .then(() => {
            navigation.replace('Login')
        })
        .catch(error => console.log(error))
    }  
    return (
        <ScrollView style={styles.page}>
            {/* <HomeProfile /> */}
            <View style={styles.container}>
                <Image style={styles.avatar} source={require('../../assets/icons/corn.png')} />
                <View style={styles.nameview}>
                    <Text style={styles.name} >Rahmadillah</Text>
                    <Button 
                        title="Sign Out" 
                        onPress={clearLogin}
                    />
                </View>
            </View>            
            <Text style={styles.header1}>Grafik Report</Text>
            <Grafik />
            <Text>List Item Report</Text>
            <Gap height={10} />
            <DataItem />
        </ScrollView>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    page: {
        paddingVertical: 40,
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor : colors.white,
    },
    header1: {
        fontSize:20,
        fontWeight: '700',
        color: colors.text.primary,
        marginTop: 30,
        marginBottom: 16,
        maxWidth: 209,
    },
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
