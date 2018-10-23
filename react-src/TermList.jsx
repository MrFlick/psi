import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UlrFor from './UrlFor'

class TermList extends Component {
  render() {
    return (
      <div>
        <h1>List of Terms</h1>
        <ul>
        {this.props.terms.map((row, i)=>{
          return <li key={i}><a href={UlrFor.termPage(row.term_id)}>{row.term_name}</a></li>
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