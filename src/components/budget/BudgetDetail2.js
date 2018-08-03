import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'


class BudgetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      note: '',
      inputLabel: '',
      inputNote: '',
      mode:'view'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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
        <h1 className="f3 black-80 fw4 lh-solid">{budget.label}</h1>
        <p className="black-80 fw3">{budget.note}</p>
        {/*{action}*/}
        <div>
          <h1 className="f3 black-80 fw4 lh-solid">Label: {this.state.label}</h1>
          {this.renderInputField1()}
          <br/>
          <p className="black-80 fw3">Note: {this.state.note}</p>
          {this.renderInputField2()}

          {/*<h1 className="f3 black-80 fw4 lh-solid">Label: {budget.label}</h1>*/}
          {/*{this.renderInputField1()}*/}
          {/*<br/>*/}
          {/*<p className="black-80 fw3">Note: {budget.note}</p>*/}
          {/*{this.renderInputField2()}*/}

          {this.renderButton()}
          {action}

        </div>
      </Fragment>
    )
  }

  // below performs the delete
  _renderAction = ({id}) => {
    return (
      <Fragment>
        <button
          // className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
          onClick={() => this.deleteBudget(id)}
        >
          Delete
        </button>
      </Fragment>
    )
  }

  renderButton() {
    if(this.state.mode === 'view') {
      return (
        <button onClick={this.handleEdit}>
          Edit
        </button>
      );
    } else {
      return (
        <button onClick={this.handleSave}>
          Save
        </button>
      );
    }
  }

  renderInputField1() {
    if(this.state.mode === 'view') {
      return <div></div>;
    } else {
      return (
        <p>
          <input
            placeholder={this.props.label}
            onChange={this.handleChange}
            value1={this.state.inputLabel}
            // value={this.state.inputText}
          />
        </p>
      );
    }
  }
  renderInputField2() {
    if(this.state.mode === 'view') {
      return <div></div>;
    } else {
      return (
        <p>
          <input
            placeholder={this.props.note}
            onChange={this.handleChange}
            value2={this.state.inputNote}
            // value={this.state.inputText}
          />
        </p>
      );
    }
  }

  //below reroutes once delete is complete
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

  handleChange(e) {
    this.setState({ inputLabel: e.target.value1, inputNote: e.target.value2 });
  }

  handleSave() {
    this.setState({label: this.state.inputLabel, note: this.state.inputNote, mode: 'view'});
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }

}


//below is for the query and outlines the data to pull
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

//this is what had given the errors (second line label and note). may need to work on this more
const REVISEBUDGET_MUTATION = gql`
  mutation ReviseBudget($id: ID!, $label: String!, $note: String!) {
    reviseBudget(id: $id, label: $label, note: $note) {
      id
      label
      note
    }
  }
`

//below is the mutation that is called from the fragment
const DELETE_MUTATION = gql`
  mutation deleteBudget($id: ID!) {
    removeBudget(id: $id) {
      id
    }
  }
`

//below is exporting the budget props to the query and mutations
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
