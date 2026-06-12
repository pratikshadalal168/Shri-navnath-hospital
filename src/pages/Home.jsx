import { motion } from "motion/react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Stethoscope,
  Heart,
  HeartPulse,
  Brain,
  Baby,
  ShieldCheck,
  Microscope,
  Thermometer,
  Clock,
  CheckCircle2,
  Building2,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import { cn } from "../lib/utils.js";

const Home = () => {
  return (
    <div className="overflow-hidden bg-[#F8FAFC]">

     {/* HERO SECTION */}
  {/* HERO SECTION */}
<section className="relative pt-10 pb-24 overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0">
    <img
      src="/ward.jpeg"
      alt="Hospital Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* LIGHT BLUE BLUR OVERLAY */}
  <div className="absolute inset-0 bg-sky-300/30 backdrop-blur-[2px]"></div>

  {/* CONTENT */}
  <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

    <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[350px]">

      {/* LEFT */}
      <div>

        <h1 className="text-[42px] lg:text-[62px] font-extrabold leading-[1.05] text-[#0B132B]">
          Your Health
          <br />
          <span className="text-green-600">
            Our Priority
          </span>
        </h1>

        <p className="mt-6 text-lg text-white leading-relaxed max-w-lg">
          We provide exceptional healthcare services
          with compassion and excellence.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">

          <Link
  to="/appointment"
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition inline-flex items-center justify-center"
>
  Book Appointment
</Link>
        </div>

      </div>

      {/* RIGHT IMAGE CARD */}
      

    </div>

  </div>

</section>

  {/* FEATURE CARDS */}
  <section className="-mt-14 px-6 lg:px-8 pb-16 relative z-10">

    <div className="max-w-6xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* CARD 1 */}
        <div className="bg-white rounded-3xl p-7 shadow-md border border-slate-100 text-center">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Stethoscope className="text-green-700 w-8 h-8" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            Expert Doctors
          </h3>

          <p className="mt-3 text-slate-600 leading-relaxed">
            Highly qualified & experienced doctors
          </p>

        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-3xl p-7 shadow-md border border-slate-100 text-center">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Building2 className="text-green-700 w-8 h-8" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            24/7 Emergency
          </h3>

          <p className="mt-3 text-slate-600 leading-relaxed">
            We are always here for your emergency
          </p>

        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-3xl p-7 shadow-md border border-slate-100 text-center">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <HeartPulse className="text-green-700 w-8 h-8" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            Advanced Care
          </h3>

          <p className="mt-3 text-slate-600 leading-relaxed">
            Modern equipment and advanced technology
          </p>

        </div>

        {/* CARD 4 */}
        <div className="bg-white rounded-3xl p-7 shadow-md border border-slate-100 text-center">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <Users className="text-green-700 w-8 h-8" />
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            Patient First
          </h3>

          <p className="mt-3 text-slate-600 leading-relaxed">
            We care for you and your family
          </p>

        </div>

      </div>

    </div>

  </section>


      {/* ABOUT SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-green-600"></div>

                <span className="text-green-600 font-bold uppercase tracking-widest text-xs">
                  About Us
                </span>
              </div>

              <h2 className="text-4xl lg:text-4xl font-bold text-slate-900 leading-tight mb-8">
                Welcome To Shri Navnath
                <br />
                Multi Speciality Hospital
              </h2>

              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                We provide the best medical services for you and your family.
                Our team of expert doctors is dedicated to providing high-quality
                healthcare with a personal touch.
              </p>

              <div className="space-y-4 mb-10">

                {[
                  "Specialist Doctors & Modern Equipment",
                  "24/7 Emergency Services",
                  "Expert Medical Team",
                  "Modern Infrastructure",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">

                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    </div>

                    <span className="text-slate-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-green-600 transition-all"
              >
                Learn More
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >

              <img
  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
  alt="Medical Team"
  className="w-full max-w-[420px] h-[400px] object-cover rounded-[28px] shadow-2xl mx-auto"
/>

            </motion.div>

          </div>

        </div>
      </section>

      {/* FOUNDERS SECTION */}
<section className="px-6 lg:px-12 py-20 bg-emerald-50">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-14">

      <p className="text-green-600 font-semibold tracking-[0.2em] uppercase">
        Our Founders
      </p>

      <h3 className="mt-4 text-4xl lg:text-4xl font-bold text-slate-900">
       Dedicated Leaders Behind Shri Navnath Hospital
      </h3>

      <p className="mt-5 text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
        Dedicated healthcare leaders committed to delivering compassionate,
        accessible, and world-class medical services for every patient.
      </p>

    </div>

    <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-5xl mx-auto">

  {/* Dr. Pramod Dalal */}
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 w-[320px] h-[420px] mx-auto flex flex-col hover:shadow-xl transition-all duration-300">

    <img
      src="/pramod.jpeg"
      alt="Dr. Pramod Dalal"
      className="w-full h-52 object-cover"
    />

    <div className="p-5 text-center">

      <h3 className="text-xl font-bold text-slate-900">
        Mr. Pramod Dalal
      </h3>

      <p className="mt-1 text-green-600 font-semibold">
        Founder & Senior Medical Director
      </p>

      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        Mr. Pramod Dalal has been instrumental in building a trusted
        healthcare ecosystem focused on patient-first care,
        innovation, and medical excellence. 
      </p>

    </div>
  </div>

  {/* Dr. Kirti Dalal */}
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 w-[320px] h-[420px] mx-auto flex flex-col hover:shadow-xl transition-all duration-300">

    <img
      src="/kirti.jpeg"
      alt="Dr. Kirti Dalal"
      className="w-full h-52 object-cover"
    />

    <div className="p-5 text-center">

      <h3 className="text-xl font-bold text-slate-900">
        Dr. Kirti Dalal
      </h3>

      <p className="mt-1 text-green-600 font-semibold">
        Co-Founder & Healthcare Specialist
      </p>

      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        Dr. Kirti Dalal brings compassionate patient care and years of
        healthcare expertise, ensuring quality treatment and
        personalized attention for every individual.
      </p>

    </div>
  </div>
</div>

  </div>
</section>

    </div>
  );
};

export default Home;