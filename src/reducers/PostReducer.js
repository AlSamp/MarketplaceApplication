const initialState = {
    marketPost: [], // d
    displayPost: false,
    displayUserPost: false,
    displayChat: false,
    selectedPost: null,
    selectedUserPost: null,
    selectedChat: null,
    displayMarketChat: null,
    selectedMarketChatId: null,
    selectedMarketChat: null,
    species: '',
    breed: '',
    image: '',
    price: '',
    description: '',
    userName: '',
    userId: '',
    _id: '',
    toUpdate: false,
    chats: [],
    activeTab: 0,

}



export default (state = initialState, action) => {
    switch (action.type) {
        case 'INITIAL_FETCH':

            return {
                ...state,
                marketPost: action.payload,

            }

        case 'RESET_STORE':

            return {
                marketPost: null,
                displayPost: false,
                displayUserPost: false,
                displayChat: false,
                selectedPost: null,
                selectedUserPost: null,
                selectedChat: null,
                displayMarketChat: null,
                selectedMarketChatId: null,
                selectedMarketChat: null,
                species: '',
                breed: '',
                image: '',
                price: '',
                description: '',
                userName: '',
                userId: '',
                _id: '',
                toUpdate: false,
                chats: [],
                activeTab: 0,
            }
        case 'RESET_CHAT':
            return {
                chats: [],
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

        case 'NO_CHAT_SELECTED':
            return {
                ...state,
                displayChat: false,
                selectedChat: null,
            }

        case 'SELECTED_CHAT':
            return {
                ...state,
                displayChat: true,
                selectedChat: action.payload,
            }

        case 'MARKET_CHAT':
            return {
                ...state,
                displayMarketChat: true,
                selectedMarketChat: action.payload,
            }

        case 'NO_MARKET_CHAT_SELECTED':
            return {
                ...state,
                displayMarketChat: false,
                selectedMarketChat: null,
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
        case 'INITIAL_CHAT_FETCH':
            return {
                ...state,
                chats: action.payload, // Update chats with fetched data
            };

        case 'MESSAGE_SENT':
            // Update the chat messages with the new data from the action payload
            return {
                ...state,
                //displayChat: true,
                selectedChat: action.payload,
            };


        case 'CREATE_CHAT':

            return {
                ...state,
                displayChat: true,
                selectedChat: action.payload,
            };
        case 'SET_ACTIVE_TAB':
            return {
                ...state,
                activeTab: action.payload,
            };


        default:
            return state;
    }
}