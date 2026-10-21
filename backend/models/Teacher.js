import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: String,
  subject: String,
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'SchoolClass' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
