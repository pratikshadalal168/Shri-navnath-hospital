import { motion } from 'motion/react';
import { Heart, Brain, Bone, Baby, Syringe, ClipboardList, Stethoscope, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Cardiology",
    icon: <Heart />,
    desc: "Comprehensive heart care including diagnostics, treatment, and rehabilitation for cardiovascular conditions.",
    features: ["Heart surgery", "ECG/EKG", "Angioplasty", "Cardiac Rehab"]
  },
  {
    title: "Neurology",
    icon: <Brain />,
    desc: "Expert treatment for brain and nervous system disorders using the latest neuroimaging technology.",
    features: ["Stroke care", "Epilepsy", "Neuro-surgery", "Sleep Clinic"]
  },
  {
    title: "Orthopedics",
    icon: <Bone />,
    desc: "Specialized care for bones, joints, and muscular systems to keep you moving comfortably.",
    features: ["Joint replacement", "Sports medicine", "Fracture care", "Spine health"]
  },
  {
    title: "Pediatrics",
    icon: <Baby />,
    desc: "Gentle and expert medical care for infants, children, and adolescents in a child-friendly environment.",
    features: ["Vaccinations", "Growth monitoring", "Neonatal care", "Developmental care"]
  },
  {
    title: "General Surgery",
    icon: <Syringe />,
    desc: "Advanced surgical procedures with a focus on minimally invasive techniques for faster recovery.",
    features: ["Laparoscopy", "Trauma surgery", "Digestive care", "Post-op support"]
  },
  {
    title: "Diagnostics",
    icon: <Microscope />,
    desc: "State-of-the-art laboratory and imaging services for accurate and timely medical results.",
    features: ["MRI / CT Scan", "Blood tests", "X-Ray", "Pathology"]
  }
];

const Services = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-primary-text mb-6">Our Medical Services</h1>
          <p className="text-secondary-text text-lg leading-relaxed">
            We provide a wide range of specialized medical services to ensure complete care for you and your family. Each department is staffed by experienced professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="h-16 w-16 bg-light-bg rounded-2xl flex items-center justify-center text-primary mb-8">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary-text mb-4">{service.title}</h3>
              <p className="text-secondary-text mb-8 leading-relaxed">
                {service.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center space-x-2 text-sm text-gray-700">
                    <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="mt-32 p-12 bg-primary-text rounded-[3rem] text-white overflow-hidden relative shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-gray-400 mb-8">Have questions about our services? Check out our quick FAQ or contact our coordination team.</p>
              <div className="space-y-4">
                {[
                  { q: "How do I book an appointment?", a: "You can book online through our website or call our reception." },
                  { q: "What should I bring for my first visit?", a: "Bring your ID card, previous medical records, and insurance card if applicable." }
                ].map((faq, i) => (
                  <div key={i} className="border-b border-gray-800 pb-4">
                    <div className="font-bold mb-2 flex items-center space-x-2">
                       <span className="text-primary font-mono italic">0{i+1}</span>
                       <span>{faq.q}</span>
                    </div>
                    <p className="text-sm text-gray-400 pl-8">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block h-full min-h-[300px]">
              <div className="h-full w-full bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center">
                <Stethoscope className="h-24 w-24 text-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
