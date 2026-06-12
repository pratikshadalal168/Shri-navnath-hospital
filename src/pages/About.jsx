import { motion } from 'motion/react';
import { Target, Eye, Award, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl lg:text-4xl font-bold text-primary-text mb-8">
             About Shri Navnath  <span className="text-primary">Multispeciality Hospital</span>
            </h1>
            <p className="text-secondary-text text-lg leading-relaxed mb-6">
               A primary care hospital certified by the Department of Health Civil Surgeon,
  Nagpur to coordinate care among the primary care team, specialists and
  community services to ensure patients receive what they need to stay healthy
  and improve and manage their health.
            </p>
            <p className="text-secondary-text text-lg leading-relaxed mb-10">
              Shri Navnath Multispeciality Hospital provides complete care ranging from
  disease prevention to management of complex & chronic conditions, and are
  dedicated to meeting the highest standards for health care delivery.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                "Modern Infrastructure",
                "Advanced Lab Facility",
                "Certified Professionals",
                "Personalized Care",
                "Emergency Support",
                "Family Environment"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2 text-primary-text font-medium">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053"
              alt="Hospital building"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <div className="text-4xl font-bold mb-1">25+</div>
              <div className="text-sm opacity-80">Years of Experience</div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-14 w-14 bg-light-bg rounded-2xl flex items-center justify-center text-primary mb-8">
              <Target className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-primary-text mb-4">Our Mission</h2>
            <p className="text-secondary-text leading-relaxed">
              To provide the highest quality of clinical care by combining medical excellence with compassionate, patient-centered service. We strive to improve the health of our community through education and innovative medical practices.
            </p>
          </div>
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-14 w-14 bg-light-bg rounded-2xl flex items-center justify-center text-primary mb-8">
              <Eye className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-primary-text mb-4">Our Vision</h2>
            <p className="text-secondary-text leading-relaxed">
              To be the premier hospital of choice for patients, physicians, and employees because of our commitment to quality, safety, and service. We aim to lead the way in medical advancements and healthcare accessibility.
            </p>
          </div>
        </div>

        {/* Awards */}
        <div className="text-center py-16 bg-light-bg rounded-3xl">
          <div className="max-w-2xl mx-auto">
            <Award className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-primary-text mb-4">Award Winning Facility</h2>
            <p className="text-secondary-text">
              Recognized as the "Best Hospital in Health City" for five consecutive years (2019-2023) for our excellence in patient safety and surgical outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
