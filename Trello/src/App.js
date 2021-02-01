import {useDispatch, useSelector} from "react-redux";
import {Aside} from './components';
import {Home, SignUp, Board, Prof} from './pages';
import Cookies from 'universal-cookie';
import React from "react";
import { Route } from 'react-router-dom';
import { useHistory, NavLink } from "react-router-dom";
import {fetchUsers} from "./redux/actions/users";
const cookies = new Cookies();

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, setUser] = React.useState(cookies.get("user"));
    const submitForm = async (e) => {
        e.preventDefault();
        e.stopPropagation();
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
            cookies.set('user', {id: data.data.id, name: data.data.name, login: data.data.login}, { path: '/' });
            setUser(cookies.get("user"));
            // history.push("/dash");
        }
    };


    function logout(){
        cookies.remove('user', { path: '/', domain: "localhost" });
        console.log(user);
        history.push("/");
        setUser(cookies.get("user"));
        console.log(user);
    }

    function handleClick() {
        history.push("/");
    }

    const onSubmitUser= React.useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(fetchUsers(login, password));
    }, [login, password]);

  return (
    <div className="container">
        <div className="header">
            <div onClick={handleClick} className="logo">TASK</div>
            <div>
                {
                    user ? <div className="user"> <NavLink to="/profile">{user.name}</NavLink>
                        <button onClick={logout}>
                            Выход
                        </button>
                    </div> : <form className="auth" method="POST" action="http://localhost:8001/api/users/auth">
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
                        <div className="authsubmit" onClick={submitForm}>Вход</div>
                    </form>
                }
            </div>
        </div>
        <Route path="/board" component={Board} exact/>
        <Route path="/profile" component={Prof} exact/>
        {
            user ?
            <Route path="/" exact component={() => <Home userData={user}/>}/> :
            <Route path="/" exact component={() => <SignUp userData={user}/>}/>
        }
       <Aside/>
    </div>
  );
};

export default App;
