import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, getTask, getAllTasks, addTask, setTask, deleteTask } from '../controllers/task.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.get('/alltasks', authRequired, getAllTasks);
router.post('/tasks', authRequired, validateSchema(createTaskSchema), addTask);
router.put('/tasks/:id', authRequired, setTask);
router.delete('/tasks/:id', authRequired, deleteTask);

export default router;