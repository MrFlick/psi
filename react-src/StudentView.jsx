import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentClassList from './StudentClassList';

class StudentView extends Component {
  constructor(props) {
    super(props);
    this.state = { classes: [] };
  }

  componentDidMount() {
    const { personId } = this.props;
    fetch(`/api/people/${personId}/classes`)
      .then(response => response.json())
      .then((data) => { console.log(data); this.setState({ classes: data }); });
  }

  render() {
    const { personId } = this.props;
    const { classes } = this.state;
    return (
      <div className="App">
        <h1>{`Person ${personId}`}</h1>
        <StudentClassList classes={classes} />
      </div>
    );
  }
}

StudentView.propTypes = {
  personId: PropTypes.string.isRequired,
};

export default StudentView;
