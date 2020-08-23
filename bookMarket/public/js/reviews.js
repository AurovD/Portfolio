let stars = document.querySelectorAll(".rating span");
for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("click", (e) => {
        if (stars[i].textContent === "★" && i < stars.length - 2 && stars[i+1].textContent !== "★") {
            stars[i].textContent = "☆";
        } else {
            for (let j = 0; j <= i; j++) {
                stars[j].textContent = "★";
            }
            if (i !== stars.length - 1) {
                for (let j = i + 1; j < stars.length; j++) {
                    stars[j].textContent = "☆";
                }
            }
        }
    });
}

const setReview = async (review) => {
    try {
        let res = await fetch(`/api/product/${id}/addReview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(review)
        });
        let data = await res.json();
        if(data.message === "ok"){
            let box = document.querySelector(".reviews");

            let container = document.createElement("div");
            container.style.marginBottom = "20px";
            let name = document.createElement("span");
            if(review.name) {
                name.innerText = review.name;
            } else {
                name.innerText = "Тайный покупатель";
            }
            let rat = document.createElement("span");
            for (let j = 1; j <= review.rating; j++) {
                rat.innerText += "★";
            }
            for (let j = review.rating + 1; j <= 5; j++) {
                rat.innerText += "☆";
            }
            let text = document.createElement("blockquote");
            text.innerText = review.text;
            container.appendChild(name);
            container.appendChild(rat);
            container.appendChild(text);
            box.appendChild(container);
        }
    } catch (err) {
        throw new Error(err);
    }
}

let reviewForm = document.forms.addReview;
reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let review = {};
    review.rating = 0;
    for (let i = 0; i < stars.length; i++) {
        if(stars[i].textContent === "★") {
            review.rating++;
        }
    }
    if (reviewForm.name) {
        if(reviewForm.name.value) {
            review.name = reviewForm.name.value;
        }
    } else {
        review.name = reviewForm.querySelector(".userName").textContent;
    }
    review.text = reviewForm.text.value;
    setReview(review);
});