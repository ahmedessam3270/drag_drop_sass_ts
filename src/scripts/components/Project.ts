import { autoBind } from "../decorators/autobind.js";
import { ProjectRules } from "../store/ProjectRules.js";
import { projectStateInstance } from "../store/ProjectState.js";
import { Base } from "./Base.js";

export class Project extends Base<HTMLDivElement> {
  private _project: ProjectRules;
  constructor(projectListId: string, project: ProjectRules) {
    super("project-item", projectListId, project.id, false);
    this._project = project;
    this._renderProject();
    this._targetDeleteButtonAndListenToIt();
  }

  /**
   * @desc render the project
   */
  private _renderProject(): void {
    const titleEl = this.element.querySelector(
      ".project_title"
    )! as HTMLHeadingElement;
    const descEl = this.element.querySelector(
      ".project_desc"
    )! as HTMLParagraphElement;
    titleEl.textContent = this._project.title;
    descEl.textContent = this._project.description;
  }

  /**
   * @desc target the delete button and adding the delete handler to it
   */
  private _targetDeleteButtonAndListenToIt(): void {
    const deleteButton = this.element.querySelector(
      ".delete"
    )! as HTMLButtonElement;
    deleteButton.addEventListener("click", this._handleDeleteProject);
  }

  /**
   * @desc delete handler and checking confirm delete? get function to delete this project
   */
  @autoBind
  private _handleDeleteProject(): void {
    if (confirm("Are you sure that you want to delete this project?")) {
      projectStateInstance.deleteProject(this._project.id);
    }
    return;
  }
}
