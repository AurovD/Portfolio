import React from 'react';
import {useDispatch} from "react-redux";
import {BoardCard} from '../components';
// import {SignUp} from '../pages';
function Home({ userData }) {
    const dispatch = useDispatch();
    const [form, setForm] = React.useState(false);
    const [name, setName] = React.useState("");
    const [users, setUsers] = React.useState("");
    const [boards, setBoards] = React.useState([]);
    function showForm(){
        setForm(true);
    }
    const getBoards = async () => {
        let body = {
            id: userData.id
        }
        let res = await fetch('http://localhost:8001/api/boards/getBoard', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        let data = await res.json();
        if(data) {
            setBoards(data.data);
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let body = {
            name: name,
            id: userData.id,
            users: users
        }
        let res = await fetch("http://localhost:8001/api/boards/createBoard", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        let data = await res.json();
        if(data.msg === "ok") {
            setForm(false);
            setName("");
            getBoards();
        }
    };
    React.useEffect(() => {
        getBoards();
    }, []);
    return (
        <div className="main">
            <h1>BOARD</h1>
            <div></div>
                <div className="boardsBox">
                {
                    boards.map((obj, index) =>
                        <BoardCard board={obj} key={index}/>
                    )
                }
                <div className="board" onClick={showForm}>
                    {
                        form ? <form className="formBoard" method="POST" action="http://localhost:8001/api/boards/createBoard">
                                <input
                                    type="text"
                                    placeholder="Название"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <p>Участники</p>
                                <input
                                    type="type"
                                    value={users}
                                    placeholder="Gouddwerg, Pringles"
                                    onChange={e => setUsers(e.target.value)}
                                />
                                <input type="submit" className="createBut" value="Создать" onClick={submitForm}/>
                            </form> :
                            <h3>Создать панель</h3>
                    }
                </div>
            </div>
        </div>
    );
};
export default Home;