// import packages 
import express from "express";
import { check } from "express-validator";
// import { createPlace } from "../controllers/place.controller.js";
import {
    createPlace,
    getPlaceById,
    getPlacesByUserId,
    updatePlaceById,
    deletePlaceById
} from "../controllers/placeController.js";
import { fileUpload } from "../middlewares/file-upload.js";
import { checkAuth } from "../middlewares/check-auth.js";
// import files 
// import {
//     createPlace,
//     deletePlaceById,
//     getPlaceById,
//     getPlacesByUserId,
//     updatePlaceById,
// } from "../controllers/places-controller.js"
const router = express.Router();
// define routes
router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlacesByUserId);
router.use(checkAuth);
router.post(
    "/new",
    fileUpload.single('image'),
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('address').not().isEmpty(),

    ],
    createPlace)
router.patch(
    "/:pid",
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),

    ], updatePlaceById)
router.delete("/:pid", deletePlaceById);
// export router 
export default router;