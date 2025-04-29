import React, { Component } from 'react'

import FooterFilter from './FooterFilter'

class Footer extends Component {
  handleClearCompleted = () => {
    const { tasks, setTasks } = this.props
    setTasks(tasks.filter((task) => !task.isCompleted))
  }

  render() {
    const { tasks, term, setTerm } = this.props
    const completedCount = tasks.filter((task) => !task.isCompleted).length

    return (
      <footer className="footer">
        <span className="todo-count">{`${completedCount} items left`}</span>
        <FooterFilter term={term} setTerm={setTerm} />
        <button type="button" className="clear-completed" onClick={this.handleClearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer
