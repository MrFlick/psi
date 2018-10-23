import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UlrFor from './UrlFor'

class StudentList extends Component {
  render() {
    return (
      <div>
        <h1>List of Students</h1>
        <ul>
        {this.props.students.map((row, i)=>{
          return <li key={i}><a href={UlrFor.studentPage(row.person_id)}>{row.full_name}</a></li>
        })}
        </ul>
      </div>
    );
  }
}

StudentList.propTypes = {
  students: PropTypes.array
}


export default StudentList;