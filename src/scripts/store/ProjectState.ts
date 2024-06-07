import { projectStatus } from "../utils/projectStatus.js";
import { ProjectRules } from "./ProjectRules.js";

class ProjectState {
  private static _instance: ProjectState;
  private _projects: ProjectRules[] = [];
  private _listeners: Function[] = [];
  constructor() {}
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
  }

  /**
   * @desc pushing listners in array
   * @param listner : Function
   */
  public pushListner(listner: Function) {
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
