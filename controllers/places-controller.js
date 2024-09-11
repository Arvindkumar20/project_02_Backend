// import packages 
import {v4  as uuid} from "uuid"

// file import 
import HttpError from "../models/http-error.js";

let DUMMY_DATA = [
    {
        id: "p1",
        title: "clock tower of lucknow",
        description: "lucknow is a city in uttar pradesh",
        image: "sw,d",
        location: {
            lat: 27.1753,
            lng: 83.0093
        }, creator: 'u1'
    }, {
        id: "p2",
        title: "clock tower of lundon",
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
// get  Places By User Id by Id method //
const getPlacesByUserId = (req, res, next) => {
    const uid = req.params.uid;
    const places = DUMMY_DATA.filter(p => {
        return p.creator === uid;
    })
    if (!places||places.length===0) {
        return next(new HttpError("places are  not found for provided user id", 404));
    }
    res.json({
        places,
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
// next();
}
//update place by id
const updatePlaceById=(req,res,next)=>{
    const pid=req.params.pid;
    const {title,description}=req.body;
    const updatedPlace={...DUMMY_DATA.find(p=>p.id===pid)};
    const placeIndex=DUMMY_DATA.findIndex(p=>p.id===pid);
    updatedPlace.title=title;
    updatedPlace.description=description;
    DUMMY_DATA[placeIndex]=updatedPlace;
    res.status(200).json({
        message: 'place updated successfully',
        place:updatedPlace,
        success:true
    })
    next();

}
//delete place by id
const deletePlaceById=(req,res,next)=>{
    const pid=req.params.pid;
    DUMMY_DATA=DUMMY_DATA.filter(p=>p.id!==pid);
    res.status(200).json({
        message: 'place deleted successfully',
        success:true,
        DUMMY_DATA
    })
    // next();

}
// export the functions //
export {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlaceById,
    deletePlaceById

}