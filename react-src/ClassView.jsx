import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StudentList from './StudentList';
import PersonFinder from './PersonFinder';
import UrlFor from './UrlFor';

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
      course, teachers, students, term, schedule,
    } = this.state;
    const { classId } = this.props;
    return (
      <div className="App">
        <h1>{`Class ${classId}`}</h1>
        {course && <ClassDetails {...{ schedule, course, teachers, term }} />}
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

function ClassDetails({ schedule, course, term, teachers }) {
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
          <td><ScheduleInfo {...schedule} /></td>
        </tr>
        { schedule.location
        && (
        <tr>
          <td>Location</td>
          <td>{schedule.location}</td>
        </tr>
        )}
        <tr>
          <td>Term</td>
          <td><Link to={UrlFor.termPage(term.termId)}>{term.termName}</Link></td>
        </tr>
      </tbody>
    </table>
  );
}

ClassDetails.propTypes = {
  schedule: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  term: PropTypes.object.isRequired,
  teachers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function TeacherName({ personId, fullName }) {
  return (
    <Link to={UrlFor.studentPage(personId)}>{fullName}</Link>
  );
}

TeacherName.propTypes = {
  personId: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
};

function ScheduleInfo({ dayOfWeek }) {
  return (
    <span>{dayOfWeek}</span>
  );
}

ScheduleInfo.propTypes = {
  dayOfWeek: PropTypes.string.isRequired,
};


export default ClassView;
