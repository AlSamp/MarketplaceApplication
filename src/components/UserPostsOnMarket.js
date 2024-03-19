import React, { Component, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import UserPostMarketView from './UserPostMarketView';
import UserPostDetail from './UserPostDetail';
import UserPostDetailView from './UserPostDetailView';
import * as actions from '../actions';

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
    }
});

class UserPostsOnMarket extends Component {


    renderInitialView() {
        if (this.props.displayUserPost === true) {
            return (
                <UserPostDetail />
            )
        } else {

            return (
                <FlatList
                    data={this.props.marketPost.filter(item => item.sellerId === this.props.sellerId)}
                    renderItem={({ item }) => <UserPostMarketView marketPost={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            )


        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.sellerName}'s Profile</Text>
                {this.renderInitialView()}
            </View>
        )
    }
}

const mapStateToProps = state => {
    const { marketPost, displayUserPost, sellerId, sellerName } = state;
    return { marketPost, displayUserPost, sellerId, sellerName };
}

export default connect(mapStateToProps, actions)(UserPostsOnMarket);
