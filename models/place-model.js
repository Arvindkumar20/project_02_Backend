import mongoose from "mongoose";
const placeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        lat: { type: Number},
        lng: { type: Number, }
    },
    image: { type: String, required: true },
    address: { type: String, required: true },
    // creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
    creator: { type: String, required: true }
});
export const PlaceModel = mongoose.model("Place", placeSchema); 