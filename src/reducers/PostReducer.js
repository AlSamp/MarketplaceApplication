const initialState = {
    marketPost: [], // d
    filteredPosts: [],
    displayPost: false,
    selectedPost: null,
    species: '',
    breed: '',
    image: '',
    price: '',
    description: '',
    sellerName: '',
    userId: '',
    _id: '',
    toUpdate: false,
}



export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FETCH':

            return {
                ...state,
                marketPost: action.payload,
            }
        case 'FILTERED_FETCH':
            return {
                ...state,
                filteredPosts: action.payload,
            }

        case 'SELECTED_POST':
            return {
                ...state,
                displayPost: true,
                selectedPost: action.selectId,
            }

        case 'NONE_SELECTED':
            return {
                ...state,
                displayPost: false,
                selectedPost: null,
            }

        case 'FORM_UPDATE':
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }

        case 'NEW_POST':
            return {
                ...state,
                species: '',
                breed: '',
                image: '',
                price: '',
                description: '',
                sellerName: '',
            }

        case 'ADD_POST':
            return {
                ...state,
                ...action.newPost
            }

        case 'UPDATE_POST':
            return {
                ...state,
                toUpdate: true,
                species: action.payload.species,
                breed: action.payload.breed,
                image: action.payload.image,
                price: action.payload.price,
                description: action.payload.description,
                sellerName: action.payload.sellerName,
                _id: action.payload._id,
            }

        case 'SAVE_POST':
            return {
                ...state,
                toUpdate: false,
                displayPost: false,
                species: '',
                breed: '',
                image: '',
                price: '',
                description: '',
                sellerName: '',
                _id: '',
            }

        case 'DELETE_POST':
            return {
                ...state,
                displayPost: false,
                selectedPost: null,
            }
        case 'UPDATE_IMAGE':
            return {
                ...state,
                image: action.payload,
            }

        case 'SIGN_UP':
            return {
                ...state,
                userName: action.payload.userName,
                password: action.payload.password
            }

        case 'LOGIN_USER':
            return {
                ...state,
                userName: action.payload.isUser.userName,
                password: "",
                userId: action.payload.isUser._id,
            }


        default:
            return state;
    }
}