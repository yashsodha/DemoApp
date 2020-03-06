/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import colors from '../constants/Colors';

/**
 * Class NavigationBar extends React.Component
 * @return {void} void
 */
export default class NavigationBar extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
    }
    /**
     *
     */

    leftHeader = () => {
        return (
            <View style={{ flex: 0.1, padding: 12, justifyContent: 'center' }}>

            </View>
        );
    };

    /**
     *
     */

    centerHeader = () => {
        return (
            <View
                style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    marginLeft: 10,
                    marginTop: 5
                }}>
                <Text style={{
                    color: colors.black, alignSelf: 'center', fontSize: 20, fontWeight: 'bold', padding: 20
                }}>
                    Videos
                </Text>
            </View>
        );
    };

    /**
     *
     */

    rightHeader = () => {
        return (
            <View
                style={{
                    flex: 0.15,
                    padding: 15,
                    alignSelf: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    marginTop: 5,
                }}>
            </View>
        );
    };

    /**
     * @return {view} view
     */
    render() {
        return (
            <SafeAreaView
                style={{
                    backgroundColor: colors.frameBackground,
                    flexDirection: 'row',
                    paddingTop: 20,
                }}>
                {this.leftHeader()}
                {this.centerHeader()}
                {this.rightHeader()}
            </SafeAreaView>
        );
    }
}
