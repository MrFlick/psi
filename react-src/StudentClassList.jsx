import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UrlFor from './UrlFor';

class StudentClassList extends Component {
  render() {
    return (
      <div>
        <table border="1"><tbody>
        {this.props.classes.map((row, i)=>{
          return <tr key={i}>
            <td><a href={UrlFor.classPage(row.class_id)}>{row.course_name}</a></td>
            <td><a href={UrlFor.termPage(row.term_id)}>{row.term_name}</a></td>
          </tr>
        })}
        </tbody></table>
      </div>
    );
  }
}

StudentClassList.propTypes = {
  classes: PropTypes.array
}


export default StudentClassList;