
// async function delUser(i) {
//     try {
//         let res = await fetch("/api/user/delUser", {
//             method: "delete",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json"
//             }
//         })
//         let data = await res.json();
//         console.log("kjhk", data);
//         console.log("bjk", data.records[0].executor);
//         data.records[i].status = "close";
//     } catch (err) {
//         console.log(err);
//     }
// }



let del = document.querySelector(".delUser");
del.addEventListener("click", e => {
    e.preventDefault();
    console.log("click");    
    // delUser();
})