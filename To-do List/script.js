const tasks = [
    "Wake up at 6 am.",
    "Go to work.",
    "Lunch with co-workers"
];



const input = document.querySelector("#taskInput");
const button = document.querySelector("#addButton");
const list = document.querySelector("#taskList");


tasks.forEach( task =>{
    let item = document.createElement("li");
    item.textContent = task;
    list.appendChild(item);

    item.addEventListener("click", () => {
    item.classList.toggle("completed")
})
})

button.addEventListener("click", () => {
    const task = input.value;
    if(input.value === ""){
            alert("Empty task");
        }
    else{
    let item = document.createElement("li");
    item.textContent = task;
    list.appendChild(item);
    input.value = "";   
    item.addEventListener("click", () => {
    item.classList.toggle("completed")
})
    }   
})

