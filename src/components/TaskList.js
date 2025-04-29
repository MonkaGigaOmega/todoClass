import React, { Component } from 'react'

import Task from './Task'

class TaskList extends Component {
  handleDestroy = (id) => {
    const { origTasks, setTasks } = this.props
    setTasks(origTasks.filter((task) => task.id !== id))
  }

  handleCompleted = (id) => {
    const { origTasks, setTasks } = this.props
    setTasks(origTasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)))
  }

  handleEditing = (id, newDescription) => {
    const { setTasks } = this.props
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isEditing: !task.isEditing,
            description: newDescription || task.description,
          }
        }
        return task
      })
    )
  }

  render() {
    const { tasks } = this.props

    return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            onDestroy={this.handleDestroy}
            onCompleted={this.handleCompleted}
            onEditing={this.handleEditing}
            task={task}
          />
        ))}
      </ul>
    )
  }
}

export default TaskList
