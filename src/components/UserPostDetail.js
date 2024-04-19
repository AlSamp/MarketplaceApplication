import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import UserPostDetailView from './UserPostDetailView';
import UpdatePost from './UpdatePost';
import * as actions from '../actions';
class UserPostDetail extends Component {
    renderDetails() {

        if (this.props.toUpdate) {
            return <UpdatePost />
        } else {
            return <UserPostDetailView />
        }
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
        toUpdate: state.toUpdate,
    }
}

export default connect(mapStateToProps, actions)(UserPostDetail);
