import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UlrFor from './UrlFor'

class StudentList extends Component {
  render() {
    return (
      <div>
        <h1>List of Students</h1>
        <div className="ui cards">
        {this.props.students.map(row=>{
          return <div key={row.person_id} className="card student">
          <div className="content">
            <a href={UlrFor.studentPage(row.person_id)}>{row.full_name}</a>
            </div>
          </div>
        })}
        </div>
      </div>
    );
  }
}

StudentList.propTypes = {
  students: PropTypes.array
}


export default StudentList;