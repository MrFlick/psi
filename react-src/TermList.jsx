import React, { Component } from 'react';

class TermList extends Component {
  render() {
    return (
      <div>
        <h1>List of Terms</h1>
        <ul>
        {this.props.terms.map((row, i)=>{
          return <li key={i}>{row.term_name}</li>
        })}
        </ul>
      </div>
    );
  }
}
export default TermList;