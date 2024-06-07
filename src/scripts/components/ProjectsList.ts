import { ProjectRules } from "../store/ProjectRules.js";
import { projectStateInstance } from "../store/ProjectState.js";
import { Base } from "./Base.js";
export class ProjectsList extends Base<HTMLDivElement> {
  constructor(private _status: "Initial" | "Active" | "Finished") {
    super("project-list", "app", `${_status}-projects`, false);
    this.renderProjectsList();
    projectStateInstance.pushListner((projects: ProjectRules[]) => {
      this._renderProjects(projects);
    });
  }

  /**
   * @desc render projects list based on status
   * @param positionStart: boolean
   */
  private renderProjectsList(): void {
    const title = this.element.querySelector(".title")! as HTMLHeadingElement;
    const list = this.element.querySelector("ul")! as HTMLUListElement;
    list.classList.add(`${this._status}-list`);
    title.textContent = `${this._status} Projects`;
  }

  private _renderProjects(projects: ProjectRules[]): void {
    const projectsListElement = document.querySelector(
      `.${this._status}-list`
    )! as HTMLDivElement;
    for (const project of projects) {
      const content = this._createProjectElement(project);
      projectsListElement.innerHTML += content;
    }
  }

  private _createProjectElement(project: ProjectRules): string {
    const content = `
    <div class="project" draggable="true">
    <h2 class="project_title" id="project_title">${project.title}</h2>
    <p class="project_desc" id="project_desc">${project.description}</p>
    </div>
    `;
    return content;
  }
}
