import React, { Component, Fragment } from 'react'
import Budget from './Budget'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class BudgetsPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.budgetsQuery.refetch()
    }
  }

  render() {
    if (this.props.budgetsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <div className="flex justify-between items-center">
          <h1>Budgets</h1>
        </div>
        {this.props.budgetsQuery.budgets &&
          this.props.budgetsQuery.budgets.map(budget => (
            <Budget
              key={budget.id}
              budget={budget}
              refresh={() => this.props.budgetsQuery.refetch()}
            />
          ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const BUDGETS_QUERY = gql`
  query BudgetsQuery {
    budgets {
      id
      label
      note
      author {
        name
      }
    }
  }
`

export default graphql(BUDGETS_QUERY, {
  name: 'budgetsQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(BudgetsPage)
