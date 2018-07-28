import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class CreateBudget extends Component {
  state = {
    label: '',
    note: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this.handlePost}>
          <h1>Create Budget</h1>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            onChange={e => this.setState({ label: e.target.value })}
            placeholder="Label"
            type="text"
            value={this.state.label}
          />
          <textarea
            className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
            cols={50}
            onChange={e => this.setState({ note: e.target.value })}
            placeholder="Note"
            rows={8}
            value={this.state.note}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.note &&
              this.state.label &&
              'dim pointer'}`}
            disabled={!this.state.note || !this.state.label}
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
    const { label, note } = this.state
    await this.props.CreateBudgetMutation({
      variables: { label, note },
    })
    this.props.history.replace('/budgets')
  }
}

const CREATE_BUDGET_MUTATION = gql`
  mutation CreateBudgetMutation($label: String!, $note: String!) {
    setBudget(label: $label, note: $note) {
      id
      label
      note
    }
  }
`

const CreateBudgetWithMutation = graphql(CREATE_BUDGET_MUTATION, {
  name: 'CreateBudgetMutation', // name of the injected prop: this.props.createDraftMutation...
})(CreateBudget)

export default withRouter(CreateBudgetWithMutation)
