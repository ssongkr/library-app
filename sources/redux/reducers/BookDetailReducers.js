import {
    FETCHING_BOOK_COLLECTIONS_FAILURE,
    FETCHING_BOOK_COLLECTIONS_REQUEST,
    FETCHING_BOOK_COLLECTIONS_SUCCESS,
} from '../actions/BookDetailActions';

const initialState = {
    isFetching: false,
    data: [],
}

const bookDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_BOOK_COLLECTIONS_REQUEST:
            return { ...state, isFetching: true };
        case FETCHING_BOOK_COLLECTIONS_SUCCESS:
            return { ...state, isFetching: false, data: action.data };
        case FETCHING_BOOK_COLLECTIONS_FAILURE:
            return { ...state, isFetching: false }; // error message 추가 
        default:
            return state;
    }
}

export default bookDetailReducer;