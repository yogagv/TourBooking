import express from 'express'
import { allTour, createTour, deleteTour, getMaxGroupSize, getSingleTour, getTourByCity, getTourByDist, tourByFeatured, tourBySearch, updateTour } from '../controller/tourController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post("/createTour", authenticate, restrict(["admin"]), createTour);
router.get("/allTour", allTour);
router.get("/getSingleTour/:id", getSingleTour);
router.get("/tourByCity/:city",getTourByCity);
router.get("/getTourByDist/:distance",getTourByDist);
router.get("/getMaxGroupSize/:maxGroupSize",getMaxGroupSize);
router.get("/search/tourBySearch", tourBySearch)
router.put("/updateTour/:id", updateTour);
router.delete("/deleteTour/:id", authenticate, deleteTour);
router.get("/search/tourByFeatured/:featured", tourByFeatured);


export default router;