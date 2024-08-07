import express from 'express'
import { authenticate, restrict } from '../auth/verifyToken.js';
import { createReview, getReview } from '../controller/reviewController.js';

const router = express.Router();

router.post('/tourreview/:tourId', authenticate, restrict(['user']), createReview);
router.get('/getReview/:tourId', getReview);


export default router