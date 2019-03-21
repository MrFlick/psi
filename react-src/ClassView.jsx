import React, { Component} from "react";
import PropTypes from 'prop-types';
import StudentList from "./StudentList";
import PersonFinder from "./PersonFinder"

class ClassView extends Component{
  constructor(props) {
    super(props)
    this.state = {students: []}
  }

  render(){
    return(
      <div className="App">
        <h1> Class {this.props.class_id}</h1>
        {this.state.course && <CourseDetails {...this.state.course}/>}
        <div className="ui container">
        <h3>Enrolled Students</h3>
        <StudentList students={this.state.students}></StudentList>
        </div>
        <div className="ui container">
        <PersonFinder people={this.state.students}></PersonFinder>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch(`/api/classes/${this.props.class_id}/students`)
      .then(response => response.json())
      .then(data => this.setState({students: data}))
    fetch(`/api/classes/${this.props.class_id}`)
      .then(response => response.json())
      .then(data => this.setState(data))
  }
}

ClassView.propTypes = {
  class_id: PropTypes.string
}

function CourseDetails(props) {
  return <div>
    <p>{props.course_id}</p>  
    <p>{props.course_name} - {props.course_desc}</p>
  </div>
}

CourseDetails.propTypes = {
  course_id: PropTypes.string,
  course_name: PropTypes.string,
  course_desc: PropTypes.string,
}

export default ClassView;