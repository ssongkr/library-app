import { SET_KEYWORD } from '../actions/NoticeSearchActions';
import { combineReducers } from 'redux';
import {
    SEARCH_NOTICE_SUCCESS, SEARCH_NOTICE_REQUEST,
    SEARCH_NOTICE_FAILURE, SEARCH_MORE_NOTICE_REQUEST,
} from '../actions/NoticeSearchActions'

const initialKeyword = {
    keyword: '',
}
const initialState = {
    data: [],
    page: 0,
    isFetching: false,
    isFetchingMore: false,
    error: '',
};

const keywordReducer = (state = initialKeyword, action) => {
    switch (action.type) {
        case SET_KEYWORD:
            return { ...state, keyword: action.keyword };
        default:
            return state;
    }
}
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_NOTICE_REQUEST:
            return {
                ...state,
                data: [],
                page: 0,
                isFetching: true,
            }
        case SEARCH_NOTICE_SUCCESS:
            return { 
                ...state,
                data: [...state.data, ...action.data],
                page: state.page + 1,
                isFetching: false,
                isFetchingMore: false,
            }
        case SEARCH_NOTICE_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetchingMore: false,
                error: action.error,
            }
        case SEARCH_MORE_NOTICE_REQUEST:
            return {
                ...state,
                isFetchingMore: true,
            }
        default:
            return state;
    }
}

const noticeSearchReducers = combineReducers({
    keywordReducer,
    searchReducer,
})

export default noticeSearchReducers;