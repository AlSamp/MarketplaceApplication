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

class UpdatePerson extends Component {
    onUpdatePress() {
        const { pecies, breed, image, price, description, sellerName, _id } = this.props;

        this.props.savePost({ pecies, breed, image, price, description, sellerName, _id });
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <Text>Update Post</Text>
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
                        <Button title='Update' color='#4db6ac' onPress={this.onUpdatePress.bind(this)} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    const { firstName, lastName, phone, email, company, project, notes, _id } = state;
    return { firstName, lastName, phone, email, company, project, notes, _id };
}

export default connect(mapStateToProps, actions)(UpdatePerson);
