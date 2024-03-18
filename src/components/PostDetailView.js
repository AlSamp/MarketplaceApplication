import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as actions from '../actions';

const styles = StyleSheet.create({
    title1: {
        top: -75,
        left: 100,
        fontSize: 24,
    },
    title2: {
        top: -70,
        left: 100,
        fontSize: 24,
    },
    image: {
        height: 300,
        backgroundColor: 'transparent',
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 5,
        color: 'red',
    },
    icon: {
        position: 'absolute',
        top: 15,
        left: 0,
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0)',
    },
    textArea: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 40,
        paddingTop: 5,
    },
    finalText: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 10,
    },
    textIcons: {
        color: '#26a69a',
    },
    actionArea: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    editIcon: {
        color: '#26a6e4',
    },
    sections: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        width: 100,
    },
    deleteIcon: {
        color: '#e9a69a',
    },
    editDeleteArea: {
        flexDirection: 'row',
        paddingBottom: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(211,211,211, 0.3)',
        marginBottom: 10,
        marginTop: 20,
    },
    actionImage: {
        width: 100,
        height: 100,
    }
});


class PostDetailView extends Component {
    updateTest() {
        this.props.updatePost(this.props.marketPost);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image
                        source={{ uri: `http://localhost:3000/${this.props.marketPost.image}` }}
                        style={styles.image}
                    />
                    <SimpleIcon name={'close'} size={30} style={styles.closeIcon}
                        onPress={() => this.props.noneSelected()}
                    />
                    <View style={styles.textArea}>

                        <FontAwesome name="paw" size={40} style={styles.textIcons} />
                        <Text style={styles.finalText}>{this.props.marketPost.breed}</Text>
                    </View>
                    <View style={styles.textArea}>
                        <FontAwesome5 name={'pound-sign'} size={40} style={styles.textIcons} />
                        <Text style={styles.finalText}>{"Price : £" + this.props.marketPost.price}</Text>
                    </View>
                    <View style={styles.textArea}>
                        <MaterialIcon name={'mode-edit'} size={40} style={styles.textIcons} />
                        <Text style={styles.finalText}>{this.props.marketPost.description}</Text>
                    </View>
                    <View style={styles.actionArea}>
                        <TouchableOpacity>
                            <MaterialIcon name={'sms'} size={40} style={styles.textIcons} />
                            <Text>SMS</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        marketPost: state.selectedPost,
        toUpdate: state.toUpdate,
    }
}

export default connect(mapStateToProps, actions)(PostDetailView);
