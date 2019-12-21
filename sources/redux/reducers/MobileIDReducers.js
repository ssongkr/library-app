import {
    FETCH_MOBILEID_REQUEST,
    FETCH_MOBILEID_SUCCESS,
    FETCH_MOBILEID_FAILURE,
} from '../actions/MobileIDActions';

const initialState = {
    userData: [],
    isFetching: false,
    error: false,
}

const mobileIDReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_MOBILEID_REQUEST: {
            return {
                ...state,
                isFetching: true,
                userData: []
            }
        }
        
        case FETCH_MOBILEID_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                userData: action.data,
            }
        }

        case FETCH_MOBILEID_FAILURE: {
            return{
                ...state,
                isFetching: false,
                error: true
            }
        }

        default: {
            return state
        }
    }
}

export default mobileIDReducer;