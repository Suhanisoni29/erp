import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  classRef: { type: mongoose.Schema.Types.ObjectId, ref: 'SchoolClass', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
attendanceSchema.index({ student: 1, classRef: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
