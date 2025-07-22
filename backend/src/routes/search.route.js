import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import { searchUser } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/user",protectRoute,searchUser);


export default router;
