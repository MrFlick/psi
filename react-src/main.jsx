import React from "react";
import ReactDOM from "react-dom";
import HomeView from "./HomeView.jsx";

var root = document.getElementById("root");
switch((root.dataset && root.dataset.view) || "home") {
    default:
        ReactDOM.render(<HomeView/>, root);
}

