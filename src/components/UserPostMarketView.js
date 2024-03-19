import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';


const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    container: {
        backgroundColor: '#9E9E9E', // A light grey background 
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        width: '90%',
        height: 200,
        margin: 5,
    },
    image: {
        flex: 2,
        borderRadius: 10,
        marginRight: 10,
    },
    properties: {
        flex: 1,
    },

    text: {
        fontSize: 15,
        fontWeight: "bold",
    }
});



const UserPostMarketView = (props) => {
    return (
        <TouchableOpacity onPress={() => props.selectUserPost(props.marketPost)}>

            <View style={styles.centerContainer}>
                <View style={styles.container}>
                    <Image
                        source={{ uri: `http://localhost:3000/${props.marketPost.image}` }}
                        style={styles.image}
                    />
                    <View style={styles.properties}>
                        {/*<Text>{'Species: ' + props.marketPost.species}</Text>*/}
                        <Text style={styles.text}>{props.marketPost.breed}</Text>
                        <Text style={styles.text}>{'Price: £' + props.marketPost.price}</Text>
                        <Text style={styles.text}>{'Sold by : ' + props.marketPost.sellerName}</Text>
                        <Text style={styles.text}>{'seller user id : ' + props.marketPost.sellerId}</Text>
                        <Text style={styles.text} numberOfLines={4}>{"\n" + props.marketPost.description}</Text>

                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
}



export default connect(null, actions)(UserPostMarketView);
