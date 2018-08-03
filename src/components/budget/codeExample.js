class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {label: '', note: '',inputLabel: '', inputNote: '', mode:'view'};
  //
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSave = this.handleSave.bind(this);
  //   this.handleEdit = this.handleEdit.bind(this);
  // }

  // handleChange(e) {
  //   this.setState({ inputLabel: e.target.value, inputNote: e.target.value });
  // }
  //
  // handleSave() {
  //   this.setState({label: this.state.inputLabel, note: this.state.inputNote, mode: 'view'});
  // }
  //
  // handleEdit() {
  //   this.setState({mode: 'edit'});
  // }

  // renderInputField() {
  //   if(this.state.mode === 'view') {
  //     return <div></div>;
  //   } else {
  //     return (
  //       <p>
  //         <input
  //           onChange={this.handleChange}
  //           value={this.state.inputLabel}
  //           value={this.state.inputNote}
  //           // value={this.state.inputText}
  //         />
  //       </p>
  //     );
  //   }
  // }

  // renderButton() {
  //   if(this.state.mode === 'view') {
  //     return (
  //       <button onClick={this.handleEdit}>
  //         Edit
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <button onClick={this.handleSave}>
  //         Save
  //       </button>
  //     );
  //   }
  // }

  render () {
    return (
      {/*<div>*/}
        {/*<p>Label: {this.state.label}*/}
           {/*Note: {this.state.note}*/}
        {/*</p>*/}
        {/*{this.renderInputField()}*/}
        {/*{this.renderButton()}*/}
      {/*</div>*/}
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
