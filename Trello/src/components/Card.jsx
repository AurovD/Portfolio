import React from 'react';
function Card({task, setStatus, updating}) {
    const [userList, setUserList] = React.useState([]);
    const [form, setForm] = React.useState(false);
    const [users, setUsers] = React.useState("");
    const [checkBox, setCheckBox] = React.useState();
    const handleInputChange = (val) => {
        setCheckBox(val);
    };
    function showForm(){
        setForm(true);
    }
    const getUsers = async () => {
        let body = {
            id: task.users,
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

    React.useEffect(() => {
        getUsers();
    }, []);

    const onChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let body = {
                id: task.id,
                status: checkBox
        }
        setStatus(body);
    };
    const updateUsers = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let body = {
                names: users
        }
        setForm(false);
        updating(body);
    };


    return (
        <div className="card" onClick={showForm}>
            {
                form ?
                    <form method="POST" className="change">
                        <div className="radiobox">
                            <p><input
                                type="radio"
                                name="status"
                                value={"Task Ready"}
                                onChange={e => handleInputChange(e.target.value)}
                            />Task Ready</p>
                            <p><input
                                type="radio"
                                name="status"
                                value={"On Progress"}
                                onChange={e => handleInputChange(e.target.value)}
                            />On Progress</p>
                            <p><input
                                type="radio"
                                name="status"
                                value={"Needs Review"}
                                onChange={e => handleInputChange(e.target.value)}
                            />Needs Review</p>
                            <p><input
                                type="radio"
                                name="status"
                                value={"Done"}
                                onChange={e => handleInputChange(e.target.value)}
                            />Done</p>
                        </div>
                        <p><input type="submit"  className="changeBut" value="Изменить статус" onClick={onChange}/></p>
                        <p>Участники</p>
                        <p><input
                            className="changeInput"
                            type="text"
                            value={users}
                            placeholder="Gouddwerg, Pringles"
                            onChange={e => handleInputChange(e.target.value)}
                        /></p>
                        <p><input type="submit"  className="changeBut" value="Добавить" onClick={updateUsers}/></p>
                    </form> :
                    <div>
                    <h3 className="title">{task.name}</h3>
                    <p>{task.plot}</p>
                    <p className="state">{task.status}</p>
                    <p>{task.tags}</p>
                    <p className="date">{task.date}</p>
                    <div className="userList users">
                        {
                            userList.map((user, index) => <p key={index}>{user}</p>)
                        }
                    </div>
                </div>
            }
        </div>
    );
};
export default Card;