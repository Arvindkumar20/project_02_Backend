// import packages 
import express from "express";
// import files 
import {
    createPlace,
    deletePlaceById,
    getPlaceById,
    getPlacesByUserId,
    updatePlaceById,
} from "../controllers/places-controller.js"
const router = express.Router();
// define routes
router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlacesByUserId);
router.post("/", createPlace)
router.patch("/:pid", updatePlaceById)
router.delete("/:pid", deletePlaceById)
// export router 
export default router;