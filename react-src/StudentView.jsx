import React, { Component} from "react";
import PropTypes from 'prop-types';
import StudentClassList from "./StudentClassList";

class StudentView extends Component{
  constructor(props) {
    super(props)
    this.state = {classes: []}
  }

  render(){
    return(
      <div className="App">
        <h1> Person {this.props.person_id}</h1>
        <StudentClassList classes={this.state.classes}></StudentClassList>
      </div>
    );
  }

  componentDidMount() {
    fetch(`/api/people/${this.props.person_id}/classes`)
    .then(response => response.json())
    .then(data => this.setState({classes: data}))
  }
}

StudentView.propTypes = {
  person_id: PropTypes.string
}

export default StudentView;