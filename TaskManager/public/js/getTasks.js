let tBox = document.querySelector(".taskList");

const getTasks = async () => {
    let res = await fetch("/api/tasks/show", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let data = await res.json();
    data.records.forEach(rec => {
        let row = document.createElement("div");
        console.log(rec);
        console.log(rec.text);
        let h3 = document.createElement("h3");
        h3.innerText = `${rec.executor}`;
        row.appendChild(h3);
        let textCard = document.createElement("p");
        textCard.className = "rowCard";
        textCard.innerText = `${rec.text}`;
        row.appendChild(textCard);
        let date = document.createElement("p");
        date.className = "rowCard";
        date.innerText = `${rec.date}`;
        row.appendChild(date);
        let time = document.createElement("p");
        time.className = "rowCard";
        time.innerText = `${rec.time}`;
        row.appendChild(time);
        for(let key in rec) {
            if(key === "_id") {
                row.setAttribute("data-key", rec[key]);
                row.className = "taskCard";
            }
        }
        if(userGroup === "Начальник") {
            let btn = document.createElement("button");
            btn.innerText = "Удалить";
            btn.className = "rowCard";
            btn.addEventListener("click", deleteRecord);
            row.appendChild(btn);
        }
        if(rec.executor === "null" || !rec.executor) {
            let btn2 = document.createElement("button");
            btn2.innerText = "Принять задачу";
            btn2.className = "rowCard";
            row.appendChild(btn2);
            btn2.addEventListener("click", setExecutor);
        }
        tBox.appendChild(row);
    })
}
const deleteRecord = async (e) => {
    let row = e.target.parentElement;
    let id = row.getAttribute("data-key");
    try{
        let res = await fetch("api/tasks/delete/" + id, {
            method: "delete",
            headers: {
                "Accept": "application/json"
            }
        });
        let data = await res.json();
        console.log("jhkhl", data);
        console.log("hvjgkhkl", data.message);
        if(data.message) {
            row.remove();
        }
    } catch (err) {
    }
}
const setExecutor = async (e) => {
    
}
getTasks();