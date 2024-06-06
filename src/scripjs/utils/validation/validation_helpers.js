"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleValidationErrors = exports.assignValidateInputs = void 0;
var _validation_types = require("./validation_types.js");
/**
 * @desc assign pattern validation in inputs
 * @param1 titleValue : string
 * @param2 descriptionValue : string
 * @returns validation[titleInputRule, descriptionInputRule]
 */

var assignValidateInputs = exports.assignValidateInputs = function assignValidateInputs(titleValue, descriptionValue) {
  var titleInputRule = {
    type: "title",
    value: titleValue,
    required: true,
    minLength: 5,
    maxLength: 30
  };
  var descriptionInputRule = {
    type: "description",
    value: descriptionValue,
    required: true,
    minLength: 10,
    maxLength: 100
  };
  return [titleInputRule, descriptionInputRule];
};

/**
 * @desc handle validation errors
 * @param input : input pattern validation
 * @returns error message
 */

var handleValidationErrors = exports.handleValidationErrors = function handleValidationErrors(inputRule) {
  var errorMsg = "";

  // handle required rule
  if (inputRule.required && inputRule.value.trim().length === 0) {
    errorMsg = "".concat(inputRule.type, " is required!");
  }

  // handle minLength
  if (inputRule.minLength && inputRule.minLength > inputRule.value.trim().length && inputRule.value.trim().length !== 0) {
    errorMsg = "".concat(inputRule.type, " must be at least ").concat(inputRule.minLength, " characters long!");
  }

  // handle maxLength
  if (inputRule.maxLength && inputRule.value.trim().length > inputRule.maxLength) {
    errorMsg = "".concat(inputRule.type, " must be less than ").concat(inputRule.maxLength, " characters long!");
  }
  return errorMsg;
};