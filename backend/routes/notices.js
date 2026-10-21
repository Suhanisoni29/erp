import express from 'express';
import Notice from '../models/Notice.js';
import { protect, allowRoles } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);
router.get('/', async (req, res, next) => { try { const filter = req.user.role === 'Admin' ? {} : { $or: [{ status: 'Published' }, { createdBy: req.user._id }] }; res.json(await Notice.find(filter).populate('createdBy responsibleTeacher').sort({ createdAt: -1 })); } catch (error) { next(error); } });
router.post('/', async (req, res, next) => { try { const status = req.user.role === 'Admin' ? 'Published' : 'Pending Review'; res.status(201).json(await Notice.create({ ...req.body, status, createdBy: req.user._id })); } catch (error) { next(error); } });
router.put('/:id', async (req, res, next) => { try { const notice = await Notice.findById(req.params.id); if (!notice) return res.status(404).json({ message: 'Notice not found' }); if (req.user.role !== 'Admin' && String(notice.createdBy) !== String(req.user._id)) return res.status(403).json({ message: 'You can only edit your own notices' }); const changes = req.user.role === 'Admin' ? req.body : { ...req.body, status: 'Pending Review' }; Object.assign(notice, changes); res.json(await notice.save()); } catch (error) { next(error); } });
router.delete('/:id', allowRoles('Admin'), async (req, res, next) => { try { const item = await Notice.findByIdAndDelete(req.params.id); if (!item) return res.status(404).json({ message: 'Notice not found' }); res.json({ message: 'Notice deleted' }); } catch (error) { next(error); } });
export default router;
