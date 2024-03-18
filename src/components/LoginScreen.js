import React, { Component, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import * as actions from '../actions';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        marginBottom: 20
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        paddingHorizontal: 10,
    },
    screenButton: {
        padding: 10,
        color: 'red'

    },
    guestButton: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    }
})


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            userId: '',
        };
    }
    setUserName = (value) => {
        this.setState({ userName: value })
    }
    setPassword = (value) => {
        this.setState({ password: value })
    }
    getUserName = async () => {
        return await AsyncStorage.getItem('userName')
    }

    SignUpPress = async () => {
        try {
            await this.props.signUp(this.state.userName, this.state.password); // send userName and password ot the api call to sign up
            await AsyncStorage.setItem('userName', this.state.userName);
            //const storedUserName = await AsyncStorage.getItem('userName')
            //console.log("Stored UserName = " + storedUserName); // confirm userName name is stored on device
            // this.props.navigation.navigate('Market');
        } catch (error) {
            console.log("SignUpPress " + error)
        }
    }

    // LoginPress = async () => {
    //     try {

    //         // check user credentials by sending them to api call
    //         let userData = await this.props.loginAuth(this.state.userName, this.state.password); // get user profile id
    //         console.log("UserData = " + userData);

    //         // upon success store needed user details
    //         await AsyncStorage.setItem('userName', this.state.userName);
    //         await AsyncStorage.setItem('userId', userData);

    //         const localName = await AsyncStorage.getItem('userName');
    //         const localId = await AsyncStorage.getItem('userId');
    //         console.log("localName = " + localName);
    //         console.log("localID = " + localId);
    //         // navigate to market 
    //         this.props.navigation.navigate('Market');
    //     } catch (error) {
    //         console.log("LoginPress " + error)
    //     }
    // }
    LoginPress = async () => {
        try {

            // check user credentials by sending them to api call
            let userData = await this.props.loginAuth(this.state.userName, this.state.password); // get user profile id
            console.log("UserData = " + userData);

            // upon success store needed user details
            await AsyncStorage.setItem('userName', this.state.userName);
            await AsyncStorage.setItem('userId', userData);

            const localName = await AsyncStorage.getItem('userName');
            const localId = await AsyncStorage.getItem('userId');
            console.log("localName = " + localName);
            console.log("localID = " + localId);
            // navigate to market 
            this.props.navigation.navigate('Market');
        } catch (error) {
            console.log("LoginPress " + error)
        }
    }

    render() {

        console.log("UserName = " + this.state.userName); // confirm userName
        console.log("Password= " + this.state.password);
        console.log("UserId = " + this.state.userId);
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Text style={styles.title}>Market Place Application </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='User Name'
                        onChangeText={this.setUserName}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={this.setPassword}
                    />
                    <Button
                        style={styles.screenButton}
                        title="Login" onPress={this.LoginPress.bind(this)}
                    />
                    <View>
                        <Text>  </Text>
                        <Text>  </Text>
                        <Text>  </Text>
                    </View>
                    <Button
                        style={styles.screenButton}
                        title="Sign Up " onPress={this.SignUpPress.bind(this)}
                    />
                    {/* <Button
                        style={styles.guestButton}
                        title="Continue as guest >> " onPress={""}
                    /> */}



                </SafeAreaView>
            </View>
        );

    }
};

const mapStateToProps = state => {
    const { species, breed, image, price, description, sellerName, sellerId } = state;
    return { species, breed, image, price, description, sellerName, sellerId };
}
export default connect(mapStateToProps, actions)(LoginScreen);
