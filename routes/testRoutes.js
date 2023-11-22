import express from "express";
import { testPostController } from "../controllers/testcontroller.js";

// router objects
const router = express.Router();

// routes
router.post("/test-post" , testPostController);


//export
export default router;