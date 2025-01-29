import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Place = mongoose.model("Place", placeSchema);

export default Place;