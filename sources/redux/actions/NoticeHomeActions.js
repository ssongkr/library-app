import { getQueryString } from '../../modules/HttpFormMaker';

// action type
export const FETCH_NOTICE_REQUEST = 'FETCH_NOTICE_REQUEST';
export const FETCH_MORE_NOTICE_REQUEST = 'FETCH_MORE_NOTICE_REQUEST';
export const FETCH_NOTICE_SUCCESS = 'FETCH_NOTICE_SUCCESS';
export const FETCH_NOTICE_FAILURE = 'FETCH_NOTICE_FAILURE';
export const SET_CATEGORY = 'SET_CATEGORY';

// action creator
const fetchNoticeRequest = () => ({
    type: FETCH_NOTICE_REQUEST,
})
const fetchNoticeSuccess = (data) => ({
    type: FETCH_NOTICE_SUCCESS,
    data,
})
const fetchNoticeFailure = (error) => ({
    type: FETCH_NOTICE_FAILURE,
    error,
})
const fetchMoreNoticeRequest = () => ({
    type: FETCH_MORE_NOTICE_REQUEST,
})
// action creator
export const setCategory = (category) => ({
    type: SET_CATEGORY,
    category,
})

// TODO implements refresh

// thunk action creator
export const fetchNotice = (page=0, type='공지') => {
    let path = '/board/get';
    let querys = {
        size: 8, 
        page: page,
        type: type,
    }
    const host = 'http://ncm.sejong.ac.kr:8084';
    const queryString = getQueryString(querys);
    const url = (host + path + queryString);
    
    return async dispatch => {
        (page === 0)
        ? dispatch(fetchNoticeRequest())
        : dispatch(fetchMoreNoticeRequest());
        
        try {
            const res = await fetch(url);
            const json = await res.json();
            dispatch(fetchNoticeSuccess(json.data));
        } catch (err) {
            dispatch(fetchNoticeFailure(err));
        }
    }
}