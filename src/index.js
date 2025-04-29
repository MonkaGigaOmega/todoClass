/* eslint-disable indent */
import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'

import Footer from './components/Footer'
import AppHeader from './components/AppHeader'
import TaskList from './components/TaskList'
import './styles.css'

class App extends Component {
  static filterFunc(items, filter) {
    switch (filter) {
      case 'All':
        return items
      case 'Active':
        return items.filter((item) => !item.isCompleted)
      case 'Completed':
        return items.filter((item) => item.isCompleted)
      default:
        return items
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        {
          id: 1,
          description: 'Completed task',
          isCompleted: true,
          createdAt: new Date(),
          isEditing: false,
          time: 0,
        },
        {
          id: 2,
          description: 'Active task',
          isCompleted: false,
          createdAt: new Date(),
          isEditing: false,
          time: 600000,
        },
        {
          id: 3,
          description: 'Completed task',
          isCompleted: true,
          createdAt: new Date(),
          isEditing: false,
          time: 300000,
        },
      ],
      term: 'All',
    }
  }

  setTasks = (newTasks) => {
    this.setState({ tasks: newTasks })
  }

  setTerm = (newTerm) => {
    this.setState({ term: newTerm })
  }

  render() {
    const { tasks, term } = this.state
    const visibleTasks = App.filterFunc(tasks, term)

    return (
      <section className="main">
        <AppHeader tasks={visibleTasks} setTasks={this.setTasks} />
        <TaskList tasks={visibleTasks} setTasks={this.setTasks} origTasks={tasks} />
        <Footer tasks={visibleTasks} setTasks={this.setTasks} term={term} setTerm={this.setTerm} />
      </section>
    )
  }
}

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(<App />)
