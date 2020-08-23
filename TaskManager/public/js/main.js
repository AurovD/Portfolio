let userName = "";
let userGroup = "";
window.addEventListener("load", () => {
    const header = document.querySelector(".header");
    const main = document.querySelector(".container");
    main.style.minHeight = this.innerHeight - header.offsetHeight - 100 - "px";

    let linkOne = document.querySelector(".userBlock__link_sign");
    let linkTwo = document.querySelector(".userBlock__link_log");
    
    const cook = document.cookie;
    if(cook) {
        let cookArr = cook.split("; ");
        for(let i = 0; i < cookArr.length; i++) {
            if(cookArr[i].includes("group")) {
                userGroup = cookArr[i].split("=")[1];
                userGroup.toString();
            } else if(cookArr[i].includes("user")) {
                userName = cookArr[i].split("=")[1];
            }
        }
        console.log("cookie", cook);
    }
    console.log(userGroup, userName);
    if(userName && linkTwo.innerText !== userName) {
        linkOne.href = "/logOut";
        linkOne.innerText = "LogOut";
        linkTwo.href = `/profile/${userGroup}/${userName}`;
        linkTwo.innerText = userName;
    }
    if(userName && linkTwo.innerText !== userName) {
        linkOne.href = "/signUp";
        linkOne.innerText = "SignUp";
        linkTwo.href = `/logIn`;
        linkTwo.innerText = "LogIn";
    }
});