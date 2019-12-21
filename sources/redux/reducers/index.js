import { combineReducers } from 'redux';
import bookSearchReducer from './BookSearchReducers';
import bookDetailReducer from './BookDetailReducers';
import bookHomeReducers from './BookHomeReducers';
import noticeHomeReducers from './NoticeHomeReducers';
import noticeSearchReducers from './NoticeSearchReducers';
import mobileIDReducer from './MobileIDReducers';
import facilityHomeReducers from './FacilityHomeReducers';

const rootReducer = combineReducers({
    bookSearchReducer,
    bookDetailReducer,
    bookHomeReducers,
    noticeHomeReducers,
    noticeSearchReducers,
    mobileIDReducer,
    facilityHomeReducers,
})

export default rootReducer;