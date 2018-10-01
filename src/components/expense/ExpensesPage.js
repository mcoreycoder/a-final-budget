import React, { Component, Fragment } from 'react'
import Expense from './Expense'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class ExpensesPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.expensesQuery.refetch()
    }
  }

  render() {
    if (this.props.expensesQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <div className="flex justify-between items-center">
          <h1>Expenses</h1>
        </div>
        {this.props.expensesQuery.expenses &&
          this.props.expensesQuery.expenses.map(expense => (
            <Expense
              key={expense.id}
              expense={expense}
              // refresh={() => this.props.expensesQuery.refetch()}
            />
          ))}
        {this.props.children}
      </Fragment>
    )
  }
}

const EXPENSES_QUERY = gql`
  query ExpensesQuery {
    expenses {
      id
      exp_name
      exp_amt
      author {
        name
      }
      budget {
        id
      }
    }
  }
`

export default graphql(EXPENSES_QUERY, {
  name: 'expensesQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(ExpensesPage)
