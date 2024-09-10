import express from "express";
// import files 
import {createPlace, getPlaceById, getPlaceByUserId } from "../controllers/places-controller.js"
const router = express.Router();
// define routes
router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlaceByUserId);
router.post("/",createPlace)
export default router;