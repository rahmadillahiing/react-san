import React, {useState} from 'react'
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Button from './Button'
import { colors } from '../utils/Colors'
// icon
import { Octicons, Ionicons } from '@expo/vector-icons';


const DatePickerApp = ({title}) => {
  const [date,setDate] = useState(new Date())
  const [mode,setMode] = useState('date')
  const [show,setShow] = useState(false)
  const [text,setText] = useState('')


  const showDatePicker = () => {
    setShow('date');
  };

  const onChange = (event, selectedDate) => {
    if(event.type=='dismissed'){
        setShow(false);
        return null;
      }
      else{
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        console.log(event);
        console.log(selectedDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate);
      }
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View style={styles.container}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{
                backgroundColor: 'yellow',
              }}
            />
          )}
      <TouchableOpacity style={{right:30,position:'absolute', zIndex: 1 }} onPress={showDatePicker}>
        <Octicons name="calendar" size={40}/>
      </TouchableOpacity> 
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput 
          style={styles.text} 
          editable={false} 
          isDate={true}
          value={date ? date.toDateString() : ''}
          showDatePicker= {showDatePicker}
        />
      </TouchableOpacity>
        
      {/* <TextInput editable={false} style={styles.text} >{text}</TextInput>
      <View style={{margin:20}}>
          <Button title='Pilih Periode' onPress={() => showMode('date')} />
      </View> */}
    
    {/* {show && (
      <DateTimePicker 
        testID='dateTimePicker'
        value={date}
        mode={mode}
        is24hour={true}
        display='default'
        shouldCloseOnSelect={false}
        onChange={onChange}
      />
    )} */}
    
    </View>

  )
}

export default DatePickerApp

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  text: {
    borderWidth: 1,
    padding: 12,
    borderColor: colors.border,
    borderRadius: 10,
  },
})
