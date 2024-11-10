import { Router } from 'express';
import { 
  getLabs,
  getLabById,
  startLab,
  submitLabTask,
  getLabProgress
} from '../controllers/labs.js';

const router = Router();

router.get('/', getLabs);
router.get('/:id', getLabById);
router.post('/:id/start', startLab);
router.post('/:id/tasks/:taskId', submitLabTask);
router.get('/:id/progress', getLabProgress);

export { router as labsRouter };