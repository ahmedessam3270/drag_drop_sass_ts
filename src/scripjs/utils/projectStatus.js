"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectStatus = void 0;
var projectStatus = exports.projectStatus = /*#__PURE__*/function (projectStatus) {
  projectStatus[projectStatus["Initial"] = 0] = "Initial";
  projectStatus[projectStatus["Active"] = 1] = "Active";
  projectStatus[projectStatus["Finished"] = 2] = "Finished";
  return projectStatus;
}({});