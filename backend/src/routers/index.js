import { router as accountRouter } from "./accountRouter.js";
import { router as categoryRouter } from "./categoryRouter.js";
import { router as authRouter } from "./authRouter.js";
import { router as productRouter } from "./productRouter.js";
import errorHandler from "../middlewares/errorHandler.js";
const routers = (app) => {
  app.use("/api/accounts", accountRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/categories", categoryRouter);
  app.use("/api/products", productRouter);
  app.use(errorHandler);
};

export default routers;
