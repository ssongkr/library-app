import { 
    parseMyBookInfo, 
    parseLateFeeInfo,
    parseMyBookNotice,
} from '../../modules/Crawler';
import { my_book_html, late_fee_html, my_book_noti_html } from './test_html';

export const FETCH_MY_BOOK_REQUEST = 'FETCH_MY_BOOK_REQUEST';
export const FETCH_MY_BOOK_SUCCESS = 'FETCH_MY_BOOK_SUCCESS';
export const FETCH_MY_BOOK_FAILURE = 'FETCH_MY_BOOK_FAILURE';

export const FETCH_MY_BOOK_NOTICE_REQUEST = 'FETCH_MY_BOOK_NOTICE_REQUEST';
export const FETCH_MY_BOOK_NOTICE_SUCCESS = 'FETCH_MY_BOOK_NOTICE_SUCCESS';
export const FETCH_MY_BOOK_NOTICE_FAILURE = 'FETCH_MY_BOOK_NOTICE_FAILURE';

const fetchMyBookNoticeReuqest = () => ({
    type: FETCH_MY_BOOK_NOTICE_REQUEST,
})
const fetchMyBookNoticeSuccess = (notices) => ({
    type: FETCH_MY_BOOK_NOTICE_SUCCESS,
    notices,
})
const fetchMyBookNoticeFailure = (err) => ({
    type: FETCH_MY_BOOK_NOTICE_FAILURE,
    err,
})
export const fetchMyBookNotice = () => {
    return async (dispatch) => {
        dispatch(fetchMyBookNoticeReuqest());
        try {
            // fetch my book info
            //let res = await fetch('test_url');
            //let html = await res.text();
            //let data = await parseMyBookInfo(html);
            //dispatch(fetchMyBookNoticeSuccess(data));

            dispatch(fetchMyBookNoticeSuccess(parseMyBookNotice(my_book_noti_html)));
        } catch(err) {
            dispatch(fetchMyBookNoticeFailure(err));
        }
    }
}

const fetchMyBookRequest = () => ({
    type: FETCH_MY_BOOK_REQUEST
})
const fetchMyBookSuccess = (books, lateFeeInfo) => ({
    type: FETCH_MY_BOOK_SUCCESS,
    books,
    lateFeeInfo,
})
const fetchMyBookFailure = (err) => ({
    type: FETCH_MY_BOOK_FAILURE,
    err
})
// TODO implement refresh

export const fetchMyBooks = () => {
    //return async (dispatch) => {
    return (dispatch) => {
        dispatch(fetchMyBookRequest());

        try {
            // TODO parallel fetch
        /*
            // fetch my book info
            let res = await fetch('test_url');
            let html = await res.text();
            let books = await parseMyBookInfo(html);

            // fetch late fee info
            res = await fetch('test_url2')
            html = await res.text();
            lateFeeInfo = await parseLateFeeInfo(html);

            dispatch(fetchMyBookSuccess(books, lateFeeInfo));
        */
            dispatch(fetchMyBookSuccess(parseMyBookInfo(my_book_html), parseLateFeeInfo(late_fee_html)));
        } catch (err) {
            dispatch(fetchMyBookFailure(err));
        }
    }
}

