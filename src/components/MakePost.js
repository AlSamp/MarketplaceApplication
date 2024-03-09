import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, TextInput } from '@react-native-material/core';
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
        color: '#f47100',
    },
    addButton: {
        marginTop: 20,
    }
})

class MakePost extends Component {
    onAddPress() {
        const { species, breed, image, price, description, sellerName } = this.props;

        this.props.createNewPost({ species, breed, image, price, description, sellerName });

        this.props.navigation.navigate('Market');
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <Text>Make a new post</Text>
                    <TextInput
                        label='Species'
                        style={styles.fieldStyles}

                        onChangeText={value => this.props.formUpdate({ prop: 'species', value })}
                    />
                    <TextInput
                        label='Breed'
                        style={styles.fieldStyles}

                        onChangeText={value => this.props.formUpdate({ prop: 'breed', value })}
                    />
                    <TextInput
                        label='Image NOT FINAL'
                        style={styles.fieldStyles}
                        value={""}
                        onChangeText={value => this.props.formUpdate({ prop: 'image', value })}
                    />
                    <TextInput
                        label='Price'
                        style={styles.fieldStyles}
                        value={""}
                        onChangeText={value => this.props.formUpdate({ prop: 'price', value })}
                    />
                    <TextInput
                        label='SellerName'
                        style={styles.fieldStyles}
                        value={""}
                        onChangeText={value => this.props.formUpdate({ prop: 'sellerName', value })}
                    />
                    <TextInput
                        label='Description'
                        style={styles.fieldStyles}
                        value={""}
                        onChangeText={value => this.props.formUpdate({ prop: 'notes', value })}
                    />
                    <View style={styles.addButton}>
                        <Button title='Add' color='#4db6ac' onPress={this.onAddPress.bind(this)} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    const { species, breed, image, price, description, sellerName } = state;
    return { species, breed, image, price, description, sellerName };
}

export default connect(mapStateToProps, actions)(MakePost);
