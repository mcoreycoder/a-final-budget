import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'


class ExpenseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exp_name: '',
      exp_amt: '',
      mode:'view'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    if (this.props.expenseQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { expense } = this.props.expenseQuery

    let action = this._renderAction(expense)

    return (
      <Fragment>
        <div>
          {this.renderInputField()}
          <br/>
          {action}
        </div>
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
            onClick={() => this.deleteExpense(id)}
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
            onClick={() => this.reviseExpense(id)}
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

    const { expense } = this.props.expenseQuery

    if(this.state.mode === 'view') {
      return <Fragment><h1 className="f3 black-80 fw4 lh-solid">Exp_name: {expense.exp_name}</h1>
        <p className="black-80 fw3">Exp_Amt: {expense.exp_amt}</p>
      </Fragment>
    } else {
      return (
        <Fragment>
          <h1 className="f3 black-80 fw4 lh-solid">Exp_name:
            <input
              placeholder= {expense.exp_name}
              onChange={this.handleChange}
              name = 'exp_name'
            />
          </h1>
          <p className="black-80 fw3">Exp_Amt:
            <input
              placeholder= {expense.exp_amt}
              onChange={this.handleChange}
              name = 'exp_amt'
            />
          </p>
        </Fragment>
      );
    }
  }

  deleteExpense = async id => {
    await this.props.deleteExpense({
      variables: { id },
    })
    this.props.history.replace('/budgets')
  }

  reviseExpense = async id => {
    await this.props.reviseExpense({
      variables: { id, exp_name: this.state.exp_name, exp_amt: this.state.exp_amt },
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

const EXPENSE_QUERY = gql`
  query ExpenseQuery($id: ID!) {
    expense(id: $id) {
      id
      exp_name
      exp_amt
      author {
        name
      }
    }
  }
`

const REVISEEXPENSE_MUTATION = gql`
  mutation ReviseExpense($id: ID!, $exp_name: String!, $exp_amt: Float!) {
    reviseExpense(id: $id, exp_name: $exp_name, exp_amt: $exp_amt) {
      id
      exp_name
      exp_amt
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deleteExpense($id: ID!) {
    removeExpense(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(EXPENSE_QUERY, {
    name: 'expenseQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),

  graphql(REVISEEXPENSE_MUTATION, {
    name: 'reviseExpense',
  }),
  graphql(DELETE_MUTATION, {
    name: 'deleteExpense',
  }),
  withRouter,
)(ExpenseDetail)
