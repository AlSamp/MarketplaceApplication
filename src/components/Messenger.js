// Messenger.js
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { loadInitialChats, selectChat } from '../actions';
import MessengerChatScreen from './MessengerChatScreen';

class Messenger extends Component {
    componentDidMount() {
        const sellerId = this.props.sellerId;
        this.props.loadInitialChats(sellerId);
    }



    renderChatItem = ({ item }) => {
        console.log("Display chat = " + this.props.displayChat);
        return (
            <TouchableOpacity onPress={() => this.props.selectChat(item._id)}>
                <View style={styles.chatCard}>
                    {/* Render the content of each chat item here */}
                    <Text>Chat ID: {item._id}</Text>
                    <Text>Number of Messages: {item.messages.length}</Text>
                    <Text>Participants: {item.participants.join(', ')}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderInitialView() {
        const { chats } = this.props.chats;
        if (this.props.displayChat === true) {
            console.log("display chat == true so output messenger chat screen")
            return (
                <MessengerChatScreen />
            )
        }
        else {
            console.log("display chat == false so output chat options")
            return (
                <View style={styles.container}>
                    <FlatList
                        data={chats}
                        renderItem={this.renderChatItem}
                        keyExtractor={(item) => item._id.toString()}
                    />
                </View>
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderInitialView()}
            </View>
        )

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    chatCard: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        elevation: 2,
    },
});

const mapStateToProps = (state) => {
    return {
        sellerId: state.sellerId,
        chats: state.chats,
        displayChat: state.displayChat,
    };
};

export default connect(mapStateToProps, { loadInitialChats, selectChat })(Messenger);
