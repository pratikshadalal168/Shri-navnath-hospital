import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  icon: { type: String }, // Lucide icon name
}, { timestamps: true });

export const Department = mongoose.model('Department', departmentSchema);

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  photo: { type: String },
  availableTimings: { type: String, required: true },
  email: { type: String },
}, { timestamps: true });

export const Doctor = mongoose.model('Doctor', doctorSchema);

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: { type: String, required: true },
  email: { type: String },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  symptoms: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

export const Appointment = mongoose.model('Appointment', appointmentSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
