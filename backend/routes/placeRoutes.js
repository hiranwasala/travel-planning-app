import express from 'express';
import { getPlaces, getPlaceById } from '../controllers/placeController.js';

const router = express.Router();

router.route('/').get(getPlaces);
router.route('/:id').get(getPlaceById);

export default router;