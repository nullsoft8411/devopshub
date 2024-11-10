import { Router } from 'express';
import { 
  getCourses,
  getCourseById,
  enrollInCourse,
  updateCourseProgress,
  getEnrolledCourses
} from '../controllers/courses.js';

const router = Router();

router.get('/', getCourses);
router.get('/enrolled', getEnrolledCourses);
router.get('/:id', getCourseById);
router.post('/:id/enroll', enrollInCourse);
router.post('/:id/progress', updateCourseProgress);

export { router as coursesRouter };