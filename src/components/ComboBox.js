import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { colors } from '../utils/Colors'

const ComboBox = (props) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    
    // useEffect(() => {
    //     setItems(()=> props.data);
    // }, [props.data]);

    // console.log("combobox",items);    
    // console.log("data lemparan :",props.data);    

    //rerender
    const reRender = () => {
        // console.log("rerender jalan");
        setValue(null)
        setOpen(false)
        setItems([])
        setItems(() => props.data)
    }

    return (
        <View>
            <Text style={styles.label}>{props.label}</Text>
                <DropDownPicker listMode="MODAL" style={styles.input}
                    placeholder="Select an Province"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    zIndex={props.zIndex}
                    onPress = {reRender}
                    onChangeValue={(value) => {
                        console.log("selected Province:", value)
                        if(value !==null ) {
                            props.onChangeValue(value)
                        }else {
                            setValue([])
                        }
                    }}
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
