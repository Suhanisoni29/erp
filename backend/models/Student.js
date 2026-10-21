import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, required: true, trim: true },
  classRef: { type: mongoose.Schema.Types.ObjectId, ref: 'SchoolClass', required: true },
  section: { type: String, required: true, trim: true },
  guardianName: String,
  guardianContact: String,
}, { timestamps: true });
studentSchema.index({ rollNumber: 1, classRef: 1, section: 1 }, { unique: true });

export default mongoose.model('Student', studentSchema);
