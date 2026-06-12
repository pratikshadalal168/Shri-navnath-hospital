import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  ChevronDown,
} from "lucide-react";

export default function Contact() {

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    const whatsappMessage = `
*New Contact Message*

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
📌 Subject: ${subject}

💬 Message:
${message}
    `;

    // Yaha apna WhatsApp number daalna
    const whatsappNumber = "919665560247";

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="w-full bg-green-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-white/85" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">

          <div className="max-w-2xl">

            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight text-[#0B132B]">
              Contact{" "}
              <span className="text-green-600">
                Us
              </span>
            </h1>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Have questions or need medical assistance?
              Our healthcare team is always here to help you.
            </p>

          </div>

        </div>

      </section>

      {/* CONTACT SECTION */}
      <section className="relative -mt-4 z-10 px-6 lg:px-8 pb-14">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[320px_1fr] gap-6">

          {/* LEFT INFO CARDS */}
          <div className="space-y-4">

            {/* CARD */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 flex gap-4 items-start">

              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0B132B]">
                  Hospital Address
                </h3>

                <p className="mt-2 text-slate-600 leading-relaxed text-base">
                  Ambhore Nagar, Gumgaon Road, Opposite Post Office,  
                 Hingna, Nagpur District, Maharashtra – 411001, India.  
                  Strategically located on the route to the Samruddhi Expressway.
                </p>
              </div>

            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 flex gap-4 items-start">

              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0B132B]">
                  Phone Number
                </h3>

                <p className="mt-2 text-slate-600 text-base">
                  +91 9665560247
                </p>
              </div>

            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 flex gap-4 items-start">

              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0B132B]">
                  Email Address
                </h3>

                <p className="mt-2 text-slate-600 text-base">
                  support@axiscare.com
                </p>
              </div>

            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 flex gap-4 items-start">

              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0B132B]">
                  Working Hours
                </h3>

                <p className="mt-2 text-slate-600 leading-relaxed text-base">
                  Open 24/7
                  <br />
                  for Emergency Services
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-md border border-slate-100">

            <h2 className="text-2xl lg:text-3xl font-bold text-[#0B132B]">
              Send Message
            </h2>

            <p className="mt-2 text-slate-600 text-base">
              Fill out the form and our team will contact you shortly.
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="mt-7 space-y-5">

              {/* ROW 1 */}
              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 font-semibold text-sm text-slate-700">
                    Full Name
                  </label>

                  <div className="relative">

                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="w-full h-11 rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-green-500"
                    />

                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-sm text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full h-11 rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-green-500"
                    />

                  </div>
                </div>

              </div>

              {/* ROW 2 */}
              <div className="grid md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 font-semibold text-sm text-slate-700">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      className="w-full h-11 rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-green-500"
                    />

                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-sm text-slate-700">
                    Subject
                  </label>

                  <div className="relative">

                    <select
                      name="subject"
                      className="w-full h-11 rounded-xl border border-slate-200 px-4 appearance-none outline-none focus:border-green-500 text-sm text-slate-600"
                    >
                      <option>Select subject</option>
                      <option>Appointment</option>
                      <option>Emergency</option>
                      <option>General Inquiry</option>
                    </select>

                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />

                  </div>
                </div>

              </div>

              {/* MESSAGE */}
              <div>

                <label className="block mb-2 font-semibold text-sm text-slate-700">
                  Message
                </label>

                <textarea
                  rows="4"
                  name="message"
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm outline-none resize-none focus:border-green-500"
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-green-600 hover:bg-green-700 transition text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}