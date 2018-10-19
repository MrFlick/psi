import React, { Component} from "react";
import TermList from "./TermList"

class HomeView extends Component{
  constructor(props) {
    super(props)
    this.state = {terms: []}
  }
  render(){
    return(
      <div className="App">
        <h1> App Home </h1>
        <TermList terms={this.state.terms}></TermList>
      </div>
    );
  }

  componentDidMount() {
    fetch("/api/terms/")
    .then(response => response.json())
    .then(data => this.setState({terms: data}))
  }
}

export default HomeView;