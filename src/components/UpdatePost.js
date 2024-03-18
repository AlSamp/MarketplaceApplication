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
    onUpdatePress() {
        const { species, breed, image, price, description, sellerName, _id } = this.props;

        this.props.savePost({ species, breed, image, price, description, sellerName, _id });
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <SimpleIcon name={'close'} size={30} style={styles.closeIcon}
                        onPress={() => this.props.noneSelected()}
                    />
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
    return {
        marketPost: state.selectedPost,
        toUpdate: state.toUpdate,
    }
}

export default connect(mapStateToProps, actions)(UpdatePost);
