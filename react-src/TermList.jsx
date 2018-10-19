import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

TermList.propTypes = {
  terms: PropTypes.array
}


export default TermList;