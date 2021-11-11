import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const IconOnlyButton = ({onPress, icon}) => {
    const Icon = () => {
        if(icon === 'arrowleft') {
            return (
                <AntDesign 
                name="arrowleft" size={24} color="black"
                />
            );
        }
        if(icon === 'arrowright') {
            return (
                <AntDesign 
                name="arrowleft" size={24} color="black"
                />
            );            
        }
        if(icon === 'poweroff') {
            return (
                <AntDesign 
                name="poweroff" size={24} color="red"
                />
            );            
        }
        return (
            <AntDesign 
            name="arrowleft" size={24} color="black"
            />
        );
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <Icon />
        </TouchableOpacity>
    );
};

export default IconOnlyButton;


