import projectFactory from "./project.js";
import taskFactory from "./task.js";
import { getDueDateLengthDays } from "./task.js";

const defaultProjectsContainer = document.querySelector('[data-default-projects]')
const projectContainer = document.getElementById('project-list');
const newProjectForm = document.querySelector('[data-new-project-form]')
const newProjectInput = document.querySelector('[data-new-project-input')
const taskDisplayContainer = document.querySelector('[data-task-display-container]');
const taskProjectTitle = document.querySelector('[data-task-display-title]');
const projectTasksContainer = document.querySelector('[data-project-tasks');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const newDateInput = document.querySelector('[data-new-date-input]')
const deleteProject = document.querySelector('[data-delete-project]');
const deleteCompleteTasks = document.querySelector('[data-delete-complete-tasks]');
const sortButton = document.querySelector('[data-sort-button]');


const LOCAL_STORAGE_PROJECT_KEY = 'projects.list';
const LOCAL_STORAGE_PROJECT_ID_KEY = 'project.selectedProjectId'

let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];

let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_PROJECT_ID_KEY) || null;

// const todayTasks = projects.forEach((project) => {
//     project.tasks.filter(task => {
//         if (isToday(parseISO(task.dueDate))) {
//             return task;
//         }
//     })
// })

// projects[0].tasks.push(todayTasks)


// Event listners


projectContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectId
        saveAndRender();
    }
})

projectTasksContainer.addEventListener('change', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedProject = projects.find(project => project.id === selectedProjectId)
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        //true or false depending on if box is checked
        saveAndRender();
    }
})

newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = newProjectInput.value;
    if (projectName === null || projectName === '') return
    const project = projectFactory(projectName);
    newProjectInput.value = null;
    projects.push(project);
    saveAndRender();
})

newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = newTaskInput.value;
    const taskDueDate = newDateInput.value;
    if (taskName === null || taskName === '') return
    if (taskDueDate === null) return
    const task = taskFactory(taskName, taskDueDate);
    newTaskInput.value = null;
    newDateInput.value = null;
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    selectedProject.tasks.push(task);
    saveAndRender();
})


deleteProject.addEventListener('click', e => {
    projects = projects.filter((project) => project.id !== selectedProjectId);
    selectedProjectId = null;
    saveAndRender();
})

deleteCompleteTasks.addEventListener('click', e => {
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    selectedProject.tasks = selectedProject.tasks.filter(task => task.complete !== true);
    saveAndRender();
})

sortButton.addEventListener('click', (e) => {
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    selectedProject.tasks = selectedProject.tasks.sort(function (a, b) {
        if (a.dueDate < b.dueDate) {
            return -1;
        }
        if (a.dueDate > b.dueDate) {
            return 1;
        }
        if (a.dueDate === b.dueDate) {
            return 0
        }
    })
    saveAndRender();
})

//storage

function saveProjects() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
}

// render functions

function render() {
    clearElement(projectContainer)
    renderProjects();

    const selectedProject = (projects.find(project => project.id === selectedProjectId))

    if (selectedProjectId == null) {
        taskDisplayContainer.style.display = 'none'
    } else {
        taskDisplayContainer.style.display = '';
        taskProjectTitle.textContent = selectedProject.name
        clearElement(projectTasksContainer)
        renderTasks(selectedProject)
    }


}


function renderProjects() {
    projects.forEach(project => {
        const projectElement = document.createElement('li');

        projectElement.dataset.projectId = project.id
        projectElement.classList.add('project-name');
        projectElement.textContent = project.name;

        if (project.id === selectedProjectId) {
            projectElement.classList.add('active-project');
        }
        projectContainer.appendChild(projectElement);

    })
}

function renderTasks(selectedProject) {
    selectedProject.tasks.forEach((task) => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input[type=checkbox]');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name)
        const taskDueDate = taskElement.querySelector('[data-task-due-duration]');
        taskDueDate.innerText = getDueDateLengthDays(task);
        if (checkbox.checked = task.complete) {
            taskDueDate.style.display = 'none';
        }
        projectTasksContainer.appendChild(taskElement);
    })

}

function saveAndRender() {
    saveProjects()
    render()
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}



render();
