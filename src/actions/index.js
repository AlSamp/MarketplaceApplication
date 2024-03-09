export const selectPost = (postId) => {
    return {
        type: 'SELECTED_POST',
        selectId: postId,
    }
}

export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    }
}

export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    };
}

export const createNewPost = ({ species, breed, image, price, description, sellerName }) => {
    return (dispatch) => {
        fetch('http://127.0.0.1:3000/marketPost', {
            method: 'POST',
            body: JSON.stringify({
                'species': species,
                'breed': breed,
                'image': image,
                'price': price,
                'description': description,
                'sellerName': sellerName,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                dispatch({ type: 'NEW_POST' });
            })
            .then(() => {
                dispatch(loadInitialPosts());
            })
            .catch(error => console.log(error))
    }
}

export const updatePost = (post) => {
    return {
        type: 'UPDATE_POST',
        payload: post,
    }
}

export const savePost = ({ species, breed, image, price, description, sellerName, notes, _id }) => {
    return (dispatch) => {
        fetch(`http://127.0.0.1:3000/marketPost/${_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                'species': species,
                'breed': breed,
                'image': image,
                'price': price,
                'description': description,
                'sellerName': sellerName,
                'notes': notes,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                dispatch({ type: 'SAVE_POST' });
            })
            .then(() => {
                dispatch(loadInitialPosts());
            })
            .catch(error => console.log(error))
    }
}

export const deletePost = (id) => {
    return (dispatch) => {
        fetch(`http://127.0.0.1:3000/marketPost/${id}`, { method: 'DELETE' })
            .then(() => {
                dispatch({ type: 'DELETE_POST' });
            })
            .then(() => {
                dispatch(loadInitialPosts());
            })
            .catch(error => console.log(error))
    }
}

export const loadInitialPosts = () => {
    return (dispatch) => {
        fetch('http://127.0.0.1:3000/marketPost')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                dispatch({ type: 'INITIAL_FETCH', payload: data })
            })
            .catch(error => console.log("loadInitialPosts : " + error))
    };
};
