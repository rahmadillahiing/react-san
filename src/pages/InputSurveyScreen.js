import React, {useState, useCallback, useEffect} from 'react'
import { StyleSheet, View, ScrollView, } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button'
import ComboBox from '../components/ComboBox'
import ComboBoxKabupaten from '../components/ComboBoxKabupaten'
import Gap from '../components/Gap'
import Header from '../components/Header'
import Input from '../components/Input'
import { colors } from '../utils/Colors'
import DatePickerApp from '../components/DatePickerApp'
import axios from 'axios';
import ComboBoxKecamatan from '../components/ComboBoxKecamatan';
// import { DropDownPicker, DropDownPicker as DropDownPicker1, DropDownPicker as DropDownPicker2  } from 'react-native-dropdown-picker'


// const data = [
//     {
//       "label": "Apple",
//       "value": "Apel"
//     },
//     {
//         "label": "Banana",
//         "value": "Pisang"
//     }
// ]
const data =[{"label":"Gorontalo","value":2},{"label":"Jawa Tengah","value":9},{"label":"Jawa Timur","value":7},{"label":"Lampung","value":5},{"label":"Lampung","value":8},{"label":"Nusa Tenggara Barat","value":1},{"label":"Sulawesi Selatan","value":4},{"label":"Sulawesi Tengah","value":3},{"label":"Sumatera Utara","value":6}]
// const data = [
//      {
//       "value": 2,
//       "label": "Gorontalo"
//     },
//     {
//       "value": 9,
//       "label": "Jawa Tengah"
//     },
//     {
//       "value": 7,
//       "label": "Jawa Timur"
//     },
//     {
//       "value": 5,
//       "label": "Lampung"
//     },
//     {
//       "value": 8,
//       "label": "Lampung"
//     },
//     {
//       "value": 1,
//       "label": "Nusa Tenggara Barat"
//     },
//     {
//       "value": 4,
//       "label": "Sulawesi Selatan"
//     },
//     {
//       "value": 3,
//       "label": "Sulawesi Tengah"
//     },
//     {
//       "value": 6,
//       "label": "Sumatera Utara"
//     }
// ]


const InputSurveyScreen = ({navigation}) => {

    const [dataProvinsi, setDataProvinsi] = useState([]) 
    const [dataKabupaten, setDataKabupaten] = useState([]) 
    const [dataKecamatan, setDataKecamatan] = useState([]) 

    useEffect(() => {
        getProvinsi();
    }, []);
    
    const getKabupaten = (value) =>{
        const url =`http://182.23.53.73:1340/getkabupaten/${value}`;

        // console.log("provinsi selected :",value);
        // alert((value));
        fetch(url)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const foundKabupten = isJson && await response.json();            

            if (!response.ok) {
                // get error message from body or default to response status
                // const error = (data && data.message) || response.status;
                // return Promise.reject(error);
                console.log("error")
                return;
            }

            // console.log("tes",JSON.stringify(foundProvince));
            // console.log("hitung",foundProvince.length);
            
            const count = foundKabupten.length
            const dataKabupaten = [];
            for(var i=0; i< count; i++) {
                dataKabupaten.push({ label: foundKabupten[i].nama_kab.toString(), value: foundKabupten[i].id })
            }
            // console.log("dataprov",dataProv);
            setDataKabupaten(dataKabupaten);
        })    
    }

    const getKecamatan = (value) =>{ 
        const url =`http://182.23.53.73:1340/getkecamatan/${value}`;

        // console.log("provinsi selected :",value);
        // alert((value));
        fetch(url)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const foundKecamatan = isJson && await response.json();            

            if (!response.ok) {
                // get error message from body or default to response status
                // const error = (data && data.message) || response.status;
                // return Promise.reject(error);
                console.log("error")
                return;
            }

            // console.log("tes",JSON.stringify(foundProvince));
            // console.log("hitung",foundProvince.length);
            
            const count = foundKecamatan.length
            const dataKecamatan = [];
            for(var i=0; i< count; i++) {
                dataKecamatan.push({ label: foundKecamatan[i].nama_kec.toString(), value: foundKecamatan[i].id })
            }
            // console.log("dataprov",dataProv);
            setDataKecamatan(dataKecamatan);
        })    
    }

    const getProvinsi = () =>{
        const url ='http://182.23.53.73:1340/getprovinsi';

        fetch(url)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const foundProvince = isJson && await response.json();            

            if (!response.ok) {
                // get error message from body or default to response status
                // const error = (data && data.message) || response.status;
                // return Promise.reject(error);
                console.log("error")
                return;
            }

            // console.log("tes",JSON.stringify(foundProvince));
            // console.log("hitung",foundProvince.length);
            
            const count = foundProvince.length
            const dataProv = [];
            for(var i=0; i< count; i++) {
                dataProv.push({ label: foundProvince[i].nama_prov.toString(), value: foundProvince[i].id })
            }
            // console.log("dataprov",dataProv);
            setDataProvinsi(dataProv);

        })    
        // axios
        // .get(url)
        // .then((response) => {
        //     console.log(response.status);
        //     const status = response.status; 
        //     const result = response.data;                
        //     console.log("response hitung:", result.length);
        //     console.log("response hasil:", result);
        //     const message = "SUCCESS";
        //     if(status !== 200) {
        //         console.log("masuk sini");
        //         alert("An error has occured. Check your connection and try again");                    
        //         // handleMessage(message, status);
        //     } else {
        //         console.log("sukses");
        //         const count = result.length
        //         const dataProv = [];
        //         for(var i=0; i< count; i++) {
        //             dataProv.push({ label: result[i].nama_prov, value: result[i].id })
        //         }
        //         // const data = {
        //         //     label: result[1].nama_prov,
        //         //     value: result[1].id,
        //         // };
        //         console.log("data :",data);
        //         setDataProvinsi(dataProv);
        //         console.log("dataprovinsi:",dataProvinsi);
        //     }
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }

//    console.log(data);

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

                <ComboBox label="Provinsi" data={dataProvinsi} zIndex={10} onChangeValue={getKabupaten} />
                <Gap height={10} />
                <ComboBoxKabupaten label="Kabupaten" data={dataKabupaten} zIndex={9} onChangeValue={getKecamatan} />
                <Gap height={10} />
                <ComboBoxKecamatan label="Kecamatan " data={dataKecamatan} zIndex={8} onChangeValue={getKecamatan} />
                <Gap height={10} />
                <Input label="Estimasi luas tanam" keyboardType='numeric' />
                <Gap height={10} />
                <Input label="Yield" keyboardType='numeric'/>
                <Gap height={10} />
                <Input label="Produksi" keyboardType='numeric'/>
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
