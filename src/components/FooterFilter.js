import React, { Component } from 'react'

class FooterFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedButton: 'All',
    }
  }

  handleShow = (filter) => {
    const { setTerm } = this.props
    this.setState({ selectedButton: filter })
    setTerm(filter)
  }

  render() {
    const { selectedButton } = this.state

    return (
      <ul className="filters">
        {['All', 'Active', 'Completed'].map((filter) => (
          <li key={filter}>
            <button
              type="button"
              onClick={() => this.handleShow(filter)}
              className={selectedButton === filter ? 'selected' : ''}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default FooterFilter
