import { Router } from "express";
import * as AdminController from "../controllers/Admin.controller.js";
import * as AdminMiddleware from "../middlewares/Admin.middleware.js";
import * as AuthController from "../controllers/Auth.controller.js";
import * as StoryController from "../controllers/Story.controller.js"

const adminRouter = Router();

// Admin Authorization
adminRouter.post('/login', AuthController.adminLogin);
adminRouter.get('/profile/:adminId',
    AdminMiddleware.AdminAuthorize,
    AdminMiddleware.isAdminActive,
    AdminController.profile
)

// Reader Management


// Writer Management

// Story Management
adminRouter.get('/stories',
    AdminMiddleware.AdminAuthorize,
    AdminMiddleware.isAdminActive,
    StoryController.getAllStories
)

export default adminRouter;
