import mongoose from 'mongoose';

const schoolClassSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  section: { type: String, required: true, trim: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  room: String,
}, { timestamps: true });
schoolClassSchema.index({ name: 1, section: 1 }, { unique: true });

export default mongoose.model('SchoolClass', schoolClassSchema);
