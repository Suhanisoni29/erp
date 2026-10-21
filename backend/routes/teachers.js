import express from 'express';
import bcrypt from 'bcryptjs';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';
import { allowRoles } from '../middleware/auth.js';

const router = express.Router();
router.use(allowRoles('Admin'));
router.get('/', async (req, res, next) => { try { res.json(await Teacher.find().populate('assignedClass')); } catch (error) { next(error); } });
router.post('/', async (req, res, next) => { try { const { name, email, phone, subject, assignedClass, password = 'ChangeMe123!' } = req.body; const teacher = await Teacher.create({ name, email, phone, subject, assignedClass }); await User.create({ name, email, password: await bcrypt.hash(password, 10), role: 'Teacher', teacher: teacher._id }); res.status(201).json(teacher); } catch (error) { next(error); } });
router.put('/:id', async (req, res, next) => { try { const item = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!item) return res.status(404).json({ message: 'Teacher not found' }); res.json(item); } catch (error) { next(error); } });
router.delete('/:id', async (req, res, next) => { try { const item = await Teacher.findByIdAndUpdate(req.params.id, { active: false }, { new: true }); if (!item) return res.status(404).json({ message: 'Teacher not found' }); res.json(item); } catch (error) { next(error); } });
export default router;
