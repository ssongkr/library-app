import { getFormedBody } from '../../modules/HttpFormMaker';
import { parseBookDatas, parseBookImage } from '../../modules/Crawler';

// action types
export const FETCHING_BOOKS_REQUEST = 'FETCHING_BOOKS_REQUEST';
export const FETCHING_BOOKS_SUCCESS = 'FETCHING_BOOKS_SUCCESS';
export const FETCHING_BOOKS_FAILURE = 'FETCHING_BOOKS_FAILURE';
export const FETCHING_MORE_BOOKS_REQUEST = 'FETCHING_MORE_BOOKS_REQUEST';

export const SET_KEYWORD = 'SET_KEYWORD';
export const CLEAR_BOOKS = 'CLEAR_BOOKS';

// action creators
export const fetchingBooksRequest = (page) => ({
    type: FETCHING_BOOKS_REQUEST,
    page,
})
export const fetchingBooksSucccess = (data) => ({
    type: FETCHING_BOOKS_SUCCESS,
    payload: data,
})
export const fetchingBooksFailure = (error) => ({
    type: FETCHING_BOOKS_FAILURE,
    payload: error,
})
export const fetchingMoreBooksRequest = (page) => ({
    type: FETCHING_MORE_BOOKS_REQUEST,
    page,
})
export const setKeyword = (keyword) => ({
    type: SET_KEYWORD,
    keyword
})

export const fetchBooks = (keyword, page) => {
    return async dispatch => {
        (page === 1)
        ? dispatch(fetchingBooksRequest(page))
        : dispatch(fetchingMoreBooksRequest(page))
        
        try {
            const pageSize = 5;
            const body = getFormedBody({ sid:1, mf:'true', q:keyword, page:page, pageSize: pageSize });
            let response = await fetch('http://mlib.sejong.ac.kr/search/Search.Result.List.axa?', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body,
            });
            let curID = (page - 1) * pageSize;
            let html = await response.text();
            let data = await parseBookDatas(html, curID);

            // TODO parallel fetch
            for(let i=0; i<data.length; i++) {
                let response = await fetch(data[i].detailUrl);
                let html = await response.text();
                data[i] = {...data[i], image: parseBookImage(html)}
            }
            dispatch(fetchingBooksSucccess(data));
        } catch(error) {
            dispatch(fetchingBooksFailure(error));
        }
    }
}
