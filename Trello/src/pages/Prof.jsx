import React from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function Prof() {
    const [name, setName] = React.useState(cookies.get("user").name);
    const [login, setLogin] = React.useState(cookies.get("user").login);
    const [password, setPassword] = React.useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let body = {
            "id": cookies.get("user").id,
            "name": name,
            "login": login,
            "password": password
        }
        let res = await fetch("http://localhost:8001/api/users/changes", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        let data = await res.json();
        if(data) {
            cookies.set('user', {id: data.data.id, name: data.data.name, login: data.data.login}, { path: '/' });
        }
    };


    return (
        <div className="main">
            <h1>Profile</h1>
            <div></div>
            <div className="">
                <form className="profForm" action="http://localhost:8001/api/users/changes" method="POST">
                    <input type="text"
                           placeholder="Name"
                           value={name}
                           onChange={e => setName(e.target.value)}
                           required/>
                    <input type="text"
                           placeholder="Login"
                           value={login}
                           onChange={e => setLogin(e.target.value)}
                           required/>
                    <div className="submit" onClick={submitForm}>Изменить</div>
                </form>
                <form className="profForm" action="http://localhost:8001/api/users/" method="POST">
                    <input type="password"
                           placeholder="Password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           required/>
                    <div className="submit" onClick={submitForm}>Изменить</div>
                </form>
            </div>
        </div>
    );
}
export default Prof;