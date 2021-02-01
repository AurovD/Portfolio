const initialState = {
    data: "",
    isLoaded: false
};

const tasks = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHANGES':
            return {
                ...state,
                data: action.data,
            };
        default:
            return state;
    }
};
export default tasks;