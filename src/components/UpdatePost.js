import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, TextInput } from '@react-native-material/core';
import * as actions from '../actions';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
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
        color: '#f47100',
    },
    addButton: {
        marginTop: 20,
    }
})

class UpdatePost extends Component {
    onUpdatePress = async () => {
        const { species, breed, image, price, description, sellerName, sellerId, selectedUserPost } = this.props;

        let id = selectedUserPost._id;
        console.log("UPDATE POST : " + species, breed, price, description, sellerName, sellerId, id)

        await this.props.savePost(species, breed, price, description, sellerName, sellerId, id);
    }

    // onUpdatePress = async () => {
    //     //const { species, breed, image, price, description, sellerName, sellerId, selectedUserPost } = this.props;

    //     //let id = selectedUserPost._id;
    //     //console.log("UPDATE POST : " + species, breed, price, description, sellerName, sellerId, id)
    //     console.log("Species = " + this.props.species);
    //     console.log("Breed = " + this.props.breed);
    //     console.log("Price = " + this.props.price);
    //     console.log("Description = " + this.props.description);
    //     //await this.props.savePost(species, breed, price, description, sellerName, sellerId, id);
    // }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <SimpleIcon name={'close'} size={30} style={styles.closeIcon}
                        onPress={() => this.props.cancelUpdate()}
                    />
                    <Text>Update Post</Text>
                    <TextInput
                        label='Species'
                        style={styles.fieldStyles}
                        value={this.props.species}
                        onChangeText={value => this.props.formUpdate({ prop: 'species', value })}
                    />
                    <TextInput
                        label='Breed'
                        style={styles.fieldStyles}
                        value={this.props.breed}
                        onChangeText={value => this.props.formUpdate({ prop: 'breed', value })}
                    />
                    <TextInput
                        label='Image NOT FINAL'
                        style={styles.fieldStyles}

                        onChangeText={value => this.props.formUpdate({ prop: 'image', value })}
                    />
                    <TextInput
                        label='Price'
                        style={styles.fieldStyles}
                        value={this.props.price}
                        onChangeText={value => this.props.formUpdate({ prop: 'price', value })}
                    />
                    <TextInput
                        label='Description'
                        style={styles.fieldStyles}
                        value={this.props.description}
                        onChangeText={value => this.props.formUpdate({ prop: 'description', value })}
                    />
                    <View style={styles.addButton}>
                        <Button title='Update' color='#4db6ac' onPress={this.onUpdatePress.bind(this)} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}


const mapStateToProps = state => {

    const { species, breed, image, price, description, sellerName, sellerId, selectedUserPost, toUpdate } = state;

    return {
        // marketPost: state.selectedUserPost,
        //toUpdate: state.toUpdate,
        species, breed, image, price, description, sellerName, sellerId, selectedUserPost, toUpdate

    }
}

export default connect(mapStateToProps, actions)(UpdatePost);
