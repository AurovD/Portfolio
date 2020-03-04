let body = document.body;
let wrapper = body.firstElementChild;
let nav = wrapper.firstElementChild.nextElementSibling;
// nav = document.body.firstElementChild.firstElementChild.nextElementSibling;

let count = Math.floor(Math.random() * 10 + 1);

let ul = document.createElement("ul");
nav.appendChild(ul);

for (let i = 1; i <= count; i++) {
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = `<a href="https://www.google.ru/">${i}</a>`;
    let myCode = "";
}



function creatCard(char) {

    let joker = {
        name: "Joker",
        class: "joker",
        discription: "Supervillian",
        twitter: "twitter",
        twitterLink: "https://twitter.com/jokermovie",
        face: "facebook",
        faceLink: "https://facebook.com/jokermovie",
        insta: "inst",
        instaLink: "https://instagram.com/jokermovie/?igshid=1hb1b55f9dplj",
        bio: "The Joker is a supervillain and the archenemy of Batman. He was first introduced in Batman #1 (Spring 1940) and has remained consistently popular. The Joker is a master criminal with a clown-like appearance, and is considered one of the most infamous criminals within Gotham City. Initially portrayed as a violent sociopath who murders people for his own amusement, the Joker later in the 1940s began to be written as a goofy trickster-thief."
    };
    let ironMan = {
        name: "Iron Man",
        class: "ironMan",
        discription: "Superhero",
        twitter: "twitter",
        twitterLink: "https://twitter.com/Iron_Man",
        face: "facebook",
        faceLink: "https://facebook.com/ironman",
        insta: "inst",
        instaLink: "https://www.instagram.com/robertdowneyjr/",
        bio: "Персонаж, изданий Marvel Comics и их адаптаций, созданный писателем Стэном Ли, сценаристом Ларри Либером и художниками Доном Хэком и Джеком Кёрби; первое его появление состоялось в комиксе Tales of Suspense #39 в марте 1963 года"
    };
    let leo = {
        name: "Leonardo DiCaprio",
        class: "leo",
        discription: "Actor",
        twitter: "twitter",
        twitterLink: "https://twitter.com/leodicaprio",
        insta: "inst",
        instaLink: "https://instagram.com/leonardodicaprio/?igshid=|76kiwwwd7zvt",
        face: "facebook",
        faceLink: "https://facebook.com/LeonardDiCaprio",
        bio: " американский актёр и продюсер. Четыре раза был номинирован на премию «Оскар» за лучшую мужскую роль в фильмах «Авиатор» (2004), «Кровавый алмаз» (2006), «Волк с Уолл-стрит» (2013) и «Выживший» (2016), а также за лучшую мужскую роль второго плана в фильме «Что гложет Гилберта Грэйпа» (1994). Четыре раза был номинирован на премию BAFTA и одиннадцать раз на премию «Золотой глобус»."
    };
    let harry = {
        name: "Harry Potter",
        class: "harry",
        discription: "Literary character",
        twitter: "twitter",
        twitterLink: "https://twitter.com/HarryPotterFilm",
        insta: "inst",
        instaLink: "https://instagram.com/harrypotterfilm/?igshid=cw2pfxfrqvfx",
        face: "facebook",
        faceLink: "https://www.facebook.com/harrypottermovie/",
        bio: " литературный персонаж, главный герой серии романов английской писательницы Джоан Роулинг. На одиннадцатый день рождения Гарри узнаёт, что является волшебником и ему уготовано место в школе волшебства «Хогвартс», в которой он будет практиковать магию под руководством директора Альбуса Дамблдора и других школьных профессоров."
    };


    function getStar() {
        let star = "";
        let starCount = Math.floor(Math.random() * 5 + 1);
        console.log("CountSaars: ", starCount);
        for (let i = 1; i <= starCount; i++) {
            star += "★";
        }
        if (starCount !== 5) {
            let rest = 5 - starCount;
            for (let i = 1; i <= rest; i++) {
                star += "☆";
            }
        }
        return star;
    }

    let character;
    if (char === "Joker") {
        character = joker;
    } else if(char === "Iron Man") {
        character = ironMan;
    } else if(char === "Harry Potter") {
        character = leo;
    } else if(char === "Leo") {
        character = harry;
    }

    function cardText() {
        let card = `<div class="card">
    <div class="left">
            <div class="photo ${character.class}">
            
                <a href="${character.twitterLink}">
                    <div class= "${character.twitter}"></div>
                </a> 
                <a href="${character.instaLink}">
                    <div class= "${character.insta}"></div>
                </a> 
                <a href="${character.faceLink}">
                <div class= "${character.face}"></div>
            </a>               
            </div>
        </div>
        <div class="info">
            <h2>${character.name}</h2>
            <p>${character.discription}</p>
            <div class="stars">
                ${getStar()}
            </div>
            <h4>О себе:</h4>
            <p>${character.bio}</p>
        </div>
    </div>`

        return card;
    }
    let main = document.body.firstElementChild.lastElementChild.previousElementSibling;

    let div = document.createElement("div");
    main.appendChild(div);

    div.innerHTML = cardText();
}
creatCard("Joker");
creatCard("Iron Man");
creatCard("Harry Potter");
creatCard("Leo");

