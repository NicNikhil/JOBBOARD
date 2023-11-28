import express from "express";
import { testPostController } from "../controllers/testcontroller.js";
import userAuth from "../middlewares/authMiddleware.js";

// router objects
const router = express.Router();

// routes
router.post("/test-post", userAuth, testPostController);


//export
export default router;