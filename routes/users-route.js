import express from "express";
import { check } from "express-validator";
import {
    getUsers,
    login,
    signup,
    deleteUser
} from "../controllers/userController.js";
// import {
//     getUsers,
//     login,
//     signup
// } from "../controllers/users-controller.js";
const router = express.Router();

router.get("/", getUsers);
router.post(
    "/signup",
    [check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    ],
    signup);
router.post("/login", login);
router.delete("/:uid", deleteUser);
export default router;