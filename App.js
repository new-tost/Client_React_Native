import React, {Component} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Shop from './screens/Shop';

const HomeStack = createStackNavigator(
    {
        Home: { screen: Home },
        Detail: { screen: Detail },
        Shop: { screen: Shop }
    }
);

const HomeContainer = createAppContainer(HomeStack);

export default class App extends React.Component {
    render() {
        return (
            <HomeContainer />
        );
    }
}