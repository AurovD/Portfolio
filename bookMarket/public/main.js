function checkBasket() {
        let basketCnt = document.querySelector(".count");
        let order = JSON.parse(localStorage.getItem("order"));
        if(!order) {
            (async () => {
                try {
                    let res = await fetch("/api/mainShowBasket", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    });
                    let bask = await res.json();
                    localStorage.setItem("order", JSON.stringify(bask.bask));
                } catch (err) {
                    throw new Error(err);
                }
            })();
        }
        let fullCnt = 0;
        if (order) {
            order.forEach(rec => {
                fullCnt += +rec.cnt;
            });
        }
        basketCnt.innerText = fullCnt;
    }
function checkUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let btn = document.querySelector(".header__addPro");
    if(!user || user.group !== "Администратор") {
        btn.remove();
    }
}
window.addEventListener("load", () => {
    checkBasket();
    checkUser();
    let user = JSON.parse(localStorage.getItem("user"));
    let login = document.querySelector(".user");
    let nav = document.querySelector(".navigation_list");
    if(user) {
        let profile = document.createElement("a");
        profile.innerText = user.name;
        profile.href = "/user";
        login.appendChild(profile);
        let logout = document.createElement("li");
        let a = document.createElement("a");
        a.href = "/logout";
        a.innerText = "Выйти";
        logout.appendChild(a);
        nav.appendChild(logout);
    } else {
        login.innerHTML = "<a href=\"/user\">Логин</a>";
    }
});
