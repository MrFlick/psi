import React, { Component} from "react";
import PropTypes from 'prop-types';

class ClassView extends Component{
  constructor(props) {
    super(props)
    this.state = {students: []}
  }

  render(){
    return(
      <div className="App">
        <h1> Class {this.props.class_id}</h1>
        <ul>
        {this.state.students.map((student,i) => {
            return <li key={i}>{student.full_name}</li>
        })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    fetch("/api/roster/" + this.props.class_id)
    .then(response => response.json())
    .then(data => this.setState({students: data}))
  }
}

ClassView.propTypes = {
  class_id: PropTypes.string
}

export default ClassView;