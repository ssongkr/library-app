import axios from 'react-native-axios';
import querystring from 'query-string'

// action type
export const FETCH_FAC_REQUEST = 'FETCH_FAC_REQUEST';
export const FETCH_FAC_SUCCESS = 'FETCH_FAC_SUCCESS';
export const FETCH_FAC_FAILURE = 'FETCH_FAC_FAILURE';

const fetchFacRequest = () => ({
    type: FETCH_FAC_REQUEST
})

const fetchFacSuccess = (data) => ({
    type: FETCH_FAC_SUCCESS,
    data,
})

const fetchFacFailure = (error) => ({
    type: FETCH_FAC_FAILURE
})

export const fetchMobileID = () => {
    return(dispatch) => {
        dispatch(fetchFacRequest());

        //axios
    }
}
