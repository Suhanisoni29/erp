import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['General', 'Academic', 'Examination', 'Event', 'Urgent'], default: 'General' },
  status: { type: String, enum: ['Draft', 'Pending Review', 'Published', 'Archived'], default: 'Draft' },
  audience: { type: String, default: 'All classes' },
  dueDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responsibleTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  responsibilityStatus: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  completionNote: String,
}, { timestamps: true });

export default mongoose.model('Notice', noticeSchema);
