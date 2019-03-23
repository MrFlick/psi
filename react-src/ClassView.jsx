import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentList from './StudentList';
import PersonFinder from './PersonFinder';
import camelCase from './CamelCase';

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
        this.setState({ students: camelCase(data) });
      });
    fetch(`/api/classes/${classId}`)
      .then(response => response.json())
      .then((data) => {
        this.setState(camelCase(data));
      });
  }

  render() {
    const { course, students } = this.state;
    const { classId } = this.props;
    return (
      <div className="App">
        <h1>{`Class ${classId}`}</h1>
        {course && <CourseDetails {...course} />}
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

function CourseDetails({ courseId, courseName, courseDesc }) {
  return (
    <div>
      <p>{courseId}</p>
      <p>{`${courseName} - ${courseDesc}`}</p>
    </div>
  );
}

CourseDetails.propTypes = {
  courseId: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  courseDesc: PropTypes.string.isRequired,
};

export default ClassView;
