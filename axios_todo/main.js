todoUrl = "https://api.vschool.io/dalton/todo/";
const addBtn = document.querySelector("#add-btn");
const todoContainer = document.querySelector(".todo-container");
const todoForm = document["todo-form"];

addBtn.addEventListener("click", addBtnClicked);
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
})

function onFormSubmit() {
    newTodoObj = {
        "title": todoForm.title.value,
        "price": todoForm.price.value,
        "description": todoForm.description.value,
        "imgUrl": todoForm.imgUrl.value
    }
    addBtn.style.display = "block";
    todoContainer.style.display = "block";
    todoForm.style.display = "none";
    console.log(newTodoObj);
    addTodo(newTodoObj);
}

function addBtnClicked() {
    addBtn.style.display = "none";
    todoContainer.style.display = "none"
    todoForm.style.display = "block";
}

function createNewTodo(todoObj) {
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo-item");
    newTodo.id = todoObj["_id"];
    const todoItems = [
        ["input", "todo-completed", "completed"], ["div", "todo-title", "title"], ["div", "todo-price", "price"], ["div", "todo-description", "description"],
        ["img", "todo-imgUrl", "imgUrl"], ["button", "edit-btn", "edit"] ,["button", "delete-btn", "x"]
    ]

    todoItems.forEach(items => {
        const newItem = document.createElement(items[0]);
        newItem.classList.add(items[1]);
        switch(items[0]) {
            case("div"):
                newItem.textContent = todoObj[items[2]];
                if (items[2] === "price") {
                    newItem.textContent += " $"
                }
                break;
            case("button"):
                newItem.textContent = items[2];
                if (items[2] === "edit") {
                    newItem.addEventListener("click", e => editTodo(e))
                } else {
                    newItem.addEventListener("click", e => deleteTodo(e))
                }
                break;
            case("input"):
                newItem.type = "checkbox";
                newItem.checked = todoObj[items[2]];
                newItem.addEventListener("click", e => itemChecked(e))
                break;
            case("img"):
                newItem.src = todoObj[items[2]];
                break;
            default:
                break;
        }
        newTodo.appendChild(newItem);
    })
    todoContainer.appendChild(newTodo);
}

function getAllTodos() {
    clearAllTodos();
    axios.get(todoUrl)
        .then(response => {
            response.data.forEach(item => {
                createNewTodo(item);
                document.body.style.display = "block";
            });
        })
        .catch(error => alert(error))
}

function clearAllTodos() {
    const todos = document.querySelector(".todo-container");
    while (todos.firstChild) {
        todos.removeChild(todos.firstChild);
    }
}

function addTodo(todoObj) {
    axios.post(todoUrl, todoObj)
        .then(() => getAllTodos())
        .catch(error => alert(error))
}

function editTodo(event, todoObj) {
    const todoId = event.path[1].id;
    axios.put(todoUrl + todoId, todoObj)
        .then(() => getAllTodos())
        .catch(error => alert(error))
}

function deleteTodo(event) {
    const todoId = event.path[1].id;
    axios.delete(todoUrl + todoId)
        .then(() => getAllTodos())
        .catch(error => alert(error))
}


function itemChecked(event) {
    event.path[1].style.backgroundColor = "red";
    if (event.target.checked) {
        updatedObj = {
            "completed": true
        }
    } else {
         updatedObj = {
            "completed": false
        }
    }
    editTodo(event, updatedObj)
}

function formValidation() {

}


getAllTodos();

// sampleTodo = {
//     title: "Groceries",
//     price: 30,
//     description: "Apples, Bananas, Bread",
//     imgUrl: "",
//     completed: null,
// }
// createNewTodo(sampleTodo);
// createNewTodo(sampleTodo);
