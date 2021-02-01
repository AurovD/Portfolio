export const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
});
export const getTasks = (body) => async (dispatch) => {
    let res = await fetch('http://localhost:8001/api/tasks/getTask', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    let data = await res.json();
    if(data) {
        dispatch(getListTasks(data));
        dispatch(setLoaded(true));
    }
};
export const getListTasks = (data) => ({
    type: 'GET_TASKS',
    data: data,
});

export const changeStatus = (body) => async (dispatch) => {
    dispatch(setLoaded(false));
    let res = await fetch("http://localhost:8001/api/tasks/status", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    let data = await res.json();
    if(data.msg === "ok") {
        dispatch(setChanges(data));
    }
};
export const setChanges = (data) => ({
    type: 'SET_CHANGES',
    data: data,
});