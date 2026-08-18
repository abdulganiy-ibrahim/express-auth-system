import Router from "express";
import { signUp, getUsers, signIn } from "./auth.controller.js";

const router = Router();

router.post('/signup', signUp)
router.post('/login', signIn);
router.get('/', getUsers);

export default router;