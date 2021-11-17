import React, {useContext} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DataItem from '../components/DataItem';
import Gap from '../components/Gap';
import Grafik from '../components/Grafik';
import HomeProfile from '../components/HomeProfile';
import { colors } from '../utils/Colors';



const DashboardScreen = () => {
    
    return (
        <ScrollView style={styles.page}>
            <HomeProfile />
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
})
