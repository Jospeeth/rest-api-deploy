import express, { json } from "express";
import { foodsRouter } from "./routes/routesFoods.js";
import { corsMiddleware } from "./middlewares/cors.js";


const app = express();
app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware());

app.use("/foods", foodsRouter);



const port = process.env.PORT ?? 1234;

app.listen(port, () => {
  console.log(`Server listening on port:  http://localhost:${port}`);
});
