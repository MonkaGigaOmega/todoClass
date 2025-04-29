import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, differenceInSeconds } from 'date-fns'

class Task extends Component {
  constructor(props) {
    super(props)

    const { task } = props

    this.state = {
      formattedDate: '',
      time: task.time,
      isRunning: false,
      localDescription: task.description,
    }

    this.timerRef = null
    this.dateInterval = null
    this.lastUpdate = Date.now()
    this.editInputRef = createRef()
  }

  componentDidMount() {
    this.updateFormattedDate()
    this.dateInterval = setInterval(this.updateFormattedDate, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    const { isRunning } = this.state
    const { task } = this.props

    if (isRunning && !task.isCompleted && !this.timerRef) {
      this.lastUpdate = Date.now()
      this.timerRef = setInterval(this.updateTimer, 100)
    }

    if (!isRunning && prevState.isRunning && this.timerRef) {
      this.clearTimer()
    }

    if (!prevProps.task.isCompleted && task.isCompleted) {
      this.setState({ isRunning: false })
      this.clearTimer()
    }

    if (!prevProps.task.isEditing && task.isEditing && this.editInputRef.current) {
      this.editInputRef.current.focus()
    }
  }

  componentWillUnmount() {
    this.clearTimer()
    clearInterval(this.dateInterval)
  }

  clearTimer = () => {
    if (this.timerRef) {
      clearInterval(this.timerRef)
      this.timerRef = null
    }
  }

  updateTimer = () => {
    const now = Date.now()
    const delta = now - this.lastUpdate
    this.lastUpdate = now

    this.setState((prevState) => {
      const newTime = prevState.time - delta
      if (newTime <= 0) {
        this.clearTimer()
        return { time: 0, isRunning: false }
      }
      return { time: newTime }
    })
  }

  updateFormattedDate = () => {
    const { task } = this.props
    const now = new Date()
    const created = new Date(task.createdAt)
    const secondsDiff = differenceInSeconds(now, created)

    this.setState({
      formattedDate:
        secondsDiff < 60 ? `${secondsDiff} seconds ago` : formatDistanceToNow(created, { addSuffix: true }),
    })
  }

  pauseTimer = () => {
    this.setState({ isRunning: false })
  }

  playTimer = () => {
    const { time } = this.state
    if (time > 0) {
      this.lastUpdate = Date.now()
      this.setState({ isRunning: true })
    }
  }

  static getFormattedTime(ms) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  handleEditSubmit = (e) => {
    e.preventDefault()
    const { onEditing, task } = this.props
    const { localDescription } = this.state
    onEditing(task.id, localDescription)
  }

  handleDescriptionChange = (e) => {
    this.setState({ localDescription: e.target.value })
  }

  render() {
    const { onCompleted, onDestroy, onEditing, task } = this.props
    const { description, isCompleted, isEditing } = task
    const { formattedDate, time, localDescription } = this.state

    return (
      <li className={`${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
        <div className="view">
          <input
            id={`task-${task.id}`}
            className="toggle"
            type="checkbox"
            checked={isCompleted}
            readOnly
            onChange={() => onCompleted(task.id)}
          />
          <label className="task-label" htmlFor={`task-${task.id}`}>
            <span className="description">{description}</span>
            <div>
              <button type="button" aria-label="Play timer" className="icon icon-play" onClick={this.playTimer} />
              <button type="button" aria-label="Pause timer" className="icon icon-pause" onClick={this.pauseTimer} />
              <span className={`${isCompleted ? 'completed timer' : 'timer'}`}>{Task.getFormattedTime(time)}</span>
            </div>
            <span className="created">{formattedDate}</span>
          </label>
          <button aria-label="edit task" type="button" className="icon icon-edit" onClick={() => onEditing(task.id)} />
          <button
            aria-label="delete task"
            type="button"
            className="icon icon-destroy"
            onClick={() => onDestroy(task.id)}
          />
        </div>
        {isEditing && (
          <form onSubmit={this.handleEditSubmit}>
            <input
              ref={this.editInputRef}
              className="edit"
              type="text"
              value={localDescription}
              onChange={this.handleDescriptionChange}
            />
          </form>
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  onCompleted: () => {},
  onDestroy: () => {},
}

Task.propTypes = {
  onCompleted: PropTypes.func,
  onDestroy: PropTypes.func,
  onEditing: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    isEditing: PropTypes.bool,
  }).isRequired,
}

export default Task
