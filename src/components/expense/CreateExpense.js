import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class CreateExpense extends Component {
  state = {
    exp_name: '',
    exp_amt: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Create Expense</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ exp_name: e.target.value })}
            placeholder="Exp_Name"
            type="text"
            value={this.state.exp_name}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ exp_amt: e.target.value })}
            placeholder="Exp_Amt"
            rows={8}
            value={this.state.exp_amt}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.exp_name &&
              this.state.exp_amt &&
              'dim pointer'}`}
            disabled={!this.state.exp_name || !this.state.exp_amt}
            type="submit"
            value="Create"
          />
          <a className="f6 pointer" onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { exp_name, exp_amt } = this.state
    await this.props.CreateExpenseMutation({
      variables: { exp_name, exp_amt },
    })
    this.props.history.replace('/expenses')
  }
}

const CREATE_EXPENSE_MUTATION = gql`
  mutation CreateExpenseMutation($exp_name: String!, $exp_amt: Float!) {
    setExpense(exp_name: $exp_name, exp_amt: $exp_amt) {
      id
      exp_name
      exp_amt
    }
  }
`

const CreateExpenseWithMutation = graphql(CREATE_EXPENSE_MUTATION, {
  name: 'CreateExpenseMutation', // name of the injected prop: this.props.createDraftMutation...
})(CreateExpense)

export default withRouter(CreateExpenseWithMutation)
