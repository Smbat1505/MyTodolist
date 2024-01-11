import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeFilter: (values: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
    filter: string
}

export const Todolist: React.FC<PropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter
    }
) => {
    const [titleForTask, setTitleForTask] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    function adTask() {
        if (titleForTask.trim() !== '') {
            addTask(titleForTask.trim())
            setTitleForTask('')
        } else {
            setError('Title is required!!!')
        }
    }

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitleForTask(event.currentTarget.value)
    }

    function onKeyPressHandler(event: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (event.key === 'Enter') adTask()
    }

    function onAllClickHandler() {
        changeFilter('all')
    }

    function onActiveClickHandler() {
        changeFilter('active')
    }

    function onCompletedClickHandler() {
        changeFilter('completed')
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={titleForTask}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyPressHandler}
                />
                <button onClick={adTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks.map((task) => {
                    function onClickHandler() {
                        removeTask(task.id)
                    }

                    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
                        let newIsDoneValue = e.currentTarget.checked
                        console.log(e.currentTarget.checked)
                        changeTaskStatus(task.id, newIsDoneValue)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onChangeHandler}
                            />
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}
