const initialState = {
    marketPost: [], // d
    displayPost: false,
    displayUserPost: false,
    selectedPost: null,
    selectedUserPost: null,
    species: '',
    breed: '',
    image: '',
    price: '',
    description: '',
    userName: '',
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

        case 'SELECTED_POST':
            return {
                ...state,
                displayPost: true,
                selectedPost: action.selectId,
            }

        case 'USER_SELECTED_POST':
            return {
                ...state,
                displayUserPost: true,
                selectedUserPost: action.selectId,
            }

        case 'NONE_SELECTED':
            return {
                ...state,
                displayPost: false,
                selectedPost: null,
            }

        case 'USER_NONE_SELECTED':
            return {
                ...state,
                displayUserPost: false,
                selectedUserPost: null,
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
                //sellerName: action.payload.sellerName,

                _id: action.payload._id,
            }

        case 'SAVE_POST':
            return {
                ...state,
                toUpdate: false,
                displayUserPost: false,
                //species: '',
                //breed: '',
                //image: '',
                //price: '',
                //description: '',
                //_id: '',
            }

        case 'DELETE_POST':
            return {
                ...state,
                displayUserPost: false,
                selectedUSerPost: null,
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

        case 'CANCEL_UPDATE':
            return {
                ...state,
                toUpdate: false,
                //selectedPost: null,
            }

        default:
            return state;
    }
}