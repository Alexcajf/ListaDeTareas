// Cuando el formulario se envíe (al hacer clic en "Agregar"), captura el evento y evita que recargue la página
document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Captura el valor del campo de entrada (la nueva tarea)
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim(); // Elimina los espacios en blanco antes y después del texto

    // Si el campo de entrada está vacío, muestra un mensaje de alerta
    if (taskText === '') {
        alert('Por favor, ingresa una tarea.');
        return; // Detiene la ejecución si el campo está vacío
    }

    // Llama a la función para agregar una nueva tarea
    addTask(taskText);
    taskInput.value = ''; // Limpia el campo de entrada después de agregar la tarea
});

// Función para agregar una tarea a la lista
function addTask(taskText) {
    const taskList = document.getElementById('task-list'); // Referencia a la lista de tareas
    const li = document.createElement('li'); // Crea un nuevo elemento <li>
    li.textContent = taskText; // Añade el texto de la tarea al <li>

    // Después de un pequeño retraso, añade la clase 'show' para mostrar la animación
    setTimeout(() => {
        li.classList.add('show'); // Muestra la tarea con animación
    }, 100);

    // Añade la funcionalidad de marcar la tarea como completada
    li.addEventListener('click', function() {
        li.classList.toggle('completed'); // Alterna entre completada/no completada
        saveTasksToLocalStorage(); // Guarda la lista actualizada en el localStorage
    });

    // Crea un botón para eliminar la tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar'; // Texto del botón
    deleteButton.classList.add('delete'); // Añade la clase 'delete' para el estilo

    // Añade la funcionalidad de eliminar la tarea cuando se haga clic en el botón
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li); // Elimina la tarea de la lista
        saveTasksToLocalStorage(); // Actualiza el localStorage después de eliminar
    });

    li.appendChild(deleteButton); // Añade el botón de eliminar dentro del <li>
    taskList.appendChild(li); // Añade la tarea (li) dentro de la lista (ul)

    saveTasksToLocalStorage(); // Guarda las tareas en localStorage para que persistan
}

// Función para guardar las tareas en localStorage
function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('#task-list li')).map(li => li.firstChild.textContent); // Obtiene todas las tareas
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Guarda la lista de tareas en localStorage
}

// Función para cargar las tareas desde localStorage cuando se carga la página
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Recupera las tareas del localStorage o crea una lista vacía si no hay tareas
    tasks.forEach(addTask); // Añade cada tarea a la lista
}
