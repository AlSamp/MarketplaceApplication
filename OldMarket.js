import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PostMarketView from './PostMarketView';
import PostDetail from './PostDetail';
import PostDetailView from './PostDetailView';
import { loadInitialContacts } from '../actions';

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
    }
});

class Market extends Component {
    componentDidMount() {
        this.props.loadInitialContacts();
    }

    renderInitialView() {
        if (this.props.detailView === true) {
            return (
                <PostDetail />
            )
        } else {
            return (
                <FlatList
                    data={this.props.people}
                    renderItem={({ item }) => <PostMarketView people={item} />}
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
        people: state.people,
        detailView: state.detailView,
    }
}

export default connect(mapStateToProps, { loadInitialContacts })(Market);
