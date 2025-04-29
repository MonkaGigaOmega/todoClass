import React, { Component } from 'react'

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      minTime: '',
      secTime: '',
    }
  }

  onDescriptionChange = ({ target: { value } }) => {
    if (value.length < 20) {
      this.setState({ description: value })
    }
  }

  onMinChange = ({ target: { value } }) => {
    if (value < 60) {
      this.setState({ minTime: value })
    }
  }

  onSecChange = ({ target: { value } }) => {
    if (value < 60) {
      this.setState({ secTime: value })
    }
  }

  addTask = () => {
    const { tasks, setTasks } = this.props
    const { description, minTime, secTime } = this.state

    const minutes = minTime === '' ? 0 : parseInt(minTime, 10)
    const seconds = secTime === '' ? 0 : parseInt(secTime, 10)

    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      description,
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
      time: (minutes * 60 + seconds) * 1000,
    }

    setTasks([...tasks, newTask])
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { description } = this.state

    if (description.trim()) {
      this.addTask()
      this.setState({
        description: '',
        minTime: '',
        secTime: '',
      })
    }
  }

  render() {
    const { description, minTime, secTime } = this.state

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          value={description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={minTime}
          onChange={this.onMinChange}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={secTime}
          onChange={this.onSecChange}
        />
        <button className="form-button" type="submit">
          Add Task
        </button>
      </form>
    )
  }
}

export default NewTaskForm
