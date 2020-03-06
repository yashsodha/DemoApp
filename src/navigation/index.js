/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { appImages } from '../assets/images'
import VideoScreen from '../screens/VideoScreen';
import StripScreen from '../screens/StripScreen';
import LoginScreen from '../screens/authentication/Login';
import { useSelector, useDispatch } from 'react-redux';
import { setLogged } from '../redux/action/authenticationActions';
import StripIcon from 'react-native-vector-icons/MaterialIcons'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AppTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Video" component={VideoScreen}
                options={{
                    tabBarLabel: 'Video',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            style={{ height: 20, width: 20 }}
                            source={appImages.videoIcon}
                        />
                    ),
                }}
            />
            <Tab.Screen name="Strip" component={StripScreen}
                options={{
                    tabBarLabel: 'Strip',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            style={{ height: 20, width: 20 }}
                            source={appImages.stripIcon}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
const AppNavigation = () => {
    const dispatch = useDispatch();
    const [appLoading, setLoading] = useState(true)
    useEffect(() => {
        AsyncStorage.getItem('user').then(savedUser => {
            setLoading(false)
            if (savedUser) {
                dispatch(setLogged(savedUser));
            }
        });
    }, []);

    const { user, loading } = useSelector(state => state.user);
    if (loading || appLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={user ? "App" : "Auth"}
                screenOptions={{ headerShown: false }}
            >
                {user ?
                    <Stack.Screen name="App" component={AppTabs} />
                    :
                    <Stack.Screen name="Auth" component={LoginScreen} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
export default AppNavigation;