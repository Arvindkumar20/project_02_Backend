import { validationResult } from "express-validator";

import HttpError from "../models/http-error.js";
import { PlaceModel } from "../models/place-model.js";
import getCoordesForAddress from "../util/location.js";
import { User } from "../models/user-model.js";
import mongoose from "mongoose";

export const createPlace = async (req, res, next) => {
    const error = validationResult(req);
    // console.log(error)
    if (!error.isEmpty()) {
        return next(new HttpError("invalid inputs", 422));
    }
    const { title, description, address, image, creator } = req.body;
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
        image: image,
        creator,
        address,
    })
    let user;
    try {
        user = await User.findById(creator);

    } catch (error) {
        const err = new HttpError(error, 500);
        return next(err);
    }
    if (!user) {
        const error = new HttpError("user could not find for provided id ", 404);
        return next(error);
    }
    // console.log(user)
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        await user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();

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
        return next(new HttpError(`could not find place for provided place id  `,
            404))
    }
    return res.json({ place: place.toObject({ getters: true }) });
}

export const getPlacesByUserId = async (req, res, next) => {
    const creator = req.params.uid;
    // let places;
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(creator).populate('places');
    } catch (error) {
        return next(new HttpError(`could not find place for provided user id ${error} `, 500));
    }
    if (!userWithPlaces) {
        return next(new HttpError(`could not find place for provided user id ${uid} `, 404));

    }
    return res.json({
        message: "places found",
        places: userWithPlaces.places.map((place) => place.toObject({ getters: true }))

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
export const deletePlaceById = async (req, res, next) => {
    const pid = req.params.pid;
    let place;
    try {
        place = await PlaceModel.findById(pid).populate('creator');
    } catch (error) {
        const err = new HttpError(error, 500);
        return next(err);
    }
    if (!place) {
        return next(new HttpError(`could not find place for provided place id `,
            404));
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await PlaceModel.findByIdAndDelete(pid, { session: sess });
        await place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();


        //  console.log(place)
    } catch (err) {
        const error = new HttpError("something went wrong could't delete place " + err, 500);
        return next(error);
    }
    if (!place) {
        return next(new HttpError(`could not find place for provided place id ${pid} `, 404));
    }
    return res.status(200).json({
        message: "place deleted",
    });
};