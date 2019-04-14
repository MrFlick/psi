import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UlrFor from './UrlFor';

function TermList({ terms }) {
  return (
    <div>
      <h1>List of Terms</h1>
      <div className="ui cards">
        {terms.map(row => <TermCard key={row.termId} {...row} />)}
      </div>
    </div>
  );
}

TermList.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function TermCard({ termId, termName }) {
  return (
    <Link
      className="card term"
      to={UlrFor.termPage(termId)}
    >
      <div className="content">
        <div className="header">{termName}</div>
      </div>
    </Link>
  );
}

TermCard.propTypes = {
  termId: PropTypes.number.isRequired,
  termName: PropTypes.string.isRequired,
};


export default TermList;
