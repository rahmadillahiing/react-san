import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../utils/Colors'

const ComboBoxKabupaten = (props) => {

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
                    open={open}
                    value={value}
                    placeholder="Select an Kabupaten"
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    zIndex={props.zIndex}
                    onChangeValue={(value) => {
                        // props.onChangeValue(value)
                        // console.log("selected Kabupaten Value", value)
                        if(value !==null ) {
                            props.onChangeValue(value)
                        }else {
                            setValue([0])
                        }
                    }}
               />
        </View>
    )
}

export default ComboBoxKabupaten

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
