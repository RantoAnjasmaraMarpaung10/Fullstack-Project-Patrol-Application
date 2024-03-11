import express from "express";
import { logout, signin, signup, userProfile } from "../controllers/authController.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

//auth routes
//signup
router.post('/signup', signup);
//signin
router.post('/signin', signin);
//logout
router.get('/logout', logout);
//me
router.get('/me', isAuthenticated, userProfile);

export default router;
