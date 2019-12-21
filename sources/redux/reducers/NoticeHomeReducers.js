import { SET_CATEGORY } from '../actions/NoticeHomeActions';
import { combineReducers } from 'redux';
import {
    FETCH_NOTICE_REQUEST,
    FETCH_NOTICE_SUCCESS,
    FETCH_NOTICE_FAILURE,
    FETCH_MORE_NOTICE_REQUEST,
} from '../actions/NoticeHomeActions'

// initial state
const initialCategory = {
    category: '공지',
};
const initialState = {
    data: [],
    page: 0,
    isFetching: false,
    isFetchingMore: false,
    error: '',
};

// reducer
const categoryReducer = (state = initialCategory, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return { ...state, category: action.category };
        default:
            return state;
    }
}
const fetchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTICE_REQUEST:
            return {
                ...state,
                data: [],
                page: 0,
                isFetching: true,
            }
        case FETCH_NOTICE_SUCCESS:
            return { 
                ...state,
                data: [...state.data, ...action.data],
                page: state.page + 1,
                isFetching: false,
                isFetchingMore: false,
            }
        case FETCH_NOTICE_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetchingMore: false,
                error: action.error,
            }
        case FETCH_MORE_NOTICE_REQUEST:
            return {
                ...state,
                isFetchingMore: true,
            }
        default:
            return state;
    }
}

const noticeHomeReducers = combineReducers({
    categoryReducer,
    fetchReducer,
})

export default noticeHomeReducers;