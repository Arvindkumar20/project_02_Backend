// import packages 
import {v4  as uuid} from "uuid"

// file import 
import HttpError from "../models/http-error.js";

const DUMMY_DATA = [
    {
        id: "p1",
        title: "clock tower of lucknow",
        description: "lucknow is a city in uttar pradesh",
        image: "sw,d",
        location: {
            lat: 27.1753,
            lng: 83.0093
        }, creator: 'u1'
    }
]
// get Place By Id  method //
const getPlaceById = (req, res, next) => {
    const pid = req.params.pid; //params={pid:p1}
    const place = DUMMY_DATA.find(p => {
        return p.id === pid;
    })
    if (!place) {
        const error = new HttpError('place not found for provided id');
        error.code = 404;
        throw error;
    }
    res.status(200).json({
        "message": "get request from the pace rouete ",
        place: place,
        success: true
    })
    next();
}
// get  Place By User Id by Id method //
const getPlaceByUserId = (req, res, next) => {
    const uid = req.params.uid;
    const user = DUMMY_DATA.find(u => {
        return u.creator === uid;
    })
    if (!user) {
        return next(new HttpError("place  not found for provided user id", 404));
    }
    res.json({
        user,
        success: true
    });
    next();
}
// create place function 
const createPlace = (req, res, next) => {
const {title,description,coordinates,address,creator}=req.body;
const createdPlace={
   id:uuid(),
    title,
    description,
    location:coordinates,
    address,
    creator
}
// DUMMY_DATA.push(createdPlace);
DUMMY_DATA.push(createdPlace);
res.status(201).json({
    message: 'place added successfully',
    place:createdPlace,
    success: true
})
next();
}
// export the functions //
export {
    getPlaceById,
    getPlaceByUserId,
    createPlace

}