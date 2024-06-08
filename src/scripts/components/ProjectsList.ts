import { autoBind } from "../decorators/autobind.js";
import { ProjectRules } from "../store/ProjectRules.js";
import { projectStateInstance } from "../store/ProjectState.js";
import { projectStatus } from "../utils/projectStatus.js";
import { Base } from "./Base.js";
import { Project } from "./Project.js";
export class ProjectsList extends Base<HTMLDivElement> {
  constructor(private _status: "Initial" | "Active" | "Finished") {
    super("project-list", "app", `${_status}-projects`, false);
    this.renderProjectsList();

    // when refreshing the page get the projects from localStorage and render them
    if (JSON.parse(localStorage.getItem("projects")!)) {
      const localStorageProjects = JSON.parse(
        localStorage.getItem("projects")!
      );
      this._showProjectInDOM(localStorageProjects);
    }

    projectStateInstance.pushListner((projects: ProjectRules[]) => {
      this._showProjectInDOM(projects);
    });
    this._runDragging();
  }

  /**
   * @desc render projects list based on status
   * @param positionStart: boolean
   */
  private renderProjectsList(): void {
    const title = this.element.querySelector(".title")! as HTMLHeadingElement;
    const list = this.element.querySelector(
      ".projects-list"
    )! as HTMLDivElement;
    list.id = `${this._status}-list`;
    title.textContent = `${this._status} Projects`;
  }

  /**
   * @desc show projects in the DOM after filtering the projects based on status
   * @param projects : ProjectRules[]
   */
  private _showProjectInDOM(projects: ProjectRules[]): void {
    const filteredProjects = this._filterProjectsBasedOnStatus(projects);
    this._renderProjects(filteredProjects);
  }

  /**
   * @desc render all projects in the project list
   * @param projects and validate with the projectRules
   */
  private _renderProjects(projects: ProjectRules[]): void {
    const projectsListElement = document.getElementById(
      `${this._status}-list`
    )! as HTMLDivElement;
    projectsListElement.innerHTML = "";
    for (const project of projects) {
      new Project(`${this._status}-list`, project);
    }
  }

  /**
   * @desc take project rom state and filter that specific project status add them in projects array to render
   * @param projects : projectRules[]
   * @returns Projects after => filteredProjects : projectRules[]
   */
  private _filterProjectsBasedOnStatus(projects: ProjectRules[]) {
    const filteredProjects = projects.filter((project) => {
      if (this._status === "Initial") {
        return project.status === projectStatus.Initial;
      } else if (this._status === "Active") {
        return project.status === projectStatus.Active;
      } else if (this._status === "Finished") {
        return project.status === projectStatus.Finished;
      }
    });
    return filteredProjects;
  }

  /**
   * @desc run dragging on the project list : dragover, drop
   */
  private _runDragging(): void {
    this.element.addEventListener("dragover", this._handleDragOver);
    this.element.addEventListener("drop", this._handleDrop);
  }

  /**
   * @desc prevent default behavior to allow dragging projects and moving it to another project list
   */
  @autoBind
  private _handleDragOver(e: DragEvent): void {
    e.preventDefault();
  }
  @autoBind
  private _handleDrop(e: DragEvent): void {
    const projectId = e.dataTransfer!.getData("text/plain");
    const newStatus =
      (this.element.id === "Initial-projects" && projectStatus.Initial) ||
      (this.element.id === "Active-projects" && projectStatus.Active) ||
      (this.element.id === "Finished-projects" && projectStatus.Finished);

    if (newStatus) {
      // to make sure that newStatus is not false
      projectStateInstance.changeProjectStatus(projectId, newStatus);
    }
  }
}
