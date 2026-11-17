import { Router } from "express";
import * as AuthController from "../controllers/Auth.controller.js";
import * as WriterController from "../controllers/Writer.controller.js";
import * as WriterMiddleware from "../middlewares/Writer.middleware.js";

const writerRouter = Router();

// Writer Authorization
writerRouter.post('/login', AuthController.writerLogin);
writerRouter.get('/profile', WriterMiddleware.WriterAuthorize, WriterController.getProfile);

export default writerRouter;