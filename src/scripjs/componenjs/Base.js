"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Base = exports.Base = /*#__PURE__*/function () {
  function Base(private _templateId, private _hostId, private _elementId, private _positionElementStart) {
    _classCallCheck(this, Base);
    _defineProperty(this, "_template", void 0);
    _defineProperty(this, "_hostElement", void 0);
    _defineProperty(this, "element", void 0);
    var _this$_targetElements = this._targetElements(this._templateId, this._hostId),
      _this$_targetElements2 = _slicedToArray(_this$_targetElements, 2),
      template = _this$_targetElements2[0],
      _ = _this$_targetElements2[1];

    // import template content
    var templateContent = document.importNode(template.content, true);

    // assign Element to render
    this.element = templateContent.firstElementChild;
    if (this._elementId) {
      this.element.id = this._elementId;
      this._insertElement(this._positionElementStart);
    }
  }

  /**
   * @desc target elements: template, host
   * @param1 templateId: string
   * @param2 hostId : string
   * @returns template : HTMLTemplateElement, host : HTMLDivElement
   */
  return _createClass(Base, [{
    key: "_targetElements",
    value: function _targetElements(templateId, hostId) {
      // assign template Element
      this._template = document.getElementById(templateId);

      // assign host Element
      this._hostElement = document.getElementById(hostId);

      // return
      return [this._template, this._hostElement];
    }
  }, {
    key: "_insertElement",
    value: function _insertElement(position) {
      var insertionPosition = position ? "afterbegin" : "beforeend";
      this._hostElement.insertAdjacentElement(insertionPosition, this.element);
    }
  }]);
}();