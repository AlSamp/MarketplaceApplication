import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PostMarketView from './PostMarketView';
import PostDetail from './PostDetail';
import PostDetailView from './PostDetailView';
import { loadInitialPosts } from '../actions';


const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
    }
});

class Market extends Component {
    componentDidMount() {
        this.props.loadInitialPosts();


    }

    renderInitialView() {
        if (this.props.displayPost === true) {
            return (
                <PostDetail />
            )
        } else if (this.props.marketPost.sellerId == sellerId) {

        }
        {
            return (

                <FlatList
                    data={this.props.marketPost}
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
        displayPost: state.displayPost,
    }
}

export default connect(mapStateToProps, { loadInitialPosts })(Market);
