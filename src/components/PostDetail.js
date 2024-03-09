import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PostDetailView from './PostDetailView';
import UpdatePerson from './UpdatePerson';
import * as actions from '../actions';

class PostDetail extends Component {
    renderDetails() {
        if (this.props.toUpdate) {
            return <UpdatePerson />
        } else {
            return <PostDetailView />
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

export default connect(mapStateToProps, actions)(PostDetail);
