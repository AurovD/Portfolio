import React from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import Cookies from 'universal-cookie';
import {setLoaded} from "../redux/actions/tasks";
const cookies = new Cookies();
function BoardCard({ board }) {
    const dispatch = useDispatch();
    const history = useHistory();
    function handleClick() {
        history.push("/board");
        cookies.set('board', board, { path: '/' });
        dispatch(setLoaded(false));
    }
    return (
        <div onClick={handleClick} className="board">
             <h3>{board.name}</h3>
        </div>
    );
}
export default BoardCard;