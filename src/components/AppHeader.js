import React, { Component } from 'react'

import NewTaskForm from './NewTaskForm'

class AppHeader extends Component {
  render() {
    const { tasks, setTasks } = this.props
    return (
      <>
        <h1>todos</h1>
        <NewTaskForm tasks={tasks} setTasks={setTasks} />
      </>
    )
  }
}

export default AppHeader
