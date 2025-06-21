// api/index.js
import serverless from "serverless-http";
import app from "../src/main.js"// Ini mengimpor Express app kamu

export const handler = serverless(app); // Bungkus dengan serverless
