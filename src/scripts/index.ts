import { Fields } from "./components/Fields.js";
import { ProjectsList } from "./components/ProjectsList.js";
import { Popup } from "./components/Popup.js";
new Fields();

new ProjectsList("Initial");
new ProjectsList("Active");
new ProjectsList("Finished");
new Popup();
