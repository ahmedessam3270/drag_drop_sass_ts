import { ProjectRules } from "../store/ProjectRules.js";
import { Base } from "./Base.js";

export class Project extends Base<HTMLDivElement> {
  private _project: ProjectRules;
  constructor(projectListId: string, project: ProjectRules) {
    super("project-item", projectListId, project.id, false);
    this._project = project;
    this._renderProject();
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
}
