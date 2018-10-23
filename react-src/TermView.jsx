import React, { Component} from "react";
import PropTypes from 'prop-types';
import ClassList from "./ClassList";

class TermView extends Component{
  constructor(props) {
    super(props)
    this.state = {classes: []}
  }

  render(){
    return(
      <div className="App">
        <h1> Term {this.props.term_id}</h1>
        <ClassList classes={this.state.classes}></ClassList>
      </div>
    );
  }

  componentDidMount() {
    fetch(`/api/terms/${this.props.term_id}/classes`)
    .then(response => response.json())
    .then(data => this.setState({classes: data}))
  }
}

TermView.propTypes = {
  term_id: PropTypes.string
}

export default TermView;