/* Variables globales */
const inputNewTaks = document.getElementById('input-new-task');
const buttonNewTaks = document.getElementById('button-new-task');
let spanTotal = document.getElementById('span-total');
let spanDone = document.getElementById('span-done');
let renderIdName = document.getElementById('render-id-name')

const arrayTasks = [
        {
            id: '1',
            name: 'Ejemplo 1',
            state: false,
        },
        {
            id: '2',
            name: 'Ejemplo 2',
            state: false,
        },
        {
            id: '3',
            name: 'Ejemplo 3',
            state: false,
        },
];


/* Renderiza las tareas por default y las que agregadas por input */
const renderTasks = () =>{
    let html = ''
    arrayTasks.map(task => {
        html += `
        <div id="renderIdName">
            <h6>ID</h6>
            <p>${task.id}</p>
            
            <h6>Tarea</h6>
            <p>${task.name}</p>
            <input type="checkbox" onclick='taskDone(${task.id})' 
            ${task.state ? `checked` : ''}>
            
            <button type="button" class="btn btn-outline-dark btn-sm"
            onclick='removeTask(${task.id})'>X</button>
        
        </div>`
    } )
    renderIdName.innerHTML = html
    renderTotalTaskDone()
}

const idGenerator = () => {
    return parseInt(Math.random() * new Date().getUTCMilliseconds());
}

/* Cuenta total tareas */
const longArrayTasks = () => {
    let lengthArrayTasks = arrayTasks.length;
    spanTotal.innerHTML = lengthArrayTasks;
}

/* Esta función marcar una tarea como realizada, pero que por alguna razón no funciona */
const taskDone = (id) =>{
    arrayTasks.map((task) =>{
        if (task.id == id){
            task.state = !task.state
            return
        }
    })
    renderTasks()
}

/* Esta función renderiza la cantidad de tareas realizadas (el filter no regreesa nada) */
const renderTotalTaskDone = () =>{
    const checkTask = arrayTasks.filter((task) => {task.state == true})
    const totalTaskDone = checkTask.length
    spanDone.innerHTML = totalTaskDone
}

/* Borra tarea */
const removeTask = (id) => {
    let index = arrayTasks.findIndex( i => i.id == id )
    arrayTasks.splice(index, 1)
    renderTasks()
    longArrayTasks()
}

/* Este evento agrega tareas y las renderiza (con la función) */
buttonNewTaks.addEventListener('click', () =>{

    const anotherTask = inputNewTaks.value
    arrayTasks.push(({id: idGenerator(), name: anotherTask}))
    inputNewTaks.value = ''
    /* Este llamado rederiza tareas ingresadas */
    renderTasks()
    /* Este llamado muestra la cantidad de tareas tareas y actualiza el total */
    longArrayTasks()

})

/* Este llamado muestra la cantidad de tareas iniciales */
longArrayTasks()

/* Este llamado renderiza las tareas por default */
renderTasks()