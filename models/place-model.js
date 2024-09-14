import mongoose from "mongoose";
const placeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        lat: { type: Number,required:true},
        lng: { type: Number,required:true }
    },
    image: { type: String, required: true },
    address: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true }
},
{
    timestamps:true
    });
export const PlaceModel = mongoose.model("Place", placeSchema); 