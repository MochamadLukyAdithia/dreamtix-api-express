import {web} from "./application/web.js";
import {logger} from "./application/logging.js";
import { swaggerDocs } from "./application/swagger.js"; 


web.listen(3000, () => {
  logger.info("Server running at http://localhost:3000");
  swaggerDocs(web);
});
