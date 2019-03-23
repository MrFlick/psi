import React from 'react';
import ReactDOM from 'react-dom';
import HomeView from './HomeView';
import TermView from './TermView';
import ClassView from './ClassView';
import StudentView from './StudentView';
import camelCase from './CamelCase';

const root = document.getElementById('root');
const view = (root.dataset && root.dataset.view) || 'home';
const props = camelCase((root.dataset && root.dataset.props
  && JSON.parse(root.dataset.props)) || {});

switch (view) {
  case 'class':
    ReactDOM.render(React.cloneElement(<ClassView />, props), root);
    break;
  case 'term':
    ReactDOM.render(React.cloneElement(<TermView />, props), root);
    break;
  case 'student':
    ReactDOM.render(React.cloneElement(<StudentView />, props), root);
    break;
  default:
    ReactDOM.render(React.cloneElement(<HomeView />, props), root);
}
