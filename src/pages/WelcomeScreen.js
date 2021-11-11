import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Gap from '../components/Gap';
import { colors } from '../utils/Colors';

const WelcomeScreen = ({navigation}) => {
    return (
        <ImageBackground source={require('../../assets/ilustration/warehouse.jpg')} style={styles.page}>
            <View>
                <Image
                    source={require('../../assets/ilustration/logosmall.png')} 
                />
                <Text style={styles.title}>Survey Jagung di Area anda, Untuk analisa panen</Text>
            </View>
            <View>
                <Button title="Get Started" onPress={()=> navigation.navigate("Login") } />
                {/* <Gap height={16} />
                <Button type="secondary" title="Sign In"/> */}
            </View>
        </ImageBackground>
    )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    page: {
        padding:50,
        justifyContent: 'space-between',
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight:'600',
        color:colors.white,
        marginTop: 91,
    },
})
