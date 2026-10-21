import express from 'express';
import Student from '../models/Student.js';
import { allowRoles } from '../middleware/auth.js';

const router = express.Router();
router.use(allowRoles('Admin'));
router.get('/', async (req, res, next) => { try { res.json(await Student.find().populate('classRef').sort({ name: 1 })); } catch (error) { next(error); } });
router.post('/', async (req, res, next) => { try { res.status(201).json(await Student.create(req.body)); } catch (error) { next(error); } });
router.put('/:id', async (req, res, next) => { try { const item = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!item) return res.status(404).json({ message: 'Student not found' }); res.json(item); } catch (error) { next(error); } });
router.delete('/:id', async (req, res, next) => { try { const item = await Student.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: 'Student not found' }); res.json({ message: 'Student deleted' }); } catch (error) { next(error); } });
export default router;
