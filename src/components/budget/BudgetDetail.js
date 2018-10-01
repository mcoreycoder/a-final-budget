import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
import ExpensesPage from '../expense/ExpensesPage'
import CreateExpense from '../expense/CreateExpense'


class BudgetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      note: '',
      mode:'view'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

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
        <div>
          {this.renderInputField()}
          <br/>
          {action}
        </div>
        <ExpensesPage/>
        <CreateExpense/>
      </Fragment>
    )
  }

  _renderAction = ({id}) => {
    if (this.state.mode === 'view') {
      return (
        <Fragment>
          <button className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
                  onClick={this.handleEdit}>
            Edit
          </button>
          <button
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.deleteBudget(id)}
          >
            Delete
          </button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <button
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.reviseBudget(id)}
          >
            Update
          </button>
          <button className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
                  onClick={this.handleCancel}>
            Cancel
          </button>
        </Fragment>

      )
    }
  }

  renderInputField() {

    const { budget } = this.props.budgetQuery

    if(this.state.mode === 'view') {
      return <Fragment><h1 className="f3 black-80 fw4 lh-solid">Label: {budget.label}</h1>
        <p className="black-80 fw3">Note: {budget.note}</p>
      </Fragment>
    } else {
      return (
        <Fragment>
          <h1 className="f3 black-80 fw4 lh-solid">Label:
            <input
              placeholder= {budget.label}
              onChange={this.handleChange}
              name = 'label'
            />
          </h1>
          <p className="black-80 fw3">Note:
            <input
              placeholder= {budget.note}
              onChange={this.handleChange}
              name = 'note'
            />
          </p>
        </Fragment>
      );
    }
  }

  deleteBudget = async id => {
    await this.props.deleteBudget({
      variables: { id },
    })
    this.props.history.replace('/budgets')
  }

  reviseBudget = async id => {
    await this.props.reviseBudget({
      variables: { id, label: this.state.label, note: this.state.note },
    })
    this.setState({
      mode: 'view'
    });
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }

  handleCancel() {
    this.setState({mode: 'view'});
  }

}

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

const REVISEBUDGET_MUTATION = gql`
  mutation ReviseBudget($id: ID!, $label: String!, $note: String!) {
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
  }),
  graphql(DELETE_MUTATION, {
    name: 'deleteBudget',
  }),
  withRouter,
)(BudgetDetail)
