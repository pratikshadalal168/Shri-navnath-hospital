import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import {
  Search,
  Filter,
  Star,
  Calendar,
  Clock,
} from "lucide-react";

export default function Doctors() {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {

    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setDoctors(data);
      console.log(data);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* HERO */}
      <section className="px-6 lg:px-12 py-14">
        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-4xl lg:text-4xl font-bold text-slate-900">
            Our Professional Doctors
          </h1>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our team of world-class specialists dedicated to
            providing you with the best medical care possible.
          </p>


          {/* DOCTOR CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
              >

                <div className="relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="absolute top-4 right-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                    >
                      Available
                    </span>
                  </div>
                </div>

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-slate-900">
                    {doctor.name}
                  </h2>

                  <p className="text-green-600 font-medium mt-1">
                    {doctor.specialization}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {doctor.experience}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                    <span className="text-sm font-medium text-slate-700">
                      Expert Doctor
                    </span>
                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>
        {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-green-600">50+</h2>
              <p className="mt-2 text-slate-600">Expert Doctors</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-green-600">20+</h2>
              <p className="mt-2 text-slate-600">Specialities</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-green-600">24/7</h2>
              <p className="mt-2 text-slate-600">Emergency Support</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-bold text-green-600">10k+</h2>
              <p className="mt-2 text-slate-600">Happy Patients</p>
            </div>

          </div>

      </section>

    </div>
  );
}