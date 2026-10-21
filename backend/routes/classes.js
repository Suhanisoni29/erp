import express from 'express';
import SchoolClass from '../models/SchoolClass.js';
import { allowRoles } from '../middleware/auth.js';

const router = express.Router();
router.get('/', async (req, res, next) => { try { res.json(await SchoolClass.find().populate('teacher')); } catch (error) { next(error); } });
router.post('/', allowRoles('Admin'), async (req, res, next) => { try { res.status(201).json(await SchoolClass.create(req.body)); } catch (error) { next(error); } });
router.put('/:id', allowRoles('Admin'), async (req, res, next) => { try { const item = await SchoolClass.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!item) return res.status(404).json({ message: 'Class not found' }); res.json(item); } catch (error) { next(error); } });
router.delete('/:id', allowRoles('Admin'), async (req, res, next) => { try { const item = await SchoolClass.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: 'Class not found' }); res.json({ message: 'Class deleted' }); } catch (error) { next(error); } });
export default router;
