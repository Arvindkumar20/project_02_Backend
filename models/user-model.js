import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String },
    address: { type: String },
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: "Place" }],
},
    {
        timestamps: true
    });
userSchema.plugin(uniqueValidator);
export const User = mongoose.model('User', userSchema);