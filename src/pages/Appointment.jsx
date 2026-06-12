import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
} from 'lucide-react';

import { toast } from 'sonner';

import { supabase } from '../lib/supabase';

const appointmentSchema = z.object({
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  department: z.string().min(1, 'Please select a department'),
  doctor: z.string().min(1, 'Please select a doctor'),
  date: z.string().min(1, 'Please select a date'),
});

const Appointment = () => {

  const [submitted, setSubmitted] = useState(false);

  // DYNAMIC DOCTORS
  const [doctors, setDoctors] = useState([]);

  const departments = [
    { id: 'Cardiology', name: 'Cardiology' },
    { id: 'Neurology', name: 'Neurology' },
    { id: 'Orthopedic', name: 'Orthopedic' },
    { id: 'Pediatrics', name: 'Pediatrics' },
  ];

  // FETCH DOCTORS
  useEffect(() => {

    const fetchDoctors = async () => {

      const { data, error } = await supabase
        .from("doctors")
        .select("*");

      if (!error) {

        setDoctors(data || []);
      }
    };

    fetchDoctors();

  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
  });

  const selectedDept = watch('department');

  // FILTER DOCTORS
  const filteredDoctors = doctors.filter((doc) => {
    return !selectedDept || doc.department === selectedDept;
  });

  // SUBMIT FUNCTION
  const onSubmit = async (data) => {

    console.log("FORM SUBMITTED");
    console.log(data);

    try {

      const { error } = await supabase
        .from('appointments')
        .insert([
          {
            patient_name: data.patientName,
            email: data.email || "",
            phone: data.phone,
            doctor: data.doctor,
            appointment_date: data.date,
            status: 'pending',
          },
        ]);

      if (error) {

        console.log("SUPABASE ERROR:", error);

        toast.error(error.message);

        return;
      }

      console.log("DATA INSERTED SUCCESSFULLY");

      setSubmitted(true);

      toast.success('Appointment booked successfully!');

    } catch (error) {

      console.log("CATCH ERROR:", error);

      toast.error('Server error. Please try later.');
    }
  };

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="pt-24 pb-20 px-4">

        <div className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] border border-light-bg shadow-2xl text-center">

          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-3xl font-bold mb-4">
            Appointment Booked!
          </h2>

          <p className="text-gray-600 mb-10">
            Our team will contact you shortly.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-4 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-all"
          >
            Book Another Appointment
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div>

              <h1 className="text-4xl font-bold mb-6">
                Book an <span className="text-green-600">Appointment</span>
              </h1>

              <p className="text-gray-600">
                Fill the form and our team will contact you shortly.
              </p>

            </div>

            <div className="space-y-6">

              {[
                {
                  icon: <Clock />,
                  title: 'Quick Response',
                  desc: 'Get confirmation quickly',
                },
                {
                  icon: <CalendarIcon />,
                  title: 'Flexible Timing',
                  desc: 'Choose suitable slots',
                },
              ].map((item, i) => (

                <div
                  key={i}
                  className="flex items-start space-x-4 bg-gray-50 p-6 rounded-2xl"
                >

                  <div className="text-green-600">
                    {item.icon}
                  </div>

                  <div>

                    <h4 className="font-bold text-sm">
                      {item.title}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      {item.desc}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* FORM SIDE */}
          <div className="lg:col-span-2">

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl">

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
              >

                {/* PATIENT INFO */}
                <div className="space-y-6">

                  <h3 className="text-lg font-bold border-l-4 border-green-600 pl-4">
                    Patient Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* NAME */}
                    <div>

                      <label className="block text-sm font-semibold mb-2">
                        Patient Name *
                      </label>

                      <div className="relative">

                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                        <input
                          {...register('patientName')}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none"
                          placeholder="Enter name"
                        />

                      </div>

                      {errors.patientName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.patientName.message}
                        </p>
                      )}

                    </div>

                    {/* PHONE */}
                    <div>

                      <label className="block text-sm font-semibold mb-2">
                        Phone *
                      </label>

                      <div className="relative">

                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                        <input
                          {...register('phone')}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 outline-none"
                          placeholder="Phone number"
                        />

                      </div>

                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone.message}
                        </p>
                      )}

                    </div>

                  </div>
                </div>

                {/* APPOINTMENT INFO */}
                <div className="space-y-6">

                  <h3 className="text-lg font-bold border-l-4 border-green-600 pl-4">
                    Appointment Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* DEPARTMENT */}
                    <div>

                      <label className="block text-sm font-semibold mb-2">
                        Department *
                      </label>

                      <div className="relative">

                        <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                        <select
                          {...register('department')}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white outline-none"
                        >

                          <option value="">
                            Select Department
                          </option>

                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.name}>
                              {dept.name}
                            </option>
                          ))}

                        </select>

                      </div>

                    </div>

                    {/* DOCTOR */}
                    <div>

                      <label className="block text-sm font-semibold mb-2">
                        Doctor *
                      </label>

                      <select
                        {...register('doctor')}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white outline-none"
                      >

                        <option value="">
                          Select Doctor
                        </option>

                        {filteredDoctors.map((doc) => (
                          <option key={doc.id} value={doc.name}>
                            {doc.name}
                          </option>
                        ))}

                      </select>

                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* DATE */}
                    <div>

                      <label className="block text-sm font-semibold mb-2">
                        Date *
                      </label>

                      <input
                        type="date"
                        {...register('date')}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none"
                      />

                    </div>

                    {/* EMAIL */}
                    <div>

                      <label className="block text-sm font-semibold mb-2">
                        Email
                      </label>

                      <input
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none"
                        placeholder="Email"
                      />

                    </div>

                  </div>

                </div>

                {/* NOTE */}
                <div className="flex items-center space-x-2 text-sm bg-gray-50 p-4 rounded-xl border border-green-100">

                  <AlertCircle className="h-5 w-5 text-green-600 shrink-0" />

                  <p>
                    We will contact you shortly for confirmation.
                  </p>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => console.log("BUTTON CLICKED")}
                  className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300"
                >
                  {isSubmitting
                    ? 'Booking...'
                    : 'Confirm Appointment Request'}
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;