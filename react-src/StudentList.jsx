import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UlrFor from './UrlFor';

function StudentList({ students }) {
  return (
    <div>
      <div className="ui cards">
        {students.map(row => <StudentCard key={row.personId} {...row} />)}
      </div>
    </div>
  );
}

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function StudentCard({ personId, fullName }) {
  return (
    <div className="card student">
      <div className="content">
        <Link to={UlrFor.studentPage(personId)}>{fullName}</Link>
      </div>
    </div>
  );
}

StudentCard.propTypes = {
  personId: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
};

export default StudentList;
