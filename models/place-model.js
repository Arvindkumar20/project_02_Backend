import mongoose from "mongoose";
const placeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        lat: { type: Number,required:true},
        lng: { type: Number,required:true }
    },
    image: { type: String,  },
    address: { type: String, },
    creator: { type: mongoose.Schema.Types.ObjectId,ref:"User", }
},
{
    timestamps:true
    });
export const PlaceModel = mongoose.model("Place", placeSchema); 