import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../utils/Colors'

const ComboBox = ({label, data, zIndex}) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(data);
    
    // console.log(data);    
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
                <DropDownPicker listMode="MODAL" style={styles.input}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    zIndex={zIndex}
               />
        </View>
    )
}

export default ComboBox

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
