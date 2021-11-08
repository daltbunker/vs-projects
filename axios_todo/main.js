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


//#region FORM HANDLERS

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

function populateForm(e) {
    todoValues = e.path[1].childNodes
    const [, title, price, description, img] = todoValues;
    submitBtn.textContent = "SAVE";
    todoForm.title.value = title.textContent;
    todoForm.price.value = price.textContent.slice(1,); // slice removes '$'
    todoForm.description.value = description.textContent;
    todoForm.imgUrl.value = img.src;
     
}

function clearForm() {
    todoForm.title.value = "";
    todoForm.price.value = "";
    todoForm.description.value = "";
    todoForm.imgUrl.value = "";
}
//#endregion

//#region CREATE ELEMENTS (HTML)
function createNewTodo(todoObj) {
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo-item");
    newTodo.id = todoObj["_id"];
    if (todoObj["completed"]) {
        newTodo.classList.add("checked-todo");
        } else {
        newTodo.classList.remove("checked-todo");
    }
    const elementClasses = ["todo-completed", "todo-title", "todo-price", "todo-description", "todo-imgUrl", "edit-btn", "delete-btn"];
    createTodoElements(todoObj).forEach((element, i) => {
        element.classList.add(elementClasses[i]);
        newTodo.appendChild(element);
    })
    todoContainer.appendChild(newTodo);
  }
  
function createTodoElements(todoObj) {
    const todoCompleted = document.createElement("input");
    todoCompleted.type = "checkbox";
    todoCompleted.checked = todoObj["completed"];
    todoCompleted.addEventListener("click", e => itemChecked(e));
    const todoTitle = document.createElement("div");
    todoTitle.textContent = todoObj["title"];
    const todoPrice = document.createElement("div");
    todoPrice.textContent = `$${todoObj["price"]}`;
    const todoDescription = document.createElement("div");
    todoDescription.textContent = todoObj["description"];
    const todoImgUrl = document.createElement("img");
    todoImgUrl.src = validateImg(todoObj["imgUrl"]);
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", (e) => {  
        displayForm();
        currentId = e.path[1].id;
        populateForm(e);
        submitBtn.textContent = "SAVE";
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", e => deleteTodo(e));
    return [todoCompleted, todoTitle, todoPrice, todoDescription, todoImgUrl, editBtn, deleteBtn];
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

function validateImg(imgUrl) {
    return imgUrl ? imgUrl : "./default.jpeg";
}

function clearAllTodos() {
    const todos = document.querySelector(".todo-container");
    while (todos.firstChild) {
        todos.removeChild(todos.firstChild);
    }
}
//#endregion

//#region SERVER REQUESTS
function getAllTodos() {
    axios.get(todoUrl)
        .then(response => {
            clearAllTodos();
            if (response.data.length === 0) {
                createNewTodo(
                    {
                        "title": "Sample",
                        "price": 45,
                        "description": "This is a sample, edit and delete don't work",
                        "imgUrl": "",
                    }
                );
            } else {
                response.data.forEach(item => {
                createNewTodo(item);
                });
            }
            document.body.style.display = "block";
        })
        .catch(error => alert(`Get All(GET): ${error}`))
}

function addTodo(todoObj) {
    axios.post(todoUrl, todoObj)
        .then(() => getAllTodos())
        .catch(error => alert(`Add Todo(POST): ${error}`));
}

function editTodo(todoObj) {
    axios.put(todoUrl + currentId, todoObj)
            .then(() => getAllTodos())
            .catch(error => alert(`Add Todo(PUT): ${error}`));
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
        .catch(error => alert(`Checked-item(PUT): ${error}`));
}
//#endregion

getAllTodos();