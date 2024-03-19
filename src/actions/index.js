export const selectPost = (postId) => {
    return {
        type: 'SELECTED_POST',
        selectId: postId,
    }
}
export const selectUserPost = (postId) => {
    return {
        type: 'USER_SELECTED_POST',
        selectId: postId,
    }
}

export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    }
}

export const userNoneSelected = () => {
    return {
        type: 'USER_NONE_SELECTED',
    }
}

export const cancelUpdate = () => {
    return {
        type: 'CANCEL_UPDATE',
    }
}

export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    };
}

export const updateImage = (imageUri) => {
    return {
        type: 'UPDATE_IMAGE',
        payload: imageUri
    };
};


export const createNewPost = ({ species, breed, image, price, description, sellerName, sellerId }) => {
    const formData = new FormData(); // create form object

    // Get file name from uri
    const uriParts = image.split('/');
    const fileName = uriParts[uriParts.length - 1]


    formData.append('species', species);
    formData.append('breed', breed);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('sellerName', sellerName);
    formData.append('sellerId', sellerId);
    formData.append('image', {
        uri: image,
        name: fileName,
        type: 'image/jpeg',
    });

    return (dispatch) => {
        fetch('http://127.0.0.1:3000/marketPost', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/json'
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                dispatch({ type: 'NEW_POST' });
            })
            .then(() => {
                dispatch(loadInitialPosts(), loadUserPosts());
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

//export const savePost = ({ species, breed, price, description, sellerName, sellerId, _id }) => {
//    return (dispatch) => {
//        console.log("Parameters:", { species, breed, image, price, description, sellerName, sellerId, _id });
//
//        fetch(`http://127.0.0.1:3000/marketPost/${_id}`, {
//            method: 'PUT',
//            body: JSON.stringify({
//                species,
//                breed,
//                image,
//                price,
//                description,
//                sellerName,
//                sellerId,
//            }),
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            }
//        })
//            .then(response => {
//                if (!response.ok) {
//                    throw new Error('Network response not ok');
//                }
//                return response.json();
//            })
//            .then(data => {
//                console.log("Response from server:", data);
//                dispatch({ type: 'SAVE_POST' });
//                dispatch(loadInitialPosts());
//            })
//            .catch(error => {
//                console.log("Error:", error);
//                // Handle errors here, e.g., dispatch an action to update Redux state with error information
//            });
//    }
//}

export const savePost = (species, breed, price, description, sellerName, sellerId, postId) => {
    const formData = new FormData(); // create form object

    // Get file name from uri
    //const uriParts = image.split('/');
    //const fileName = uriParts[uriParts.length - 1]

    formData.append('species', species);
    formData.append('breed', breed);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('sellerName', sellerName);
    formData.append('sellerId', sellerId);

    // Log the FormData
    console.log('FormData:', formData);


    return (dispatch) => {
        fetch(`http://127.0.0.1:3000/marketPost/${postId}`, {
            method: 'PUT',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response not ok');
                }
                dispatch({ type: 'SAVE_POST' });
                dispatch(loadInitialPosts(), loadUserPosts());
            })
            .catch(error => console.log(error));
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

export const loadUserPosts = (id) => { // filter posts from db
    return (dispatch) => {
        fetch(`http://127.0.0.1:3000/sellerId/${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                dispatch({ type: 'FILTERED_FETCH', payload: data })
            })
            .catch(error => console.log("USER_POST_FETCH : " + error))
    };
};



export const signUp = (userName, password) => {
    return (dispatch) => {
        fetch('http://127.0.0.1:3000/signUp', {
            method: 'POST',
            body: JSON.stringify({
                'userName': userName,
                'password': password,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((data) => {
                console.log("ACTION-signUp data == " + data);
                dispatch({ type: 'SIGN_UP', payload: data });
            })
            .catch(error => console.log("ACTION-signUp ERROR:  " + error))
    }
}

export const loginAuth = (userName, password) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                body: JSON.stringify({
                    'userName': userName,
                    'password': password,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response not ok');
            }

            const data = await response.json();
            console.log("ACTION-loginAuth data == ", data);

            if (data && data.isUser && data.isUser._id) {
                dispatch(loadInitialPosts()); // Dispatch loadInitialPosts action
                dispatch(loadUserPosts()); // Dispatch filteredPosts action
                return data.isUser._id; // Return the only _id
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.log("ACTION-LOGIN ERROR: ", error);
            throw error;
        }
    };
};



