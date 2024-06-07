"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectsList = void 0;
var _ProjectRules = require("../store/ProjectRules.js");
var _ProjectState = require("../store/ProjectState.js");
var _projectStatus = require("../utils/projectStatus.js");
var _Base2 = require("./Base.js");
var _Project = require("./Project.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var ProjectsList = exports.ProjectsList = /*#__PURE__*/function (_Base) {
  function ProjectsList(private _status) {
    var _this;
    _classCallCheck(this, ProjectsList);
    _this = _callSuper(this, ProjectsList, ["project-list", "app", "".concat(_status, "-projects"), false]);
    _this.renderProjectsList();
    _ProjectState.projectStateInstance.pushListner(function (projects) {
      var filteredProjects = _this._filterProjectsBasedOnStatus(projects);
      _this._renderProjects(filteredProjects);
    });
    return _this;
  }

  /**
   * @desc render projects list based on status
   * @param positionStart: boolean
   */
  _inherits(ProjectsList, _Base);
  return _createClass(ProjectsList, [{
    key: "renderProjectsList",
    value: function renderProjectsList() {
      var title = this.element.querySelector(".title");
      var list = this.element.querySelector(".projects-list");
      list.id = "".concat(this._status, "-list");
      title.textContent = "".concat(this._status, " Projects");
    }

    /**
     * @desc render all projects in the project list
     * @param projects and validate with the projectRules
     */
  }, {
    key: "_renderProjects",
    value: function _renderProjects(projects) {
      var projectsListElement = document.getElementById("".concat(this._status, "-list"));
      projectsListElement.innerHTML = "";
      var _iterator = _createForOfIteratorHelper(projects),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var project = _step.value;
          new _Project.Project("".concat(this._status, "-list"), project);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    /**
     * @desc take project rom state and filter that specific project status add them in projects array to render
     * @param projects : projectRules[]
     * @returns Projects after => filteredProjects : projectRules[]
     */
  }, {
    key: "_filterProjectsBasedOnStatus",
    value: function _filterProjectsBasedOnStatus(projects) {
      var _this2 = this;
      var filteredProjects = projects.filter(function (project) {
        if (_this2._status === "Initial") {
          return project.status === _projectStatus.projectStatus.Initial;
        } else if (_this2._status === "Active") {
          return project.status === _projectStatus.projectStatus.Active;
        } else if (_this2._status === "Finished") {
          return project.status === _projectStatus.projectStatus.Finished;
        }
      });
      return filteredProjects;
    }
  }]);
}(_Base2.Base);