import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UrlFor from './UrlFor';

function StudentClassList({ classes }) {
  return (
    <div>
      <table border="1">
        <tbody>
          {classes.map((row, i) => {
            return (
              <tr key={i}>
                <td><Link to={UrlFor.classPage(row.classId)}>{row.courseName}</Link></td>
                <td><Link to={UrlFor.termPage(row.termId)}>{row.termName}</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

StudentClassList.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StudentClassList;
