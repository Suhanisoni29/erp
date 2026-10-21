import express from 'express';
import Attendance from '../models/Attendance.js';
import SchoolClass from '../models/SchoolClass.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
router.use(protect);
router.get('/', async (req, res, next) => { try { const filter = req.user.role === 'Teacher' ? { markedBy: req.user._id } : {}; res.json(await Attendance.find(filter).populate('student classRef').sort({ date: -1 })); } catch (error) { next(error); } });
router.post('/bulk', async (req, res, next) => { try { const { classRef, date, records } = req.body; if (!classRef || !date || !Array.isArray(records)) return res.status(400).json({ message: 'Class, date and records are required' }); if (req.user.role === 'Teacher') { const assigned = await SchoolClass.findOne({ _id: classRef, teacher: req.user.teacher }); if (!assigned) return res.status(403).json({ message: 'You can only mark attendance for your assigned class' }); } const operations = records.map(({ student, status }) => ({ updateOne: { filter: { student, classRef, date }, update: { student, classRef, date, status, markedBy: req.user._id }, upsert: true } })); await Attendance.bulkWrite(operations); res.json({ message: 'Attendance saved' }); } catch (error) { next(error); } });
export default router;
