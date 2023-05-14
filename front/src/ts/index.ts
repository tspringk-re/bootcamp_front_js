import "../css/reset.css";
import "../css/style.css";

import {Application} from "./application";



window.addEventListener("load", async () => {
  const app = new Application();
  app.start();

});
