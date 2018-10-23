
import React from "react";
import ReactDOM from "react-dom";
import HomeView from "./HomeView";
import TermView from "./TermView";
import ClassView from "./ClassView";


var root = document.getElementById("root");
var view = (root.dataset && root.dataset.view) || "home";
var props = (root.dataset && root.dataset.props &&
    JSON.parse(root.dataset.props)) || {};

switch(view) {
    case "class":
        ReactDOM.render(React.cloneElement(<ClassView/>, props), root);
        break;
    case "term":
        ReactDOM.render(React.cloneElement(<TermView/>, props), root);
        break;
    default:
        ReactDOM.render(React.cloneElement(<HomeView/>, props), root);
}

