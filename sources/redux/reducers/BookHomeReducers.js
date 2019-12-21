import { 
    FETCH_MY_BOOK_FAILURE,
    FETCH_MY_BOOK_REQUEST,
    FETCH_MY_BOOK_SUCCESS,
    FETCH_MY_BOOK_NOTICE_FAILURE,
    FETCH_MY_BOOK_NOTICE_REQUEST,
    FETCH_MY_BOOK_NOTICE_SUCCESS,
} from '../actions/BookHomeActions';
import { combineReducers } from 'redux';

const initialState = {
    books: {
        rentalInfo: [],
        reservedInfo: [],
    },
    lateFeeInfo: {
        amount: '0건',
        lateFee: '0원',
    },
    isFetching: false,
    err: '',
}

const fetchMyBookReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MY_BOOK_REQUEST:
            return { 
                ...state, 
                isFetching: true 
            };
        case FETCH_MY_BOOK_SUCCESS:
            return { 
                ...state, 
                isFetching: false, 
                books: action.books,
                lateFeeInfo: action.lateFeeInfo,
            };
        case FETCH_MY_BOOK_FAILURE:
            return { 
                ...state, 
                isFetching: false, 
                err: 'error message'
            };
        default:
            return state;
    }
}
const initialNoticeState = {
    notices: [],
    isFetching: false,
    err: '',
}
const fetchMyBookNoticeReducer = (state = initialNoticeState, action) => {
    switch(action.type) {
        case FETCH_MY_BOOK_NOTICE_REQUEST:
            return { ...state, isFetching: true };
        case FETCH_MY_BOOK_NOTICE_SUCCESS:
            return { ...state, isFetching: false, notices: action.notices }
        case FETCH_MY_BOOK_NOTICE_FAILURE:
            return { ...state, isFetching: false, err: 'error message'};
        default:
            return state;
    }
}

const bookHomeReducers = combineReducers({
    fetchMyBookReducer,
    fetchMyBookNoticeReducer,
});

export default bookHomeReducers;