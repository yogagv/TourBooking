import express from 'express'
import { authenticate, restrict } from '../auth/verifyToken.js';
import { createReview } from '../controller/reviewController.js';

const router = express.Router();

router.post('/userReview', authenticate, restrict(['user']), createReview);

export default router