import { projectStatus } from "../utils/projectStatus.js";
import { ListnerType } from "./ListnerType.js";
import { ProjectRules } from "./ProjectRules.js";

class ProjectState {
  private static _instance: ProjectState;
  private _listeners: ListnerType[] = [];
  private _projects: ProjectRules[] = [];
  private _localStoragePrevProjects: ProjectRules[] = localStorage.getItem(
    "projects"
  )
    ? JSON.parse(localStorage.getItem("projects")!)
    : [];
  constructor() {
    // when refresh the page send localStorage projects to projects state
    this._projects = this._localStoragePrevProjects;
  }
  /**
   * @desc create a single tone instance of the ProjectState class
   */
  public static getInstance() {
    if (!this._instance) {
      this._instance = new ProjectState();
      return new ProjectState();
    }
    return this._instance;
  }

  /**
   * @desc create a new project
   * @param1 projectTitle : string
   * @param2 projectDescription : string
   */
  public createProject(title: string, description: string) {
    const newProject = new ProjectRules(
      Math.random().toString(),
      title,
      description,
      projectStatus.Initial
    );
    this._projects.push(newProject);
    this._runListners();
    localStorage.setItem("projects", JSON.stringify(this._projects));
  }

  /**
   * @desc delete project from the state on both localstorage and render the changes to the DOM
   * @param projectId : string
   */
  public deleteProject(projectId: string): void {
    const projectsAfterDeletion = this._projects.filter(
      (proj: ProjectRules) => proj.id !== projectId
    );
    this._projects = projectsAfterDeletion;
    this._runListners();
    localStorage.setItem("projects", JSON.stringify(this._projects));
  }

  /**
   * @desc pushing listners in array
   * @param listner : Function
   */
  public pushListner(listner: ListnerType) {
    this._listeners.push(listner);
  }

  /**
   * @desc Run all listners function and pass projects into them
   */
  private _runListners(): void {
    for (const listner of this._listeners) {
      listner([...this._projects]);
    }
  }
}

export const projectStateInstance = ProjectState.getInstance();
