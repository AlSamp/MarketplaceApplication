import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';


const styles = StyleSheet.create({
    title: {
        top: -60,
        left: 100,
        fontSize: 24,
        color: 'white'
    },
    image: {
        height: 175,
    },
    action: {
        top: -30,
        backgroundColor: 'black',
        color: 'white',
        fontSize: 24,
    },
    icon: {
        position: 'absolute',
        top: 15,
        left: 0,
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0)',
    },
});

const PostMarketView = (props) => {
    return (
        <TouchableOpacity onPress={() => props.selectPost(props.marketPost)}>
            <View>
                <Image
                    source={{ uri: `http://localhost:3000/${props.marketPost.image}` }} // display post image
                    style={styles.image}
                />
                <Text style={styles.action}>{props.marketPost.breed}</Text>
            </View>
        </TouchableOpacity>
    )
}



export default connect(null, actions)(PostMarketView);
