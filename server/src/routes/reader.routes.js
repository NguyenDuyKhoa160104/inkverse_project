import { Router } from "express";
import * as AuthController from "../controllers/Auth.controller.js";
import * as ReaderController from "../controllers/Reader.controller.js";
import * as ReaderMiddleware from "../middlewares/Reader.middleware.js";

const readerRouter = Router();

// Reader Authorization
readerRouter.post('/login', AuthController.readerLogin);
readerRouter.get('/profile/:readerId', 
    ReaderMiddleware.ReaderAuthorize, 
    ReaderMiddleware.isReaderActive,
    ReaderController.getProfile);

export default readerRouter;    