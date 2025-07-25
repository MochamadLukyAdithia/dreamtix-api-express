import express from "express";
import { publicRouter } from "../route/public-api.js";
import { userRouter } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);


// // src/application/web.js
// import express from "express";
// const app = express();

// // setup routes
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// export const web = app;
