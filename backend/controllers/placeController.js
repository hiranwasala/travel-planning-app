import Place from "../models/placeModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Fetch all places
// @route   GET /api/places
// @access  Public
const getPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find({});
  res.json(places);
});

// @desc    Fetch single
// @route   GET /api/places/:id
// @access  Public
const getPlaceById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (place) {
    res.json(place);
  } else {
    res.status(404);
    throw new Error("Place not found");
  }
});

export { getPlaces, getPlaceById };

