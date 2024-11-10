import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth';
import {
  getStats,
  getActivities,
  getSystemStatus,
  manageUsers,
  manageCourses,
  manageLabs
} from '../controllers/admin';

const router = Router();

// Admin authentication
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Hardcoded admin credentials (in production, use environment variables)
  if (username === 'nullsoft' && password === 'pika8411') {
    const token = jwt.sign(
      { userId: 'admin', role: 'admin' },
      process.env.ADMIN_SECRET || 'admin-secret-key',
      { expiresIn: '8h' }
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected admin routes
router.use(adminAuth);

router.get('/stats', getStats);
router.get('/activities', getActivities);
router.get('/system/status', getSystemStatus);

// User management
router.get('/users', manageUsers.list);
router.post('/users', manageUsers.create);
router.put('/users/:id', manageUsers.update);
router.delete('/users/:id', manageUsers.delete);

// Course management
router.get('/courses', manageCourses.list);
router.post('/courses', manageCourses.create);
router.put('/courses/:id', manageCourses.update);
router.delete('/courses/:id', manageCourses.delete);

// Lab management
router.get('/labs', manageLabs.list);
router.post('/labs', manageLabs.create);
router.put('/labs/:id', manageLabs.update);
router.delete('/labs/:id', manageLabs.delete);

export { router as adminRouter };