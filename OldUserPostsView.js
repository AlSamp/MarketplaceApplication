import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostMarketView from './PostMarketView';
import CompanyItem from './CompanyItem';
import * as actions from '../actions'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
    }
});

class UserPostsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPosts: [], // Initialize userPosts as an empty array
        };
    }

    selectUserPost(sellerId) {
        props.selectPost
    }

    async componentDidMount() {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userPosts = this.props.marketPost.filter(post => post.sellerId === userId);
            console.log(userPosts);
            this.setState({ userPosts });
        } catch (error) {
            console.error('ComponentDidMount ERROR : ', error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.userPosts}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => selectUserPost(item.sellerId)}>
                            <PostMarketView marketPost={item} />

                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        marketPost: state.marketPost,
    };
}

export default connect(mapStateToProps, actions)(UserPostsView);
