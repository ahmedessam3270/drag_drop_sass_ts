import { validation } from "./validation_types.js";
/**
 * @desc assign pattern validation in inputs
 * @param1 titleValue : string
 * @param2 descriptionValue : string
 * @returns validation[titleInputRule, descriptionInputRule]
 */

export const assignValidateInputs = (
  titleValue: string,
  descriptionValue: string
): validation[] => {
  const titleInputRule: validation = {
    type: "title",
    value: titleValue,
    required: true,
    minLength: 5,
    maxLength: 30,
  };
  const descriptionInputRule: validation = {
    type: "description",
    value: descriptionValue,
    required: true,
    minLength: 10,
    maxLength: 100,
  };

  return [titleInputRule, descriptionInputRule];
};

/**
 * @desc handle validation errors
 * @param input : input pattern validation
 * @returns error message
 */

export const handleValidationErrors = (inputRule: validation): string => {
  let errorMsg: string = "";

  // handle required rule
  if (inputRule.required && inputRule.value.trim().length === 0) {
    errorMsg = `${inputRule.type} is required!`;
  }

  // handle minLength
  if (
    inputRule.minLength &&
    inputRule.minLength > inputRule.value.trim().length &&
    inputRule.value.trim().length !== 0
  ) {
    errorMsg = `${inputRule.type} must be at least ${inputRule.minLength} characters long!`;
  }

  // handle maxLength
  if (
    inputRule.maxLength &&
    inputRule.value.trim().length > inputRule.maxLength
  ) {
    errorMsg = `${inputRule.type} must be less than ${inputRule.maxLength} characters long!`;
  }

  return errorMsg;
};
