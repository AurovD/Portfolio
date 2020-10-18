let acc = document.querySelectorAll(".article__name");
let accBox = document.querySelectorAll(".article");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        accBox[i].classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            accBox[i].style.height = "45px";
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            accBox[i].style.height = 45 + panel.scrollHeight + "px";
        }
    });
}