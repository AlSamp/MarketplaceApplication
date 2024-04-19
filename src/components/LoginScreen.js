import React, { Component, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { set } from 'lodash';


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
            displayName: "",
            password: '',
        };
    }

    setDisplayName = (value) => {
        this.setState({ displayName: value })
    }
    setPassword = (value) => {
        this.setState({ password: value })
    }

    SignUpPress = async () => {
        if (this.props.sellerName.length >= 3 && this.state.password.length >= 6) {
            try {
                let tempName = this.props.sellerName;
                console.log("TempName = " + tempName)
                await this.props.signUp(this.props.sellerName, this.state.password); // send userName and password ot the api call to sign up
                await this.props.formUpdate({ prop: 'sellerName', value: "" }) // clear name and password on screen to have user enter them again
                this.setState({ password: '' });
                await this.props.formUpdate({ prop: 'sellerName', value: tempName }) // clear name and password on screen to have user enter them again 
                alert("You have successfully signed up, please re-enter your details to login");
            } catch (error) {
                alert(error);
                console.log("SignUpPress " + error)
            }
        }
        else {
            alert("Username must be at least 3 charaters long. Password must be at least 6 character long. Please try again.");
        }

    }

    LoginPress = async () => {
        try {

            //await actions.loadInitialPosts();

            let id = await this.props.loginAuth(this.props.sellerName, this.state.password); // get user profile id
            console.log("id = " + id);

            await this.props.formUpdate({ prop: 'sellerId', value: id })
            //await this.props.resetChatState();
            this.props.navigation.navigate('Market');
        } catch (error) {
            console.log("LoginPress " + error)
        }
    }

    render() {
        //const { userName } = this.props
        console.log("UserName = " + this.props.sellerName); // confirm userName
        console.log("Password= " + this.state.password);
        console.log("SellerId = " + this.props.sellerId);
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Text style={styles.title}>Market Place Application </Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='User Name'
                        value={this.props.sellerName}
                        onChangeText={value => {
                            this.props.formUpdate({ prop: 'sellerName', value });

                        }}


                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={this.state.password}
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
    const { sellerName, sellerId, chats } = state;
    return { sellerName, sellerId };
}
export default connect(mapStateToProps, actions)(LoginScreen);
