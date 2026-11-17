import { Router } from "express";
import adminRouter from "./admin.routes.js";
import readerRouter from "./reader.routes.js";
import writerRouter from "./writer.routes.js";

const router = Router();

router.use('/admin', adminRouter);
router.use('/reader', readerRouter);
router.use('/writer', writerRouter);

export default router;