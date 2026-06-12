import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Clock, GraduationCap, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from "../lib/supabase";

const AdminDoctors = () => {

  const [doctors, setDoctors] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    department: '',
    available_timings: '',
    photo: ''
  });

  // FETCH DOCTORS
  const fetchData = async () => {

    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("id", { ascending: false });

    if (error) {

      console.log(error);

    } else {

      setDoctors(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD DOCTOR
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { error } = await supabase
        .from("doctors")
        .insert([
          {
            name: formData.name,
            specialization: formData.specialization,
            experience: formData.experience,
            department: formData.department,
            available_timings: formData.available_timings,
            photo: formData.photo
          }
        ]);

      if (error) {

        console.log(error);

        toast.error('Failed to add doctor');

        return;
      }

      toast.success('Doctor added successfully');

      setFormData({
        name: '',
        specialization: '',
        experience: '',
        department: '',
        available_timings: '',
        photo: ''
      });

      setIsAdding(false);

      fetchData();

    } catch (err) {

      console.log(err);

      toast.error("Something went wrong");
    }
  };

  // DELETE DOCTOR
  const handleDelete = async (id) => {

    if (!window.confirm('Delete this doctor?')) return;

    const { error } = await supabase
      .from("doctors")
      .delete()
      .eq("id", id);

    if (error) {

      toast.error('Failed to delete');

    } else {

      toast.success('Doctor removed');

      fetchData();
    }
  };

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Manage Doctors
          </h1>

          <p className="text-sm text-gray-500">
            Add, edit or remove medical specialists.
          </p>

        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center space-x-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >

          <Plus className="h-4 w-4" />

          <span>
            {isAdding ? 'Cancel' : 'Add New Doctor'}
          </span>

        </button>

      </div>

      {/* FORM */}
      {isAdding && (

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-[2rem] border border-blue-100 shadow-xl shadow-blue-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >

          {/* NAME */}
          <div className="space-y-2">

            <label className="text-xs font-bold text-gray-500 ml-1">
              Name
            </label>

            <input
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none"
              placeholder="Dr. John Doe"
            />

          </div>

          {/* SPECIALIZATION */}
          <div className="space-y-2">

            <label className="text-xs font-bold text-gray-500 ml-1">
              Specialization
            </label>

            <input
              required
              value={formData.specialization}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specialization: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none"
              placeholder="Cardiologist"
            />

          </div>

          {/* DEPARTMENT */}
          <div className="space-y-2">

            <label className="text-xs font-bold text-gray-500 ml-1">
              Department
            </label>

            <input
              required
              value={formData.department}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none"
              placeholder="Cardiology"
            />

          </div>

          {/* EXPERIENCE */}
          <div className="space-y-2">

            <label className="text-xs font-bold text-gray-500 ml-1">
              Experience
            </label>

            <input
              required
              value={formData.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none"
              placeholder="10+ Years"
            />

          </div>

          {/* TIMINGS */}
          <div className="space-y-2">

            <label className="text-xs font-bold text-gray-500 ml-1">
              Timings
            </label>

            <input
              required
              value={formData.available_timings}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  available_timings: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none"
              placeholder="09:00 AM - 05:00 PM"
            />

          </div>

          {/* FILE UPLOAD */}
          <div className="space-y-2">

            <label className="text-xs font-bold text-gray-500 ml-1">
              Upload Photo / PDF
            </label>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={async (e) => {

                try {

                  const file = e.target.files[0];

                  if (!file) return;

                  const fileName = `${Date.now()}-${file.name}`;

                  const { error: uploadError } = await supabase.storage
                    .from("doctor-files")
                    .upload(fileName, file, {
                      upsert: true
                    });

                  if (uploadError) {

                    console.log(uploadError);

                    toast.error("Upload failed");

                    return;
                  }

                  const { data } = supabase.storage
                    .from("doctor-files")
                    .getPublicUrl(fileName);

                  setFormData((prev) => ({
                    ...prev,
                    photo: data.publicUrl
                  }));

                  toast.success("File uploaded");

                } catch (err) {

                  console.log(err);

                  toast.error("Upload error");
                }

              }}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none"
            />

          </div>

          {/* BUTTON */}
          <div className="space-y-2 flex items-end">

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all"
            >

              Save Doctor Profile

            </button>

          </div>

        </form>

      )}

      {/* DOCTOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {loading ? (

          [1, 2, 3].map((n) => (

            <div
              key={n}
              className="h-64 bg-white rounded-3xl animate-pulse"
            ></div>

          ))

        ) : doctors.length === 0 ? (

          <div className="col-span-full py-20 text-center text-gray-400">
            No doctors added yet.
          </div>

        ) : (

          doctors.map((doctor) => (

            <div
              key={doctor.id}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
            >

              <div className="flex items-center space-x-4 mb-6">

                <div className="h-16 w-16 bg-blue-50 rounded-2xl overflow-hidden">

                  {doctor.photo ? (

                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />

                  ) : null}

                </div>

                <div>

                  <h3 className="font-bold text-gray-900">
                    {doctor.name}
                  </h3>

                  <p className="text-blue-600 text-xs font-medium">
                    {doctor.specialization}
                  </p>

                </div>

              </div>

              <div className="space-y-3 mb-6">

                <div className="flex items-center text-xs text-gray-500">

                  <Building2 className="h-3.5 w-3.5 mr-2" />

                  <span>
                    Dept: {doctor.department}
                  </span>

                </div>

                <div className="flex items-center text-xs text-gray-500">

                  <GraduationCap className="h-3.5 w-3.5 mr-2" />

                  <span>
                    {doctor.experience}
                  </span>

                </div>

                <div className="flex items-center text-xs text-gray-500">

                  <Clock className="h-3.5 w-3.5 mr-2" />

                  <span>
                    {doctor.available_timings}
                  </span>

                </div>

              </div>

              <button
                onClick={() => handleDelete(doctor.id)}
                className="w-full py-2 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition-all"
              >

                <Trash2 className="h-4 w-4 mx-auto" />

              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default AdminDoctors;