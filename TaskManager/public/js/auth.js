const form = document.forms[0];
let body = {};

const sendForm = async (body) => {
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
        
        if(data.message && data.message === "ok") {
            location.replace("/profile/" + body.group + "/" + body.login);
            document.cookie = "group=" + data.group;
        }
    } catch (err) {
        throw new Error(err);
    }
};

form.addEventListener("submit", e => {
    e.preventDefault();
    for (let i = 0; i < form.childElementCount; i++) {
        const child = form.children[i];
        if(child.name) {
            body[child.name] = child.value;
        }
    }
    sendForm(body);
    console.log("body", body);
});