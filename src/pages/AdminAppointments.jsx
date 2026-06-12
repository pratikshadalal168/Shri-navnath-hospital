import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Trash2,
  Phone,
  Calendar as CalendarIcon
} from 'lucide-react';

import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { supabase } from "../lib/supabase";

const AdminAppointments = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // MANUAL FORM
  const [formData, setFormData] = useState({
    patient_name: '',
    email: '',
    phone: '',
    doctor: '',
    appointment_date: '',
    status: 'pending',
  });

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {

      console.log(error);

    } else {

      setAppointments(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {

    fetchAppointments();

    // REALTIME REFRESH
    const channel = supabase
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
        },
        () => {
          fetchAppointments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  // ADD MANUAL APPOINTMENT
  const handleAddAppointment = async () => {

    if (
      !formData.patient_name ||
      !formData.email ||
      !formData.phone ||
      !formData.doctor ||
      !formData.appointment_date
    ) {

      toast.error("Please fill all fields");
      return;
    }

    const { error } = await supabase
      .from("appointments")
      .insert([
        {
          patient_name: formData.patient_name,
          email: formData.email,
          phone: formData.phone,
          doctor: formData.doctor,
          appointment_date: formData.appointment_date,
          status: 'pending',
        }
      ]);

    if (error) {

      console.log(error);
      toast.error("Failed to add appointment");

    } else {

      toast.success("Appointment added");

      setFormData({
        patient_name: '',
        email: '',
        phone: '',
        doctor: '',
        appointment_date: '',
        status: 'pending',
      });

      fetchAppointments();
    }
  };

  // UPDATE STATUS
  const handleStatusUpdate = async (id, status) => {

    const { error } = await supabase
      .from("appointments")
      .update({
        status: status.toLowerCase()
      })
      .eq("id", id);

    if (error) {

      toast.error('Failed to update status');

    } else {

      toast.success(`Appointment ${status}`);

      fetchAppointments();
    }
  };

  // DELETE
  const handleDelete = async (id) => {

    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) {

      toast.error('Failed to delete');

    } else {

      toast.success('Appointment deleted');

      fetchAppointments();
    }
  };

  // FILTER
  const filtered = appointments.filter((apt) => {

    const matchesSearch =
      apt.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone?.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'All' ||
      apt.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (

    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Manage Appointments
          </h1>

          <p className="text-sm text-gray-500">
            View and respond to patient appointment requests.
          </p>

        </div>

      </div>

      {/* MANUAL ADD FORM */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">

        <h2 className="text-lg font-bold mb-5">
          Add Appointment Manually
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Patient Name"
            value={formData.patient_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                patient_name: e.target.value
              })
            }
           className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none transition-all duration-300 hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 shadow-sm"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none transition-all duration-300 hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 shadow-sm"
          />

          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none transition-all duration-300 hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 shadow-sm"
          />

          <input
            type="text"
            placeholder="Doctor"
            value={formData.doctor}
            onChange={(e) =>
              setFormData({
                ...formData,
                doctor: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none transition-all duration-300 hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 shadow-sm"
          />

          <input
            type="text"
            placeholder="2026-05-14"
            value={formData.appointment_date}
            onChange={(e) =>
              setFormData({
                ...formData,
                appointment_date: e.target.value
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none transition-all duration-300 hover:border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 shadow-sm"
          />

        </div>

        <button
          onClick={handleAddAppointment}
          className="mt-5 px-6 py-3 bg-green-600 text-white rounded-xl"
        >
          Save Appointment
        </button>

      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="relative flex-grow">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search patient name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-blue-600/20 outline-none text-sm"
          />

        </div>

        <div className="flex items-center space-x-2">

          <Filter className="h-5 w-5 text-gray-400" />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-100 bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-600/20 outline-none"
          >

            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>

          </select>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Sr No
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Patient
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Specialist
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  DateTime
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-50">

              {loading ? (

                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Loading appointments...
                  </td>
                </tr>

              ) : filtered.length === 0 ? (

                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No appointments found.
                  </td>
                </tr>

              ) : filtered.map((apt, index) => (

                <tr
                  key={apt.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >

                  <td className="px-6 py-6 font-bold text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-6">

                    <div className="flex items-center space-x-3">

                      <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">

                        {apt.patient_name?.charAt(0)}

                      </div>

                      <div>

                        <div className="font-bold text-gray-900 text-sm">
                          {apt.patient_name}
                        </div>

                        <div className="flex items-center text-[10px] text-blue-600 mt-1 font-medium">

                          <Phone className="h-3 w-3 mr-1" />

                          {apt.phone}

                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-6">

                    <div className="text-sm font-medium text-gray-900">
                      {apt.doctor}
                    </div>

                  </td>

                  <td className="px-6 py-6">

                    <div className="text-sm text-gray-900 flex items-center">

                      <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />

                      {apt.appointment_date}

                    </div>

                  </td>

                  <td className="px-6 py-6">

                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",

                        apt.status === 'pending'
                          ? "bg-orange-50 text-orange-600"
                          : apt.status === 'approved'
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      )}
                    >

                      {apt.status}

                    </span>

                  </td>

                  <td className="px-6 py-6 text-right">

                    <div className="flex items-center justify-end space-x-2">

                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(apt.id, 'approved')
                            }
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-100"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(apt.id, 'rejected')
                            }
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-orange-100"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleDelete(apt.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminAppointments;