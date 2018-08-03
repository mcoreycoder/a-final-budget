// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { graphql } from 'react-apollo'
// import  { gql } from 'apollo-boost'
//
//   class ReviseBudget extends Component {
//   // componentWillReceiveProps(id) {
//   //   this.props.location.key
//   // }
//
//     componentWillReceiveProps(nextProps) {
//       if (this.props.location.key !== nextProps.location.key) {
//         this.props.reviseBudget.refetch()
//       }
//     }
//
//
//   state = {
//     label: '',
//     note: '',
//   }
//
//   render() {
//     console.log(this)
//     return (
//       <div className="pa4 flex justify-center bg-white">
//         <form onSubmit={this.handlePost}>
//           <h1>Revise Budget</h1>
//           <input
//             autoFocus
//             className="w-100 pa2 mv2 br2 b--black-20 bw1"
//             onChange={e => this.setState({ label: e.target.value })}
//             placeholder={this.props.budget.label}  // updated this line to pull details by id
//             type="text"
//             value={this.state.label}
//           />
//           <textarea
//             className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
//             cols={50}
//             onChange={e => this.setState({ note: e.target.value })}
//             placeholder={this.props.budget.note}  // updated this line to pull details by id
//             rows={8}
//             value={this.state.note}
//           />
//           <input
//             className={`pa3 bg-black-10 bn ${this.state.label &&
//             this.state.note &&
//             'dim pointer'}`}
//             disabled={!this.state.label || !this.state.note}
//             type="submit"
//             value="Update"
//           />
//           <a className="f6 pointer" onClick={this.props.history.goBack}>
//             or cancel
//           </a>
//         </form>
//       </div>
//     )
//   }
//
//   handlePost = async e => {
//     e.preventDefault()
//     const { label, note } = this.state
//     await this.props.ReviseBudgetMutation({
//       variables: { label, note },
//     })
//     this.props.history.replace(`/budget/${this.props.budget.id}`)  //updated to direct back to budget being updated
//   }
// }
//
// const REVISE_BUDGET_MUTATION = gql`
//   mutation ReviseBudgetMutation($label: String!, $note: String!) {
//     reviseBudget(label: $label, note: $note) {
//       id
//       label
//       note
//     }
//   }
// `
//
//
// // may need to address code below
// const ReviseBudgetWithMutation = graphql(REVISE_BUDGET_MUTATION, {
//   name: 'ReviseBudgetWithMutation', // name of the injected prop: this.props.createDraftMutation...
// })(ReviseBudget)
//
// export default withRouter(ReviseBudgetWithMutation)
// // may need to address code above
