import { getQueryString } from '../../modules/HttpFormMaker';

// action type
export const SET_KEYWORD = 'SET_KEYWORD';

export const SEARCH_NOTICE_REQUEST = 'SEARCH_NOTICE_REQUEST';
export const SEARCH_MORE_NOTICE_REQUEST = 'SEARCH_MORE_NOTICE_REQUEST';
export const SEARCH_NOTICE_SUCCESS = 'SEARCH_NOTICE_SUCCESS';
export const SEARCH_NOTICE_FAILURE = 'SEARCH_NOTICE_FAILURE';

// action creator
const searchNoticeRequest = () => ({
    type: SEARCH_NOTICE_REQUEST,
})
const searchNoticeSuccess = (data) => ({
    type: SEARCH_NOTICE_SUCCESS,
    data,
})
const searchNoticeFailure = (error) => ({
    type: SEARCH_NOTICE_FAILURE,
    error,
})
const searchMoreNoticeRequest = () => ({
    type: SEARCH_MORE_NOTICE_REQUEST,
})

// action creator
export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    keyword,
})
export const searchNotice = (page, keyword) => {
    let path = '/board/find';
    let querys = {
        size: 8, 
        page: 0,
        keyword: keyword,
    }
    const host = 'http://ncm.sejong.ac.kr:8084';
    const queryString = getQueryString(querys);
    const url = (host + path + queryString);
    
    return async dispatch => {
        (page === 0)
        ? dispatch(searchNoticeRequest())
        : dispatch(searchMoreNoticeRequest());
        try {
            const res = await fetch(url);
            const json = await res.json();
            console.log(json.data);
            dispatch(searchNoticeSuccess(json.data));
        } catch (err) {
            dispatch(searchNoticeFailure(err));
        }
    }
}