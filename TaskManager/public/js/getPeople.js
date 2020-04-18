const getUList = async el => {
    try {
        let res = await fetch("/api/getUserList", {
            method: "GET",
                headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        let data =await res.json();
        if(data.message && data.message === "ok") {
            let users = [];
            data.data.forEach(u => {
                if(u.group === "Сотрудник") {
                    users.push(u);
                }
            });
            localStorage.setItem("people", JSON.stringify(users));
            data.data.forEach(item => {
                let row = document.createElement("li");
                row.innerText = item.login;
                el.appendChild(row);
            })
        } else {
            alert(data.message);
        }
    } catch (err) {
        throw new Error(err);
    }
}
window.addEventListener("load", () => {
    let list = document.querySelector(".peopleList");
    let ppl = JSON.parse(localStorage.getItem("people"));
    if(userGroup === "Начальник" || userGroup === "%D0%9D%D0%B0%D1%87%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA") {
        let ul = document.createElement("ul");
        //TODO предусмотреть у каждого сотрудника руководителя
        if(!ppl) {
            getUList(list);
        } else {
            ppl.forEach(item => {
                let row = document.createElement("li");
                row.innerText = item.login;
                ul.appendChild(row);
                list.appendChild(ul);
            })
        }
    } else {
        list.previousElementSibling.remove();
        list.remove();
        if(ppl) {
            localStorage.removeItem("people");
        }
    }
});