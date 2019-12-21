import { getFormedBody } from '../../modules/HttpFormMaker';
import { parseBookCollections } from '../../modules/Crawler';

export const FETCHING_BOOK_COLLECTIONS_REQUEST = 'FETCHING_BOOK_COLLECTIONS_REQUEST';
export const FETCHING_BOOK_COLLECTIONS_SUCCESS = 'FETCHING_BOOK_COLLECTIONS_SUCCESS';
export const FETCHING_BOOK_COLLECTIONS_FAILURE = 'FETCHING_BOOK_COLLECTIONS_FAILURE';

export const fetchingBookCollectionsRequest = () => ({
    type: FETCHING_BOOK_COLLECTIONS_REQUEST,
})
export const fetchingBookCollectionsSuccess = (data) => ({
    type: FETCHING_BOOK_COLLECTIONS_SUCCESS,
    data: data
})
export const fetchingBookCollectionsFailure = (error) => ({
    type: FETCHING_BOOK_COLLECTIONS_FAILURE,
    error: error
})

export const fetchBookCollections = (cid) => {
    return async dispatch => {
        dispatch(fetchingBookCollectionsRequest());
        try {
            const body = getFormedBody({ 'cid': cid, 'sid': 0, 'branchCode': '01' })
            const response = await fetch('http://mlib.sejong.ac.kr/search/ItemDetail.axa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body,
            });
            const html = await response.text();
            const data = await parseBookCollections(html);
            dispatch(fetchingBookCollectionsSuccess(data));
        } catch (error) {
            dispatch(fetchingBookCollectionsFailure(error));
        }
    }
}