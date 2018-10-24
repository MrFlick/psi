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
        <StudentList students={this.state.students}></StudentList>
        <PersonFinder people={this.state.students}></PersonFinder>
      </div>
    );
  }

  componentDidMount() {
    fetch(`/api/classes/${this.props.class_id}/students`)
    .then(response => response.json())
    .then(data => this.setState({students: data}))
  }
}

ClassView.propTypes = {
  class_id: PropTypes.string
}

export default ClassView;