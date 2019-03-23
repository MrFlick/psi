import React from 'react';
import PropTypes from 'prop-types';
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

function TermCard({ termId, termName, startDate }) {
  return (
    <a
      className="card term"
      href={UlrFor.termPage(termId)}
    >
      <div className="content">
        <div className="header">{termName}</div>
        <div className="description">{startDate}</div>
      </div>
    </a>
  );
}

TermCard.propTypes = {
  termId: PropTypes.string.isRequired,
  termName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
};


export default TermList;
