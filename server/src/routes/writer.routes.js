import { Router } from "express";
import * as AuthController from "../controllers/Auth.controller.js";
import * as WriterController from "../controllers/Writer.controller.js";
import * as WriterMiddleware from "../middlewares/Writer.middleware.js";
import * as StoryController from "../controllers/Story.controller.js"

const writerRouter = Router();

// Writer Authorization
writerRouter.post('/login', 
    AuthController.writerLogin
);
writerRouter.post('/register',
    AuthController.writerRegister
)
writerRouter.get('/profile/:writerId', 
    WriterMiddleware.WriterAuthorize, 
    WriterMiddleware.isWriterActive,
    WriterController.getProfile
);

// Writer story
writerRouter.get('/stories',
    WriterMiddleware.WriterAuthorize,
    StoryController.getAllStories
)

export default writerRouter;