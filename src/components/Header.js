import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/Colors';
import Button from './Button';
import Gap from './Gap';


const Header = ({onPress, title}) => {
    return (
        <View style={styles.container}>
            <Button type= 'icon-only' icon='arrowleft' onPress={onPress} />
            <Text style={styles.text}>{title}</Text>
            <Gap width={24} />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 50,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        textAlign:'center',
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
})
