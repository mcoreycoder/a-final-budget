import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Budget extends Component {
  render() {
    // let label = this.props.budget.label
    // if (this.props.isDraft) {
    //   title = `${title} (Draft)`
    // }

    return (
      <Link className="no-underline ma1" to={`/budget/${this.props.budget.id}`}>
        <article className="bb b--black-10">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pl3-ns">
              <h1 className="f3 fw1 baskerville mt0 lh-title">{this.props.budget.label}</h1>
              <p className="f6 f5-l lh-copy">{this.props.budget.note}</p>
            </div>
          </div>
        </article>
      </Link>
    )
  }
}
