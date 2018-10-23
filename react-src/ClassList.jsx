import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UlrFor from './UrlFor'

class ClassList extends Component {
  render() {
    return (
      <div>
        <h1>List of Classes</h1>
        <ul>
        {this.props.classes.map((row, i)=>{
          return <li key={i}><a href={UlrFor.classPage(row.class_id)}>{row.course_name}</a></li>
        })}
        </ul>
      </div>
    );
  }
}

ClassList.propTypes = {
  classes: PropTypes.array
}


export default ClassList;