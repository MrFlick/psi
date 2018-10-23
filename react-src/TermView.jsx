import React, { Component} from "react";
import PropTypes from 'prop-types';
import UrlFor from "./UrlFor";

class TermView extends Component{
  constructor(props) {
    super(props)
    this.state = {classes: []}
  }

  render(){
    return(
      <div className="App">
        <h1> Term {this.props.term_id}</h1>
        <ul>
        {this.state.classes.map((tclass,i) => {
            return <li key={i}><a href={UrlFor.classPage(tclass.class_id)}>{tclass.course_name}</a></li>
        })}
        </ul>
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