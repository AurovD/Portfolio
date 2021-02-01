import React from 'react';
function SignUp() {
    const [name, setName] = React.useState("");
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let body = {
            "name": name,
            "login": login,
            "password": password
        }
        let res = await fetch("http://localhost:8001/api/users/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        let data = await res.json();
        console.log(data)
    };
    return (
            <div className="main">
                <h1>Registration</h1>
                <div></div>
                <div className="regBox">
                    <form className="regForm" action="http://localhost:8001/api/users/create" method="POST">
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
                        <input type="password"
                               placeholder="Password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               required/>
                        <input type="submit" value="Зарегистрироваться" onClick={submitForm}/>
                    </form>
                </div>
            </div>
    );
};
export default SignUp;