import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StudentList from './StudentList';
import PersonFinder from './PersonFinder';
import UlrFor from './UrlFor';

class ClassView extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  componentDidMount() {
    const { classId } = this.props;
    fetch(`/api/classes/${classId}/students`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ students: data });
      });
    fetch(`/api/classes/${classId}`)
      .then(response => response.json())
      .then((data) => {
        this.setState(data);
      });
  }

  render() {
    const {
      course, teachers, students, term, ...details
    } = this.state;
    const { classId } = this.props;
    return (
      <div className="App">
        <h1>{`Class ${classId}`}</h1>
        {course && <ClassDetails {...{details, course, teachers, term}} />}
        <div className="ui container">
          <h3>Enrolled Students</h3>
          <StudentList students={students} />
        </div>
        <div className="ui container">
          <PersonFinder people={students} />
        </div>
      </div>
    );
  }
}

ClassView.propTypes = {
  classId: PropTypes.string.isRequired,
};

function ClassDetails({ details, course, term, teachers }) {
  return (
    <table className="ui celled definition table">
      <tbody>
        <tr>
          <td>Course</td>
          <td>{`${course.courseName} -  ${course.courseDesc}`}</td>
        </tr>
        <tr>
          <td>Teachers</td>
          <td>{teachers.map(row => <TeacherName key={row.personId} {...row} />)}</td>
        </tr>
        <tr>
          <td>Schedule</td>
          <td>{details.dayOfWeek}</td>
        </tr>
        { details.location
        && (
        <tr>
          <td>Location</td>
          <td>{details.location}</td>
        </tr>
        )}
        <tr>
          <td>Term</td>
          <td><Link to={UlrFor.termPage(term.termId)}>{term.termName}</Link></td>
        </tr>
      </tbody>
    </table>
  );
}

ClassDetails.propTypes = {
  details: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  term: PropTypes.object.isRequired,
  teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function TeacherName({ personId, fullName }) {
  return (
    <Link to={UlrFor.studentPage(personId)}>{fullName}</Link>
  );
}

TeacherName.propTypes = {
  personId: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
};


export default ClassView;
