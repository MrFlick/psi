import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassList from './ClassList';
import camelCase from './CamelCase';

class TermView extends Component {
  constructor(props) {
    super(props);
    this.state = { classes: [] };
  }

  componentDidMount() {
    const { termId } = this.props;
    fetch(`/api/terms/${termId}/classes`)
      .then(response => response.json())
      .then((data) => { this.setState({ classes: camelCase(data) }); });
  }

  render() {
    const { termId } = this.props;
    const { classes } = this.state;
    return (
      <div className="App">
        <h1>{`Term ${termId}`}</h1>
        <ClassList classes={classes} />
      </div>
    );
  }
}

TermView.propTypes = {
  termId: PropTypes.string.isRequired,
};

export default TermView;
