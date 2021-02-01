import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Cookies from 'universal-cookie';
import {Card} from "../components";
import {changeStatus, getTasks, setLoaded} from "../redux/actions/tasks";
import {updateUsersList} from "../redux/actions/users";
const cookies = new Cookies();
function Board() {
    const dispatch = useDispatch();
    const isLoaded = useSelector(({tasks}) => tasks.isLoaded);
    const task = useSelector(({tasks}) => tasks.data.data);
    const [form, setForm] = React.useState(false);
    const [name, setName] = React.useState("");
    const [plot, setPlot] = React.useState("");
    const [date, setDate] = React.useState("");
    const [tags, setTags] = React.useState("");
    const [users, setUsers] = React.useState("");
    const [userList, setUserList] = React.useState([]);
    function showForm() {
        setForm(true);
    }
    const getUsers = async () => {
        let body = {
            id: cookies.get("board").users,
        }
        let res = await fetch('http://localhost:8001/api/users/getUsers', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        let data = await res.json();
        if(data) {
            setUserList(data.data);
        }
    }
    const submitForm = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let body = {
            name: name,
            plot: plot,
            date: date,
            tags: tags,
            users: users,
            status: "Task Ready",
            idUser: cookies.get("user").id,
            idBoard: cookies.get("board").id_boards,
        }
        let res = await fetch("http://localhost:8001/api/tasks/addTask", {
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
            setPlot("");
            setTags("");
            setUsers("");
            setDate("");
            dispatch(setLoaded(false));
            dispatch(getTasks(body));
        }
    };
    React.useEffect(() => {
        getUsers();
        let body = {
            id: cookies.get("board").id_boards,
        }
        if(!isLoaded) {
            dispatch(getTasks(body));
        }
    }, [isLoaded]);

    const setChanges= body =>{
        dispatch(changeStatus(body));
    }
    const updateUsers= body =>{
        dispatch(updateUsersList(body));
    }

    return (
        <div className="main">
            <h1>{cookies.get("board").name}</h1>
            <div className="userList"> Участники:
                {
                    userList.map((user, index) => <p key={index}>{user}</p>)
                }
            </div>
            <div className="columsBox">
                <h3 className="taskReady">Task Ready</h3>
                <h3 className="onProgress">On Progress</h3>
                <h3 className="needsReview">Needs Review</h3>
                <h3 className="done">Done</h3>
                <div>
                    {
                        isLoaded ?
                            task.map((obj, index) => obj.status === "Task Ready" ? <Card setStatus={setChanges} updating={updateUsers} task={obj} key={index}/> : "")
                         : ""
                    }
                    <div className="cardCreate" onClick={showForm}>
                        {
                            form ? <form className="formTask" method="POST" action="http://localhost:8001/api/tasks/addTask">
                                    <input
                                        type="text"
                                        placeholder="Название"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Описание"
                                        value={plot}
                                        onChange={e => setPlot(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                    <p>Тэги</p>
                                    <input
                                        type="type"
                                        value={tags}
                                        placeholder="#чернаяпятница, #новыйгод"
                                        onChange={e => setTags(e.target.value)}
                                    />
                                    <p>Участники</p>
                                    <input
                                        type="type"
                                        value={users}
                                        placeholder="Gouddwerg, Pringles"
                                        onChange={e => setUsers(e.target.value)}
                                    />
                                    <p><input className="createBut" value="Создать" type="submit" onClick={submitForm}/></p>
                                </form> :
                                <h3>Создать задание</h3>
                        }
                    </div>
                </div>
                <div>
                    {
                        isLoaded ?
                            task.map((obj, index) => obj.status === "On Progress" ? <Card setStatus={setChanges} updating={updateUsers} task={obj} key={index}/> : "")
                            : ""
                    }
                </div>
                <div>
                    {
                        isLoaded ?
                            task.map((obj, index) => obj.status === "Needs Review" ? <Card setStatus={setChanges}  updating={updateUsers} task={obj} key={index}/> : "")
                            : ""
                    }
                </div>
                <div>
                    {
                        isLoaded ?
                            task.map((obj, index) => obj.status === "Done" ? <Card setStatus={setChanges}  updating={updateUsers}task={obj} key={index}/> : "")
                            : ""
                    }
                </div>
            </div>
        </div>
    );
}
export default Board;