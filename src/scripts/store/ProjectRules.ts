import { projectStatus } from "../utils/projectStatus.js";

export class ProjectRules {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: projectStatus
  ) {}
}
