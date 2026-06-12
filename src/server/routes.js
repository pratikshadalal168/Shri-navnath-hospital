import express from 'express';
import bcrypt from 'bcryptjs';
import { User, Department, Doctor, Appointment } from './models.js';
import { generateToken, authenticateToken } from './auth_middleware.js';

const router = express.Router();

// --- Auth Routes ---

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ user: { id: user._id, username: user.username, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

// Seed admin user helper
router.post('/seed-admin', async (req, res) => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });
    await admin.save();
    res.json({ message: 'Admin seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Public Routes ---

// Get Departments
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('department');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Book Appointment
router.post('/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment', error });
  }
});

// --- Admin Protected Routes ---

// Get Stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'Pending' });
    const approvedAppointments = await Appointment.countDocuments({ status: 'Approved' });
    
    res.json({
      totalAppointments,
      totalDoctors,
      pendingAppointments,
      approvedAppointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Manage Appointments
router.get('/admin/appointments', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('department')
      .populate('doctor')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/admin/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/admin/appointments/:id', authenticateToken, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Manage Doctors
router.post('/admin/doctors', authenticateToken, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: 'Error adding doctor', error });
  }
});

router.put('/admin/doctors/:id', authenticateToken, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: 'Error updating doctor', error });
  }
});

router.delete('/admin/doctors/:id', authenticateToken, async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Manage Departments
router.post('/admin/departments', authenticateToken, async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: 'Error adding department', error });
  }
});

router.delete('/admin/departments/:id', authenticateToken, async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
