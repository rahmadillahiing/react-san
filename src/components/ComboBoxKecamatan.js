import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../utils/Colors'

const ComboBoxKecamatan = (props) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        setItems(()=> props.data);
    }, [props.data]);

    // console.log("comboboxkabupaten",items);    
    // console.log("data lemparan :",props.data);    
    return (
        <View>
            <Text style={styles.label}>{props.label}</Text>
                <DropDownPicker listMode="MODAL" style={styles.input}
                    placeholder= "Select an Kecamatan"
                    open={open}
                    value={value}
                    // placeholder={{label:"Select an Kecamatan", value:'0'}}
                    defaultValue={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    zIndex={props.zIndex}
                    // onChangeValue={(value) => {
                    //     // props.onChangeValue(value)
                    //     console.log("selected Value", value)
                    //     if(value !==null ) {
                    //         props.onChangeValue(value)
                    //     }
                    // }}
               />
        </View>
    )
}

export default ComboBoxKecamatan

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 12,
        borderColor: colors.border,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        color: colors.text.secondary,
        marginBottom: 6,
        fontWeight: '500',
    },
})
