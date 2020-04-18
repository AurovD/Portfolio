let form = document.forms[0];
let body = {};

async function addTask(body, form) {
    try {
        let res = await fetch(form.action, {
            method: form.method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        let data = await res.json();
        console.log("login", body);
        if(data.message && data.message === "ok") {
            // TODO очищать форму и что то делать
        } else {
            alert(data.message);
        }
    } catch (err) {
        throw new Error(err);
    }
}


let select = form.executor;
let ppl = JSON.parse(localStorage.getItem("people"));
console.log(userGroup);
if(ppl) {
    ppl.forEach(p => {
        let opt = new Option(p.login);
        select.appendChild(opt);
    })
}


form.addEventListener("submit", e => {
    e.preventDefault();
    for (let i = 0; i < form.elements.length; i++) {
        const child = form.elements[i];
        if(child.name) {
            body[child.name] = child.value;
        }
    }
    form.reset();
    let alert = document.querySelector(".textAlert ");
    let inf = document.createElement("p");
    inf.innerText = "Вы создали задачу";
    alert.appendChild(inf);
    setTimeout(() => {
        alert.remove();
    }, 5000);
    addTask(body, form);
    console.log(body)
});