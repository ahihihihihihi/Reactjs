import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            // console.log('FETCH_GENDER_START: ', action);
            state.isLoadingGender = true;
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            // console.log('FETCH_GENDER_SUCCESS: ', action);
            // console.log('FETCH_GENDER_SUCCESS-copyState: ', copyState);
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('FETCH_GENDER_FAILED: ', action);
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,

            }

        default:
            return state;
    }
}

export default adminReducer;