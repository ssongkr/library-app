import {
    FETCH_FAC_REQUEST,
    FETCH_FAC_SUCCESS,
    FETCH_FAC_FAILURE,
} from '../actions/FacilityHomeActions';

const initialState = {
    dateTime: [],
    isFetching: false,
    error: false,
}

const facilityHomeReducer = (state = initialState, action) =>{
    switch(action.type){
        case FETCH_FAC_REQUEST: {
            return {
                ...state,
                isFetching: true,
                dateTime: []
            }
        }
        
        case FETCH_FAC_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                dateTime: action.data,
            }
        }

        case FETCH_FAC_FAILURE: {
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

export default facilityHomeReducer;