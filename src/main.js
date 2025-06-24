import {web} from "./application/web.js";
import {logger} from "./application/logging.js";


export default web;
web.listen(3000, () => {
  logger.info("Server running at http://localhost:3000");
});
