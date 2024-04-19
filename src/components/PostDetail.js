import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PostDetailView from './PostDetailView';
import UpdatePost from './UpdatePost';
import MarketChatScreen from './MarketChatScreen';
import * as actions from '../actions';
import MessengerChatScreen from './MessengerChatScreen';

class PostDetail extends Component {
    renderDetails() {

        // if (this.props.displayChat === true) {
        //     console.log("display chat == true so output messenger chat screen")
        //     return (
        //         <MessengerChatScreen />
        //     )
        // }
        // else
        return <PostDetailView />
    }

    render() {
        return (
            <View>
                {this.renderDetails()}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        displayChat: state.displayChat,
    }
}

export default connect(mapStateToProps, actions)(PostDetail);
