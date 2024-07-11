export const initialState = {
    loggedIn: false,
    role: '',
    profile: [],
};


function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            // console.log('🕺', action);
            return {
                ...state,
                ...action.details
            };
        case 'SET_LOGGED':
            return {
                ...state,
                loggedIn: action.loggedIn
            };
        case 'SET_RIGHTS':
            return {
                ...state,
                rights: action.rights
            };
        default:
            return state;
    }
}

export default reducer;