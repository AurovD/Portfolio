import {setChanges, setLoaded} from "./tasks";

export const setUser = (payload) => ({
    type: 'SET_USER',
    payload,
});
export const fetchUsers = (login, password) => async (dispatch) => {
    let body = {
        "login": login,
        "password": password
    }
    let res = await fetch("http://localhost:8001/api/users/auth", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    let data = await res.json();
    console.log(data.data);
    if(data) {
        // history.push("/dash");
    }
};

export const updateUsersList = (body) => async (dispatch) => {
    console.log(body, "hi");
};