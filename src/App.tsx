import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from "./Todolist"
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let task: TaskType[] = [
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'JS TS', isDone: true},
        {id: v1(), title: 'GraphQl', isDone: true},
        {id: v1(), title: 'Rest API', isDone: false},
    ]

    // -------- useState --------
    const [tasks, setTasks] = useState(task)
    const [filter, setFilter] = useState<FilterValuesType>('all')
    // -------- useState -------- end

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }


    function removeTask(taskID: string) {
        let filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    function changeFilter(values: FilterValuesType) {
        setFilter(values)
    }

    function addTask(title: string) {
        let task: TaskType = {id: v1(), title, isDone: false}

        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeTaskStatus(taskID: string, isDone: boolean) {
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                return task.id === taskID ? {...task, isDone} : task;
            })
        })
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App
