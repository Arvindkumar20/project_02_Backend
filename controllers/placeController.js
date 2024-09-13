import { validationResult } from "express-validator";

import HttpError from "../models/http-error.js";
import { PlaceModel } from "../models/place-model.js";
import getCoordesForAddress from "../util/location.js";

export const createPlace = async (req, res, next) => {
    const error = validationResult(req);
    console.log(error)
    if (!error.isEmpty()) {
        return next(new HttpError("invalid inputs", 422));
    }
    const { title, description, address, creator } = req.body;
    let coordinates;
    try {
        coordinates = await getCoordesForAddress(address);
    } catch (error) {
        next(error)
    }
    const createdPlace = new PlaceModel({
        title,
        description,
        location: coordinates,
        image: "vgvbhb",
        creator,
        address,
    })
    try {
        await createdPlace.save();
    } catch (err) {
        const error = new HttpError(`could not created place ${err}`, 500);
        return next(error);

    }
    res.json({
        message: "created place successfully",
        createdPlace
    })
}
export const getPlaceById = async (req, res, next) => {
    const pid = req.params.pid;
    let place;
    try {
        place = await PlaceModel.findById(pid);

    } catch (error) {
        return next(new HttpError(`could not find place for provided place id ${error} `, 500))
    }
    if (!place) {
        return next(new HttpError(`could not find place for provided place id ${pid} `,
            404))
    }
    return res.json({ place: place.toObject({ getters: true }) });
}

export const getPlacesByUserId = async (req, res, next) => {
    const uid = req.params.uid;
    let places;
    try {
        places = await PlaceModel.find({ creator: uid });
    } catch (error) {
        return next(new HttpError(`could not find place for provided user id ${error} `, 500));
    }
    if (!places || places.length === 0) {
        return next(new HttpError(`could not find place for provided user id ${uid} `, 404));

    }
    return res.json({
        message: "places found",
        places: places.map((place) => place.toObject({ getters: true }))

    })

}

export const updatePlaceById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("invalid inputs", 422);
    }
    const pid = req.params.pid;
    const { title, description } = req.body;
    let place;
    try {
        place = await PlaceModel.findById(pid);
    } catch (error) {
        return next(new HttpError(`${error}`, 500))
    }

    if (!place) {
        return next(new HttpError(`could not find place for provided place id ${pid} `, 404));
    }
    place.title = title;
    place.description = description;
    try {
        await place.save();
    } catch (error) {
        return next(new HttpError(`${error}`, 500))
    }
    return res.status(200).json({
        message: "place updated",
        place: place.toObject({ getters: true })

    })
}
export const deletePlaceById=async(req,res,next)=>{
const pid=req.params.pid;
let deletedPlace;
try {
     deletedPlace=await PlaceModel.findByIdAndDelete(pid);
} catch (error) {
    return next(new HttpError(`${error}`, 500));
}
if (!deletedPlace) {
    return next(new HttpError(`could not find place for provided place id ${pid} `,404));
}
return res.status(200).json({
    message: "place deleted",
});
}