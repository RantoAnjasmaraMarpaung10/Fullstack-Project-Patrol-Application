import express from "express";
import { deleteInputsById, getInputs, getInputsById, saveInputs, updateInputsById } from "../controllers/InputController.js";
import { isAuthenticated } from "../middleware/auth.js";
import multer from "multer";
const upload = multer({dest : 'images/'})



const router = express.Router();

router.get('/inputs', getInputs);
router.post('/inputs', isAuthenticated, saveInputs);
router.get('/inputs/:id', getInputsById);
router.put("/inputs/:id", updateInputsById)
router.delete("/inputs/:id", deleteInputsById);



export default router;