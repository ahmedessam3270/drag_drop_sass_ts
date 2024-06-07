"use strict";

var _Fields = require("./components/Fields.js");
var _ProjectsList = require("./components/ProjectsList.js");
var _Popup = require("./components/Popup.js");
new _Fields.Fields();
new _ProjectsList.ProjectsList("Initial");
new _ProjectsList.ProjectsList("Active");
new _ProjectsList.ProjectsList("Finished");
new _Popup.Popup();