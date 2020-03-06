import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const first = [
    { value: 0, color: '#2C5D8D' },
    { value: 110, color: '#596293' },
    { value: 250, color: '#5F5788' },
    { value: 500, color: '#784978' },
    { value: 100, color: '#995085' },
];
const second = [
    { value: 0, color: '#FDF167' },
    { value: 1, color: '#F3F683' },
    { value: 3, color: '#DFEA6A' },
    { value: 5, color: '#A6CE9F' },
    { value: 10, color: '#A6CE9F' },
];
const third = [
    { value: 0, color: '#FFEFA5' },
    { value: 1, color: '#E8D8C9' },
    { value: 3, color: '#AF94B7' },
    { value: 5, color: '#9467A0' },
    { value: 10, color: '#7A3D83' },
];
const fourth = [
    { value: 6.2, color: '#D39259' },
    { value: 6.8, color: '#EA7741' },
    { value: 7.2, color: '#CD552D' },
    { value: 7.8, color: '#D0564B' },
    { value: 8.4, color: '#D63246' },
];

const fifth = [
    { value: 6.2, color: '#D39259' },
    { value: 6.8, color: '#EA7741' },
    { value: 7.2, color: '#CD552D' },
    { value: 7.8, color: '#D0564B' },
    { value: 8.4, color: '#D63246' },
];

const sixth = [
    { value: 6.2, color: '#D39259' },
    { value: 6.8, color: '#EA7741' },
    { value: 7.2, color: '#CD552D' },
    { value: 7.8, color: '#D0564B' },
    { value: 8.4, color: '#D63246' },
];


let selectorArrays = [first, second, third, fourth, fifth, sixth];
function RenderColorStrip(props) {
    const { colors, onSelectColor, value, stripIndex } = props;
    return (
        <View style={{ margin: 5, marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.gray }}>Total Hardness (ppm)</Text>
                <TextInput
                    style={{ borderRadius: 5, width: 60, padding: 1, borderWidth: 1, textAlign: 'center' }}
                    value={value.toString()}
                />
            </View>
            <View style={{ display: 'flex', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                {colors.map((item, index) => {
                    return (
                        <View key={index} style={{ width: '18%' }} >
                            <TouchableOpacity
                                onPress={() => onSelectColor(stripIndex, item)}
                                style={{ backgroundColor: item.color, width: '100%', height: 30, borderRadius: 6 }}
                            />
                            <View style={{ height: 25, }}>
                                <Text style={{ textAlign: 'center', color: Colors.black, fontSize: 15 }}>{item.value}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
const StripScreen = () => {
    const [leftStripColor, setLeftStripColor] = useState([
        { value: 1, color: '#FF5733' },
        { value: 2, color: '#90FF33' },
        { value: 3, color: '#339CFF' },
        { value: 4, color: '#DA33FF' },
        { value: 5, color: '#DA33FF' },
        { value: 6, color: '#DA33FF' },

    ]);
    const onSelectColor = (stripIndex, items) => {
        const oldColors = [...leftStripColor]
        oldColors[stripIndex] = items;
        setLeftStripColor(oldColors)
    };
    return (
        <View style={{ flex: 1, padding: 10, flexDirection: 'row' }}>
            <View style={{ flex: 0.1, borderWidth: 1, alignItems: 'center' }}>
                {leftStripColor.map(item => {
                    return (
                        <View style={{
                            height: 100,
                            width: '100%',
                            display: 'flex',
                            paddingBottom: 30,
                            justifyContent: 'flex-end'
                        }}>
                            <View
                                style={{
                                    backgroundColor: item.color,
                                    height: 30,
                                }} />
                        </View>
                    );
                })}
            </View>

            <View style={{ flex: 0.7, flexGrow: 1, flexDirection: 'column' }}>
                {
                    selectorArrays.map((colors, index) =>
                        <RenderColorStrip
                            key={index}
                            stripIndex={index}
                            onSelectColor={onSelectColor}
                            value={leftStripColor[index].value}
                            colors={colors}
                        />
                    )
                }
            </View>
        </View >
    );
};
export default StripScreen;