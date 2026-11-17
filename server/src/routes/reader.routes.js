import { Router } from "express";
import * as AuthController from "../controllers/Auth.controller.js";
import * as ReaderController from "../controllers/Reader.controller.js";
import * as StroryController from "../controllers/Story.controller.js" 

import * as ReaderMiddleware from "../middlewares/Reader.middleware.js";

import writerRouter from "./writer.routes.js";

const readerRouter = Router();

// Reader Authorization
readerRouter.post('/login', 
    AuthController.readerLogin
);
readerRouter.post('/register', AuthController.readerRegister);
readerRouter.get('/profile/:readerId', 
    ReaderMiddleware.ReaderAuthorize, 
    ReaderMiddleware.isReaderActive,
    ReaderController.getProfile
);
readerRouter.get('/all-aprroved-stories', 
    ReaderMiddleware.ReaderAuthorize, 
    StroryController.getAllAprrovedStories,
);

export default readerRouter;