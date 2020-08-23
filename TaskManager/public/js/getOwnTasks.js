const open = document.querySelector(".openTasks");
const complete = document.querySelector(".completeTasks");
const getTasks = async () => {
    let res = await fetch("/api/tasks/show", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let data = await res.json();
    open.innerText = "";
    complete.innerText = "";
    let jojo = document.cookie.split("=");
    console.log("jojo", jojo);
    console.log("jojo", document.cookie)
    myTasks = [];
    data.records.forEach(task  => {
        if(task.executor === userName) {
            myTasks.push(task);
        }
    })
    //TODO преобразовать дату и время в 2=чзначный формат (8:5 => 08:05)
    myTasks.forEach(task => {
        let row = document.createElement("div");
        row.className = "task-container";
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "task_" + task._id;
        checkbox.className = "task-container__chbox";
        let textBox = document.createElement("label");
        textBox.setAttribute("for", "task_" + task._id)
        textBox.className = "task-container__text";
        textBox.innerText = task.text;

        let now = new Date();
        let daedLine = new Date(task.date + "T" + task.time);

        let date = document.createElement("span");
        date.className = "task-container__date";
        date.innerText = `${daedLine.getDate()}.${daedLine.getMonth() + 1}.${daedLine.getFullYear()}`;
        let time = document.createElement("span");
        time.className = "task-container__time";
        time.innerText = `${daedLine.getHours()}:${daedLine.getMinutes()}`

        let title = document.createElement("span");
        title.className = "task-container__title";

        function checkTime(ms) {
            const secondTime = 1000;
            let minuteTime = secondTime * 60;
            let hourTime = minuteTime * 60;
            let dayTime = hourTime * 24;
            let days, hours, minutes, seconds;
            let str = "";
            if(ms >= dayTime) {
                days = Math.floor(ms / dayTime);
                str += days + "д.";
                ms -= days * dayTime;
            }
            if(ms >- hourTime) {
                hours = Math.floor(ms / hourTime);
                str += hours + "ч.";
                ms -= hours * hourTime;
            } else if (str !== "") {
                str += " 0 секунд"
            }
            if(ms >- minuteTime) {
                minutes = Math.floor(ms / minuteTime);
                str += minutes + "м.";
                ms -= minutes * minuteTime;
            } else if (str !== "") {
                str += " 0 секунд"
            }
            if(ms >- secondTime) {
                seconds = Math.floor(ms / secondTime);
                str += seconds + "с.";
            } else if (str !== "") {
                str += " 0 секунд"
            }
            return str;
        }

        let timeLeft = daedLine - now;
        if(timeLeft <= 0) {
            timeLeft = Math.abs(timeLeft);
            title.classList.add("noTime");
            setInterval(() => {
                title.innerText = checkTime(Math.abs(daedLine - new Date()));
            }, 1000)
        } else {
            setInterval(() => {
                title.innerText = checkTime(Math.abs(daedLine - new Date()));
            }, 1000)
        }

        row.appendChild(checkbox);
        row.appendChild(textBox);
        row.appendChild(date);
        row.appendChild(time);
        row.appendChild(title);
        if(task.status === "open") {
            open.appendChild(row);
            checkbox.checked = false;
        } else if (task.status === "closed") {
            complete.appendChild(row);
            checkbox.checked = true;
        }
    })
    let tasks = Array.from(document.querySelectorAll(".task-container__chbox"));
    console.log(tasks);
    tasks.forEach(t => {
        t.addEventListener("click", e => {
            let status = "";
            if(t.checked) {
                status = "closed";
            } else {
                status = "open"
            }
            changeStatus(t.id.split("task_")[1], status);
        });
    });
}

const changeStatus = async (el, status) => {
  try {
      let res = await  fetch("/api/tasks/change", {
          method: "PUT",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({id: el, status: status})
      });
      let data = await res.json();
      if(data.message) {
          getTasks();
      }
  }  catch (err) {
      throw new Error(err);
  }
};
getTasks();

