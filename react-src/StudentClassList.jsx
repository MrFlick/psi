import React from 'react';
import PropTypes from 'prop-types';
import UrlFor from './UrlFor';

function StudentClassList({ classes }) {
  return (
    <div>
      <table border="1">
        <tbody>
          {classes.map((row, i) => {
            return (
              <tr key={i}>
                <td><a href={UrlFor.classPage(row.classId)}>{row.courseName}</a></td>
                <td><a href={UrlFor.termPage(row.termId)}>{row.termName}</a></td>
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
