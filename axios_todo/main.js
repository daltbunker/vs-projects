todoUrl = "https://api.vschool.io/dalton/todo/";
let currentId = "";
const addNewBtn = document.querySelector("#add-btn");
const submitBtn = document.querySelector("#submit-btn");
const closeBtn = document.querySelector("#close-btn");
const todoContainer = document.querySelector(".todo-container");
const todoForm = document["todo-form"];

addNewBtn.addEventListener("click", displayForm);
closeBtn.addEventListener("click",hideForm);
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const buttonText = e.submitter.textContent;
    if (buttonText === "ADD") {
        onFormSubmit();
    } else {
        onFormSave();
    }
})

function onFormSubmit() {
    const newObj = createTodoObj();
    hideForm();
    addTodo(newObj);
}

function onFormSave() {
    const updatedObj = createTodoObj();
    hideForm();
    editTodo(updatedObj);
}

function displayForm() {
    submitBtn.textContent = "ADD";
    addNewBtn.style.display = "none";
    todoContainer.style.display = "none"
    todoForm.style.display = "block";
}

function hideForm() {
    addNewBtn.style.display = "block";
    todoContainer.style.display = "block";
    todoForm.style.display = "none";
    clearForm();
}

function createTodoObj() {
    newTodoObj = {
        "title": todoForm.title.value,
        "price": todoForm.price.value,
        "description": todoForm.description.value,
        "imgUrl": todoForm.imgUrl.value
    }
    return newTodoObj;
}

function createNewTodo(todoObj) {
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo-item");
    newTodo.id = todoObj["_id"];
    if (todoObj["completed"]) {
        newTodo.classList.add("checked-todo");
        } else {
        newTodo.classList.remove("checked-todo");
    }
    const todoItems = [
        ["input", "todo-completed", "completed"], ["div", "todo-title", "title"], ["div", "todo-price", "price"], ["div", "todo-description", "description"],
        ["img", "todo-imgUrl", "imgUrl"], ["button", "edit-btn", "edit"] ,["button", "delete-btn", "x"]
    ]

    todoItems.forEach(items => {
        const newItem = document.createElement(items[0]);
        newItem.classList.add(items[1]);
        switch(items[0]) {
            case("div"):
                if (items[2] === "price") {
                    newItem.textContent = "$ " + todoObj[items[2]];
                } else {
                    newItem.textContent = todoObj[items[2]];
                }
                break;
            case("button"):
                newItem.textContent = items[2];
                if (items[2] === "edit") {
                    newItem.addEventListener("click", (e) => {
                        displayForm();
                        currentId = e.path[1].id;
                        populateForm();
                        submitBtn.textContent = "SAVE";
                    })
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
                newItem.src = validateImg(todoObj[items[2]]);
                break;
            default:
                break;
        }
        newTodo.appendChild(newItem);
    })
    todoContainer.appendChild(newTodo);
}

function getAllTodos() {
    axios.get(todoUrl)
        .then(response => {
            clearAllTodos();
            response.data.forEach(item => {
                createNewTodo(item);
                document.body.style.display = "block";
            });
        })
        .catch(error => alert(`Get All(GET): ${error}`))
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
        .catch(error => alert(`Add Todo(POST): ${error}`))
}

function editTodo(todoObj) {
    axios.put(todoUrl + currentId, todoObj)
            .then(() => getAllTodos())
            .catch(error => alert(`Add Todo(PUT): ${error}`))
}

function populateForm() {
    url = todoUrl + currentId
    axios.get(url)
        .then(response => {
            todoObj = response.data;
            submitBtn.textContent = "SAVE";
            todoForm.title.value = todoObj.title;
            todoForm.price.value = todoObj.price;
            todoForm.description.value =todoObj.description;
            todoForm.imgUrl.value = todoObj.imgUrl;;
        })
        .catch(error => alert(`Edit-todo(GET): ${error}`))   
}

function deleteTodo(event) {
    const todoId = event.path[1].id;
    axios.delete(todoUrl + todoId)
        .then(() => getAllTodos())
        .catch(error => alert(`Delete Todo(DELETE): ${error}`))
}

function itemChecked(event) {
    const todoId = event.path[1].id;
    event.path[1].classList.toggle("checked-todo");
    updatedObj = {
        "completed": false
        }
    if (event.target.checked) {
        updatedObj.completed = true;
    } 
    axios.put(todoUrl + todoId, updatedObj)
        .then(response => response)
        .catch(error => alert(`Checked-item(PUT): ${error}`))
}

function validateImg(imgUrl) {
    axios.get(imgUrl)
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
    return imgUrl ? imgUrl : "./default.jpeg"; // FIXME: Verify url with get request
}

function clearForm() {
    todoForm.title.value = "";
    todoForm.price.value = "";
    todoForm.description.value = "";
    todoForm.imgUrl.value = "";
}

getAllTodos();
