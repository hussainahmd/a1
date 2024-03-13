import React, { useState } from "react"
import styles from "./Todo.module.scss"

const Todo = () => {
    const [taskName, setTaskName] = useState("")
    const [taskList, setTaskList] = useState([])

    const onChangeTaskName = (event) => setTaskName(event.target.value)

    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            onAddTask()
        }
    }

    const onAddTask = () => {
        const task = {
            id: Date.now(),
            name: taskName,
            isCompleted: false
        }
        setTaskList((tasks) => [...tasks, task])
        setTaskName("")
    }

    const onComplete = (id) => {
        const tasks = taskList.map((task) => {
            if (task.id === id) {
                task.isCompleted = true
            }
            return task
        })
        setTaskList(tasks)
    }

    const onRemove = (id) => {
        const tasks = taskList.filter((task) => task.id !== id)
        setTaskList(tasks)
    }

    const disableAddButton = taskName.trim() === ""

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <input
                    placeholder={"Enter task name"}
                    className={styles.input}
                    value={taskName}
                    onChange={onChangeTaskName}
                    onKeyDown={onKeyDown}
                />
                <button
                    className={styles.button}
                    disabled={disableAddButton}
                    onClick={onAddTask}
                >
                    {"Add Task"}
                </button>
            </div>
            <ul className={styles.list}>
                {taskList.map((task) => (
                    <li key={task.id} className={styles.itemContainer}>
                        <div className={styles.name}> {task.name} </div>
                        <button
                            disabled={task.isCompleted}
                            className={styles.button}
                            onClick={() => onComplete(task.id)}
                        >
                            {"Complete"}
                        </button>
                        <button className={styles.remove} onClick={() => onRemove(task.id)}>
                            {"x"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo
