import React, { Component, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PostMarketView from './PostMarketView';
import UserPostDetail from './UserPostDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserPostDetailView from './UserPostDetailView';
import * as actions from '../actions';

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
    }
});

class UserPostsOnMarket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPosts: [],
        };
    }

    selectUserPost(sellerId) {
        props.selectPost
    }

    async componentDidMount() {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userPosts = this.props.marketPost.filter(post => post.sellerId === userId);

            //await this.props.filteredPosts(userId);
            //console.log(userPosts);
            this.setState({ userPosts });
        } catch (error) {
            console.error('ComponentDidMount ERROR : ', error);
        }
    }

    renderInitialView() {
        if (this.props.displayPost === true) {
            return (
                <UserPostDetail />
            )
        } else {
            return (
                <FlatList
                    data={this.state.userPosts}
                    renderItem={({ item }) => <PostMarketView marketPost={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            )
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

const mapStateToProps = state => {
    return {
        marketPost: state.marketPost,
        filteredPosts: state.filteredPosts,
        displayPost: state.displayPost,
    }
}

export default connect(mapStateToProps, actions)(UserPostsOnMarket);
