import { autoBind } from "../decorators/autobind.js";
import { projectStateInstance } from "../store/ProjectState.js";
import {
  assignValidateInputs,
  handleValidationErrors,
} from "../utils/validation/validation_helpers.js";
import { Base } from "./Base.js";

export class Fields extends Base<HTMLFormElement> {
  constructor() {
    super("fields", "app", "form", true);
    this._addProject();
  }

  private _addProject(): void {
    this.element.addEventListener("submit", this._handleAddProject);
  }

  /**
   * @desc handle add projects
   */
  @autoBind
  private _handleAddProject(e: Event): void {
    e.preventDefault();
    const [titleInput, descriptionInput] = this._targetInputs();
    const [titleValue, descValue] = this._getInputsValues(
      titleInput,
      descriptionInput
    );

    if (this._validateInputsValues(titleValue, descValue)) {
      projectStateInstance.createProject(titleValue, descValue);
      this._clearInputsValues(titleInput, descriptionInput);
    }
  }

  /**
   * @desc get project inputs
   * @return inputs [titleInput, descriptionInput] after getting : HTMLInputsElement[]
   */
  private _targetInputs(): HTMLInputElement[] {
    const titleInput = document.getElementById("title")! as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "desc"
    )! as HTMLInputElement;

    return [titleInput, descriptionInput];
  }

  /**
   * @desc get values of inputs (title, description)
   * @param1 titleInput : HTMLInputElement
   * @param2 descriptionInput : HTMLInputElement
   * @return inputs values [title, description] : string
   */
  private _getInputsValues(
    titleInput: HTMLInputElement,
    descriptionInput: HTMLInputElement
  ): string[] {
    const titleValue = titleInput.value! as string;
    const descriptionValue = descriptionInput.value! as string;

    return [titleValue, descriptionValue];
  }

  private _validateInputsValues(
    titleValue: string,
    descriptionValue: string
  ): boolean {
    const [titleInputRule, descriptionInputRule] = assignValidateInputs(
      titleValue,
      descriptionValue
    );

    const titleErrorMsg = handleValidationErrors(titleInputRule);
    const descriptionErrorMsg = handleValidationErrors(descriptionInputRule);

    // target popup elements
    const popupContainer = document.getElementById(
      "popup_container"
    )! as HTMLDivElement;
    const popupDesc = document.getElementById(
      "desc_popup"
    )! as HTMLParagraphElement;

    if (titleErrorMsg.length > 0) {
      popupContainer.classList.add("visible_popup");
      popupDesc.textContent = titleErrorMsg;
      return false;
    } else if (descriptionErrorMsg.length > 0) {
      popupContainer.classList.add("visible_popup");
      popupDesc.textContent = descriptionErrorMsg;
      return false;
    }
    return true;
  }

  /**
   * @desc clear inputs values
   * @param title input : HTMLInputElement
   * @param desc input : HTMLInputElement
   */
  private _clearInputsValues(
    titleInput: HTMLInputElement,
    descInput: HTMLInputElement
  ): void {
    titleInput.value = "";
    descInput.value = "";
  }
}
