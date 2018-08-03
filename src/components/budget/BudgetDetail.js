import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
// import  ReviseBudget from '../budget/ReviseBudget'


class BudgetDetail extends Component {
  render() {
    if (this.props.budgetQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { budget } = this.props.budgetQuery

    let action = this._renderAction(budget)

    return (
      <Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{budget.label}</h1>
        <p className="black-80 fw3">{budget.note}</p>
        {action}
      </Fragment>
    )
  }

  _renderAction = ({id}) => {


    return (
      <Fragment>

        {/*<a*/}
        {/*className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"*/}
        {/*onClick={() => this.reviseBudgetDetails(id)}*/}
          {/*//was working on this and was going to set it up as an if statement below*/}

        {/*>*/}
        {/*Revise Budget Details*/}
        {/*</a>*/}


        {/*<a*/}
          {/*className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"*/}
          {/*onClick={() =>*/}
            {/*}*/}
        {/*>*/}
          {/*Revise Budget Details*/}
        {/*</a>*/}

        {' '}
        <a
          className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
          onClick={() => this.deleteBudget(id)}
        >
          Delete
        </a>
      </Fragment>
    )
  }

  deleteBudget = async id => {
    await this.props.deleteBudget({
      variables: { id },
    })
    this.props.history.replace('/budgets')
  }

  reviseBudget = async id => {
    await this.props.reviseBudget({
      variables: { id },
    })
    this.props.history.replace(`/budget/${this.props.budget.id}`) // updated this line to redirect to budget that was being updated
  }
}

//was working on this and was going to set it up as an if statement
// const reviseBudgetDetails = async id => {
//   return (
//     <Fragment>
//       <input type="text" value={this.props.label} onChange={event => this.setState({label : event.target.value})}/>
//       <input type="text" value={this.props.note} onChange={event => this.setState({note : event.target.value})}/>
//     </Fragment>
//   )
// }

const BUDGET_QUERY = gql`
  query BudgetQuery($id: ID!) {
    budget(id: $id) {
      id
      label
      note
      author {
        name
      }
    }
  }
`

//this is what give the errors (second line label and note)
const REVISEBUDGET_MUTATION = gql`
  mutation reviseBudget($id: ID!, $label: String!, $note: String!) {
    reviseBudget(id: $id, label: $label, note: $note) {
      id
      label
      note
    }
  }
`


const DELETE_MUTATION = gql`
  mutation deleteBudget($id: ID!) {
    removeBudget(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(BUDGET_QUERY, {
    name: 'budgetQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(REVISEBUDGET_MUTATION, {
    name: 'reviseBudget',
    //added below to
    options: props => ({
      variables: {
        id: props.match.params.id,
        // label: props.match.params.label,
        // note: props.match.params.note,
      },
    }),
    //added above
  }),
  graphql(DELETE_MUTATION, {
    name: 'deleteBudget',
  }),
  withRouter,
)(BudgetDetail)
