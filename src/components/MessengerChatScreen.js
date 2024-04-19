import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { sendMessage, noChatSelected, selectChat } from '../actions';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

class MessengerChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageText: '',
        };
        this.scrollViewRef = React.createRef(); // Create ref for ScrollView
    }

    componentDidMount() {
        // Scroll to bottom when component is mounted
        this.scrollToBottom();
    }



    sendMessage = async () => {
        const { messageText } = this.state;
        if (messageText.trim() !== '') {
            const { sellerId, selectedChat, sendMessage } = this.props;
            const { chat } = selectedChat;
            const { _id: chatId } = chat;
            const senderId = sellerId;
            const recipientId = chat.participants.find(participant => participant !== sellerId);
            const content = messageText;
            await sendMessage(senderId, recipientId, content);
            await this.props.selectChat(chat._id);
            this.setState({ messageText: '' }, () => {
                // After updating state, scroll to bottom
                this.scrollToBottom();
            });
        }
    };

    // Function to scroll to bottom
    scrollToBottom = () => {
        if (this.scrollViewRef.current) {
            this.scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };

    renderMessages() {

        const { selectedChat } = this.props;
        console.log("Messenger Chat Screen")
        console.log(selectedChat);
        if (!selectedChat || !selectedChat.chat || !selectedChat.chat.messages) {
            // If selectedChat or chat or messages is null or undefined, return an empty array
            return [];
        }
        else {
            const { chat } = selectedChat;

            return chat.messages.map((message, index) => {
                const isSender = message.sender === this.props.sellerId;
                return (
                    <View key={index} style={[styles.messageContainer, isSender ? styles.senderMessage : styles.receiverMessage]}>
                        <Text style={styles.messageText}>{message.content}</Text>
                        <Text style={styles.timestampText}>{this.formatTimestamp(message.timestamp)}</Text>
                    </View>
                );
            });

        }

    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${time}, ${month} ${day}`;
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={() => this.props.noChatSelected()}>
                    <SimpleIcon name={'close'} size={30} style={styles.closeIcon} />
                </TouchableOpacity>
                <ScrollView style={styles.messagesContainer}>
                    {this.renderMessages()}
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your message..."
                        value={this.state.messageText}
                        onChangeText={(text) => this.setState({ messageText: text })}
                    />
                    {/* Send Message Button */}
                    <TouchableOpacity style={styles.sendButton} onPress={() => this.sendMessage()}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContentContainer: {
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#007BFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    messageContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    senderMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    receiverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E9E9EB',
    },
    messageText: {
        fontSize: 16,
    },
    timestampText: {
        fontSize: 12,
        color: '#777',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
});

const mapStateToProps = (state) => {
    return {
        sellerId: state.sellerId,
        selectedChat: state.selectedChat,
    };
};

export default connect(mapStateToProps, { sendMessage, noChatSelected, selectChat })(MessengerChatScreen);