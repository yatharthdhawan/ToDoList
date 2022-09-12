// tasks will be an array in which task will be stored
let tasks = [];
// using DOM 
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// creating list and then appending it to the <ul id="list"> 
function addTaskToHTML_List(task) {
    const li = document.createElement('li');
    li.innerHTML = `
	
	      <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''}  class="custom-checkbox" >
          <label for="${task.id}">${task.text}</label>
          <i class="fa-solid fa-trash-can" class="delete"  id="${task.id}" ></i>
          `
        ;

    tasksList.append(li);

}

// ${task.done ? 'checked':' '}
function renderList() {
    tasksList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        addTaskToHTML_List(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

// with the help of task.id checking in and on of the checkbox using task.done i.e boolean 
function toggleTask(taskId) {

    for (var i = 0; i < tasks.length; i++) {

        if (tasks[i].id == taskId) {
            tasks[i].done = !tasks[i].done;
            // showNotification("task completed");
            renderList();
            return;
        }
    }
    showNotification("task not marked");
}
// delete function storing the value after filtering the array with the help of the taskId or task.id of object 
//  filter return a new array which does not have the list array without the selective taskid
function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });
    tasks = newTasks;
    showNotification("task deleted sucessfully");
    renderList();


}

// function to add the object task created to the array so that it can be rendered later to list out the task
function addTask(task) {
    if (task) {
        // showNotification("task added sucessfully");
        tasks.push(task);

        renderList();
        return;
    }
    showNotification("please enter some task to add");
}

// alert function to create an alert to an event == empty input box, 
function showNotification(text) {
    alert(text);
}

// logging in the event of keypress after adding eventlistener
function addthetext(e) {
    const text = e.target.value;
    // if the enter key is pressed then the object is created recording text , generating id and boolean
    if (e.key == 'Enter') {
        if (!text) {
            showNotification(" please enter text to add task");
            return;
        }
        const task = {
            text,
            id: Date.now().toString(),
            done: false
        }
        e.target.value = "";
        addTask(task);

    }

}
//  adding event listener to the click on the page of the full document

function handleClick(e) {
    const target = e.target;

    if (target.className == 'fa-solid fa-trash-can') {
        const idis = target.id;
        deleteTask(idis);
        return;
    } else if (target.className == 'custom-checkbox') {
        const idis = target.id;
        toggleTask(idis);
        return;
    } else if (target.className == 'fa-solid fa-square-plus') {
        let text = addTaskInput.value;
        if (!text) {
            showNotification("the task is empty please add something to add");
            return;
        }
        // object creation which would have the text,id and boolean value of task completed or not
        const task = {
            text,
            // taking random numbers with the help of Date.now()
            id: Date.now().toString(),
            done: false
        }
        addTask(task);
        addTaskInput.value = "";

    }
}


document.addEventListener('click', handleClick);
addTaskInput.addEventListener('keyup', addthetext);