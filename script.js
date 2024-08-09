
let addButton = document.querySelector("#add-Button");
let inputTodo = document.querySelector("#input");
let storeContainer = document.querySelector(".Store-todos");
let warningPara = document.querySelector("#warning");
let editButton = document.querySelector("#edit-button");
let editInput = document.querySelector("#modal-input");
let editTodotask = document.querySelector("#editTodo")

let arrayOfTodos = JSON.parse(localStorage.getItem('todos')) || [];
let store;
let  editTodos = (task) =>
{
    let foundKey = arrayOfTodos.find((editingtodo) => editingtodo.keyTodo === task );
    editInput.value = foundKey.keyTodo;  
    store = editInput.value;


// editButton.addEventListener('click',
//     function displayTodo()
//     {
//         foundKey.keyTodo = editInput.value;
//         // let displayEdit = arrayOfTodos.find((valueChange )=> valueChange.keyTodo === taskvalue);
//         localStorage.setItem('todos', JSON.stringify(arrayOfTodos));
//         renderTodos();

//     }
// );
}
 editButton.addEventListener('click',
    () => {
    
        let findtochange  = arrayOfTodos.find((valuechange) => valuechange.keyTodo === store);
        store = editInput.value;
        findtochange.keyTodo = store;
        localStorage.setItem('todos', JSON.stringify(arrayOfTodos));
        renderTodos();
    
    }
 );




const updateTodo =(task)=>
    {
      let isTodoDone =  arrayOfTodos.find((iscompleted) => iscompleted.keyTodo === task)
            isTodoDone.isDone = !isTodoDone.isDone;
        localStorage.setItem('todos', JSON.stringify(arrayOfTodos));
        // localStorage.clear();
        renderTodos();
    }

    const deletTodo = (task) =>
        {
             let updateTodo = arrayOfTodos.find((iscompleted) => iscompleted.keyTodo === task);
            if(!updateTodo.isDone){
                warningPara.innerHTML = 'Complete the task First!!!!!!!!!!!!!!!!!!!!!!!!';
            }
            else{
                warningPara.innerHTML = '';
            arrayOfTodos = arrayOfTodos.filter((elements) => elements.keyTodo !== task)
             localStorage.setItem('todos', JSON.stringify(arrayOfTodos));
             renderTodos();
            }
        }

function renderTodos() {
    storeContainer.innerHTML = ''; // Clear the container
    arrayOfTodos.forEach(todo => {

        let checkorNot = todo.isDone?'checked':'';
         
        let htmlCode = ` 
        <div style="display:flex;">
        <input class="me-4" id="check-box" ${checkorNot} type="checkbox" onchange="updateTodo('${todo.keyTodo}')">
        <h6 class="m-3 auto  ${todo.isDone? "text-decoration-line-through" : ''}" id="checkTodo" >${todo.keyTodo}</h6>
        <div style="position:relative; left:180px;">
        <img id="editTodo" onclick="editTodos('${todo.keyTodo}')" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" src="https://static.vecteezy.com/system/resources/previews/019/552/595/non_2x/sign-up-icon-signup-square-box-on-transparent-background-free-png.png">
        <img onclick="deletTodo('${todo.keyTodo}')" src="https://img.icons8.com/?size=100&id=102350&format=png&color=000000">
        </div>
        </div>`;
        storeContainer.innerHTML += htmlCode;
    });
}


function clickTORun() {
    if (inputTodo.value) {
        arrayOfTodos.push({
            keyTodo: inputTodo.value,
            isDone: false,
            // id: Math.floor(Math.random()*200)
        });
        localStorage.setItem('todos', JSON.stringify(arrayOfTodos));
        // localStorage.clear();
        inputTodo.value = "";
        renderTodos();
        inputTodo.value = "";
    } else {
        warningPara.innerHTML = 'Kindly please enter some tasks todo !!!!!!!!!!!!!!!!!!!!!!!!';
    }
}

addButton.addEventListener("click", function runFirst() {
    warningPara.innerHTML = "";
    clickTORun();
});

window.onload = renderTodos;
