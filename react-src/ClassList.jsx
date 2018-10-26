import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UlrFor from './UrlFor'

class ClassList extends Component {
  render() {
    return (
      <div>
        <h1>List of Classes</h1>
        <div className="ui container">
        <div className="ui cards">
        {this.props.classes.map(row=>{
          var cardColor=""
          if (row.course_id.match(/^IMPROV/)) {
            cardColor=" green"
          } else if (row.course_id.match(/^IMED/)) {
            cardColor=" orange"
          } else if (row.course_id.match(/^LF/)) {
            cardColor=" red"
          }
          return <a key={row.class_id} 
            className={"card class" + cardColor}
            href={UlrFor.classPage(row.class_id)}>
          <div className="content">
            <div className="header">{row.course_id}</div>
            <div className="description">{row.course_name}</div>
          </div>
          <div className="extra content">
            <p>{row.day_of_week}</p>
          </div>
          </a>
        })}
        </div> 
        </div>
      </div>
    );
  }
}

ClassList.propTypes = {
  classes: PropTypes.array
}


export default ClassList;