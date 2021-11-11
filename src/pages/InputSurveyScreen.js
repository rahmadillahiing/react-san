import React, {useState, useCallback} from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Button from '../components/Button'
import ComboBox from '../components/ComboBox'
import Gap from '../components/Gap'
import Header from '../components/Header'
import Input from '../components/Input'
import { colors } from '../utils/Colors'
import DatePickerApp from '../components/DatePickerApp'

const data = [
    {
      "label": "Apple",
      "value": "Apel"
    },
    {
        "label": "Banana",
        "value": "Pisang"
    }
]

  
const InputSurveyScreen = ({navigation}) => {
    // const [date, setDate] = useState(new Date(Date.now()));
    // const [mode, setMode] = useState('date');
    // const [show, setShow] = useState(false);

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    //     console.log(currentDate);
    // };
    
    // const showMode = (currentMode) => {
    // setShow(true);
    // setMode(currentMode);
    // };

    // const showDatepicker = () => {
    // showMode('date');
    // };

    console.log(data);
    return (
        <View style= { styles.page }>
            <Header onPress={() => navigation.goBack()} title='Input data survey' /> 
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <DatePickerApp title="Pilih periode" />
                {/* <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )} */}

                <ComboBox label="Provinsi" data={data} zIndex={10} />
                <Gap height={10} />
                <ComboBox label="Kabupaten" data={data} zIndex={9} />
                <Gap height={10} />
                <ComboBox label="Kecamatan " data={data} zIndex={8} />
                <Gap height={10} />
                <Input label="Estimasi luas tanam"/>
                <Gap height={10} />
                <Input label="Yield"/>
                <Gap height={10} />
                <Input label="Produksi"/>
                <Gap height={20} /> 
                <Button title="Simpan" />
                <Gap height={20} />
            </ScrollView>
        </View>
    )
}

export default InputSurveyScreen

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        padding: 40,
        paddingTop: 0,

    },
})
