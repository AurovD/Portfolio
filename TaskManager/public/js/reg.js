const form = document.forms[0];
let body = {};

const sendForm = async (body) => {
    try{
        let res = fetch(form.action, {
            method: form.method,
            headers: {
                "Accept": "application/json; charset=utf-8",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((data) => {
            data.json().then(txt => {
                if(txt.message && txt.message === "ok") {
                    localStorage.clear();
                    location.replace("/profile/" + txt.group + "/" + body.login);
                    document.cookie = "group=" + txt.group;
                }
            });
        });
    } catch (err) {
        throw new Error(err);
    }
};

form.addEventListener("submit", e => {
    e.preventDefault();
    // TODO: добавить обработку совпадения паролей
    // TODO: регулярка на почту точка и лат и рус символы от 2 шт

    for (let i = 0; i < form.childElementCount; i++) {
        const child = form.children[i];
        if(child.name) {
            body[child.name] = child.value;
        }
    }
    sendForm(body);
    console.log(body);
});