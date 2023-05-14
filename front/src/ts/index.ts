import "../css/style.css";
import "../css/reset.css";
import {Application} from "./application";

window.addEventListener("load", () => {
  const app = new Application();
  app.start();
});
