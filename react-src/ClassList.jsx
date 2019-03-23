import React from 'react';
import PropTypes from 'prop-types';
import UlrFor from './UrlFor';

function ClassList({ classes }) {
  return (
    <div>
      <h1>List of Classes</h1>
      <div className="ui container">
        <div className="ui cards">
          {classes.map((row) => {
            let cardColor = '';
            if (row.courseId.match(/^IMPROV/)) {
              cardColor = ' green';
            } else if (row.courseId.match(/^IMED/)) {
              cardColor = ' orange';
            } else if (row.courseId.match(/^LF/)) {
              cardColor = ' red';
            }
            return (
              <a
                key={row.classId}
                className={`card class${cardColor}`}
                href={UlrFor.classPage(row.classId)}
              >
                <div className="content">
                  <div className="header">{row.courseId}</div>
                  <div className="description">
                    {`${row.course.courseName}: ${row.course.courseDesc}`}
                  </div>
                </div>
                <div className="extra content">
                  {row.dayOfWeek}
                  <span className="right floated">
                    {row.teachers.map(x => x.fullName).join(', ')}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

ClassList.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ClassList;
