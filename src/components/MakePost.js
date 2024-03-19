import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Button, TextInput } from '@react-native-material/core';
import * as ImagePicker from 'expo-image-picker';
import * as actions from '../actions';

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingTop: 50,
        paddingLeft: 10,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
    },
    fieldStyles: {
        height: 70,

    },
    addButton: {
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200
    }
})

class MakePost extends Component {

    onAddPress = async () => {

        try {
            const { species, breed, image, price, description, sellerName, sellerId } = this.props;
            let tempName = this.props.sellerName;
            console.log("MAKE POST REDUX: " + this.props.sellerName)
            // get the properties to pass to api call
            await this.props.createNewPost({
                species, breed, image, price, description, sellerName, sellerId
            });
            console.log("MAKE POST REDUX 2: " + sellerName)
            //navigate to market after successful upload
            this.props.navigation.navigate('Market');
            await this.props.formUpdate({ prop: 'sellerName', value: tempName })

        } catch (error) {
            console.log("onAddPress : " + error);
        }

    }

    imageFromLibrary = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            this.props.updateImage(result.assets[0].uri);
        }

        //console.log("Image from library : " + result.assets[0].uri);
    };

    takePhoto = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                return;
            }
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            this.props.updateImage(result.assets[0].uri);
        }
        //console.log("Take Photo : " + result.assets[0].uri);
    };


    render() {
        //console.log("props.selledId :", this.props.sellerId);
        //console.log("props.image:", this.props.image);
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.form}>

                    <Text>Make a new post</Text>
                    <TextInput
                        placeholder="Species"
                        style={styles.fieldStyles}

                        onChangeText={value => this.props.formUpdate({ prop: 'species', value })}
                    />
                    <TextInput
                        placeholder="Breed"
                        style={styles.fieldStyles}

                        onChangeText={value => this.props.formUpdate({ prop: 'breed', value })}
                    />
                    <View style={styles.imageContainer}>
                        {this.props.image && <Image source={{ uri: this.props.image }} style={styles.image} />}

                    </View>

                    <TextInput
                        placeholder="Price"
                        style={styles.fieldStyles}

                        onChangeText={value => this.props.formUpdate({ prop: 'price', value })}
                    />
                    {/* <TextInput
                        placeholder={this.props.sellerName}
                        style={styles.fieldStyles}

                        onChangeText={value => this.props.formUpdate({ prop: 'description', value })}
                    /> */}
                    <TextInput
                        placeholder="Description"
                        style={styles.fieldStyles}

                        onChangeText={value => this.props.formUpdate({ prop: 'description', value })}
                    />
                    <View style={styles.addButton}>
                        <Button title='Add' color='#4db6ac' onPress={this.onAddPress.bind(this)} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Upload from camera roll" onPress={this.imageFromLibrary.bind(this)} />
                        <Button title="Take Picture with camera" onPress={this.takePhoto.bind(this)} />

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    const { species, breed, image, price, description, sellerName, sellerId } = state;
    return { species, breed, image, price, description, sellerName, sellerId };
}

export default connect(mapStateToProps, actions)(MakePost);
