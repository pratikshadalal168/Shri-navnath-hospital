import React, { useEffect, useState } from 'react';
import { Users, Calendar, Clock, CheckCircle2, TrendingUp, UserPlus, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from "../lib/supabase";

const AdminDashboard = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW
  const [doctorCount, setDoctorCount] = useState(0);

  // FETCH DATA
  const fetchDashboardData = async () => {

    const { data, error } = await supabase
      .from("appointments")
      .select("*");

    if (error) {

      console.log(error);

    } else {

      setAppointments(data || []);
    }

    // FETCH DOCTOR COUNT
    const { count, error: doctorError } = await supabase
      .from("doctors")
      .select("*", { count: "exact", head: true });

    if (!doctorError) {
      setDoctorCount(count || 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // STATS
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (item) => item.status === "pending"
  ).length;

  const approvedAppointments = appointments.filter(
    (item) => item.status === "approved"
  ).length;

  // UPDATED
  const totalDoctors = doctorCount;

  const statCards = [
    {
      title: 'Total Appointments',
      value: totalAppointments,
      icon: <Calendar />,
      color: 'bg-blue-500'
    },

    {
      title: 'Total Doctors',
      value: totalDoctors,
      icon: <Users />,
      color: 'bg-cyan-500'
    },

    {
      title: 'Pending Approval',
      value: pendingAppointments,
      icon: <Clock />,
      color: 'bg-orange-500'
    },

    {
      title: 'Approved',
      value: approvedAppointments,
      icon: <CheckCircle2 />,
      color: 'bg-green-500'
    },
  ];

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back. Here's what's happening at the hospital today.
        </p>

      </div>

      {loading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {[1, 2, 3, 4].map(n => (
            <div
              key={n}
              className="h-32 bg-white rounded-3xl animate-pulse"
            ></div>
          ))}

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {statCards.map((card, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden"
            >

              <div
                className={cn(
                  "absolute top-0 right-0 h-24 w-24 -mr-8 -mt-8 opacity-10 rounded-full",
                  card.color
                )}
              ></div>

              <div className="flex items-center space-x-4">

                <div
                  className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center text-white",
                    card.color
                  )}
                >

                  {card.icon}

                </div>

                <div>

                  <div className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </div>

                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {card.title}
                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      )}

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">

            <h3 className="font-bold text-gray-900 mb-6 flex items-center">

              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />

              Monthly Performance

            </h3>

            <div className="h-64 flex items-end justify-between px-4">

              {[40, 60, 30, 80, 50, 90, 70, 45, 85, 30, 60, 95].map((h, i) => (

                <div key={i} className="flex flex-col items-center group">

                  <div
                    style={{ height: `${h}%` }}
                    className="w-4 bg-blue-100 rounded-t-sm group-hover:bg-blue-600 transition-all cursor-pointer"
                  ></div>

                  <span className="text-[10px] text-gray-400 mt-2 font-mono">

                    {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}

                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        <div className="space-y-6">

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">

            <h3 className="font-bold text-gray-900 mb-6">
              Quick Actions
            </h3>

            <div className="space-y-3">

              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium">

                <div className="flex items-center">

                  <UserPlus className="h-5 w-5 mr-3" />

                  Add New Doctor

                </div>

                <span className="text-xl">+</span>

              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium">

                <div className="flex items-center">

                  <Building2 className="h-5 w-5 mr-3" />

                  Manage Depts

                </div>

                <span className="h-2 w-2 rounded-full bg-blue-600"></span>

              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-medium">

                <div className="flex items-center">

                  <Calendar className="h-5 w-5 mr-3" />

                  Bulk Approve

                </div>

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

// Helper
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export default AdminDashboard;