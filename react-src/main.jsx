import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeView from './HomeView';
import TermView from './TermView';
import ClassView from './ClassView';
import StudentView from './StudentView';

function ClassRoute({ match }) {
  return (<ClassView classId={match.params.classId} />);
}
ClassRoute.propTypes = {
  match: PropTypes.shape({ params: PropTypes.any }).isRequired,
};

function TermRoute({ match }) {
  return (<TermView termId={match.params.termId} />);
}
TermRoute.propTypes = {
  match: PropTypes.shape({ params: PropTypes.any }).isRequired,
};

function StudentRoute({ match }) {
  return (<StudentView personId={match.params.personId} />);
}
StudentRoute.propTypes = {
  match: PropTypes.shape({ params: PropTypes.any }).isRequired,
};

function HomeRoute() {
  return (<HomeView />);
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/class/:classId" component={ClassRoute} />
        <Route path="/term/:termId" component={TermRoute} />
        <Route path="/student/:personId" component={StudentRoute} />
        <Route path="/" component={HomeRoute} />
      </Switch>
    </Router>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
