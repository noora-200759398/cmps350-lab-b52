// todo {
//     title: string,
//     done: boolean,
// }

let todos = localStorage.todos ? JSON.parse(localStorage.todos) : [];

document.addEventListener("DOMContentLoaded", () => {
    if (todos.length) {
        document.querySelector(".todolist-container").innerHTML = generateTodoHTML();
    }

    document.querySelector("#add-todo").addEventListener("click", (event) => {
        todos.push({
            title: document.querySelector("#todo-input").value,
            done: false,
        });
        document.querySelector("#todo-input").value = "";
        refreshTodos();
    });

    document.querySelector("#clear-all").addEventListener("click", (event) => {
        todos = [];
        refreshTodos();
    });
});

function generateTodoHTML() {
    return todos.map(todo => `
        <div class="todo">
            <div class="todo-title">${todo.title}</div>
            <input type="checkbox" id="${todo.title}" name="${todo.title}" ${todo.done ? "checked" : ""} onclick="checkTodo()" />
            <i class="fa fa-trash" class="delete-todo" onclick="deleteTodo()"></i>
        </div>`).join("");
}

function checkTodo() {
    const title = event.target.parentElement.children[0].innerText;
    todos.forEach(ele => {
        if (ele.title === title) {
            ele.done = !ele.done;
        }
    });
    refreshTodos();
}

function deleteTodo() {
    const title = event.target.parentElement.children[0].innerText;
    todos = todos.filter(ele => ele.title !== title);
    refreshTodos();
}

function refreshTodos() {
    localStorage.todos = JSON.stringify(todos);
    document.querySelector(".todolist-container").innerHTML = generateTodoHTML();
}