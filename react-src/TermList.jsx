import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UlrFor from './UrlFor'

class TermList extends Component {
  render() {
    return (
      <div>
        <h1>List of Terms</h1>
        <div className="ui cards">
        {this.props.terms.map(row=>{
          return <a key={row.term_id} className="card term"
          href={UlrFor.termPage(row.term_id)}>
          <div className="content">
            <div className="header">{row.term_name}</div>
            <div className="description">{row.start_date}</div>
            </div>
          </a>
        })}
        </div>
      </div>
    );
  }
}

TermList.propTypes = {
  terms: PropTypes.array
}


export default TermList;