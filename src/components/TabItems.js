import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
//<AntDesign name="dashboard" size={24} color="black" />
import { FontAwesome } from '@expo/vector-icons'
//<FontAwesome name="wpforms" size={24} color="black" />
import { Feather } from '@expo/vector-icons';
import { colors } from '../utils/Colors';
//<Feather name="bookmark" size={24} color="black" />

const TabItems = ({title, active, onPress, onLongPress}) => {
    const Icon = () =>{
        if (title === 'Dashboard') {
            return(
                active ? <AntDesign name="dashboard" size={24} color="white" /> : <AntDesign name="dashboard" size={24} color="black" />
            );
        };
        if (title === 'InputSurvey') {
            return(
                active ? <FontAwesome name="wpforms" size={24} color="white" /> : <FontAwesome name="wpforms" size={24} color="black" />
            );
        };
        if (title === 'Report') {
            return(
                active ? <Feather name="bookmark" size={24} color="white" /> : <Feather name="bookmark" size={24} color="black" />
            );
        };
        return(
                active ? <AntDesign name="dashboard" size={24} color="white" /> : <AntDesign name="dashboard" size={24} color="black" />
        );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <Icon />
            <Text style={styles.text(active)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TabItems

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: (active) => (
        {
            fontSize: 10,
            color: active ? colors.text.menuActive : colors.text.menuInactive,
            fontWeight: '600',
            marginTop: 4,
    
        }
    ),  
})
