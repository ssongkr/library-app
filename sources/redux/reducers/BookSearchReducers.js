import {
    FETCHING_BOOKS_REQUEST,
    FETCHING_BOOKS_SUCCESS,
    FETCHING_BOOKS_FAILURE,
    FETCHING_MORE_BOOKS_REQUEST,
    SET_KEYWORD,
} from '../actions/BookSearchActions';

const initialState = {
    books: [],
    isFetching: false,
    isFetchingMore: false,
    errorMessage: '',
    keyword: '',
    page: 1,
}

const bookSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_BOOKS_REQUEST:
            return { 
                ...state, 
                isFetching: true, 
                books: [], 
                page: action.page + 1 
            };
        case FETCHING_MORE_BOOKS_REQUEST:
            return { 
                ...state, 
                isFetchingMore: true, 
                page: action.page + 1 
            };
        case FETCHING_BOOKS_SUCCESS:
            return { 
                ...state, 
                isFetching: false, 
                isFetchingMore: false, 
                books: [...state.books, ...action.payload] 
            };
        case FETCHING_BOOKS_FAILURE:
            return { 
                ...state, 
                isFetching: false, 
                isFetchingMore: false, 
                errorMessage: action.payload 
            };
        case SET_KEYWORD:
            return { 
                ...state, 
                keyword: action.keyword 
            }
        default:
            return state;
    }
}

export default bookSearchReducer;