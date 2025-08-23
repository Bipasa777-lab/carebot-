"use client";

import Image from "next/image";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

const teamMembers = [
  { name: "Bipsa Saha",  image: "/bipasa.svg", linkedin: "https://www.linkedin.com/in/bipasa-saha-570000335/", github: "https://github.com/Bipasa777-lab" },
  { name: "Bikram Bera",  image: "/bikram.svg", linkedin: "http://www.linkedin.com/in/bikram-bera", github: "https://github.com/Rebikrrt399" },
  { name: "Animesh Sahoo", image: "/animesh.svg", linkedin: "https://www.linkedin.com/in/animesh-sahoo-b03151302/", github: "https://github.com/STROM6532" },
  { name: "Not Available", role: "Designer", image: "/team/satyadiptee.png", linkedin: "https://linkedin.com/in/example", github: "https://github.com/example" },
];

const revealOnce = { once: true, amount: 0.2 };

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      {/* Hero with continuously moving gradient */}
      <section className="text-center py-12 text-white bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 bg-[length:200%_200%] animate-gradientMove">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-2 max-w-3xl mx-auto text-lg"
        >
          “Bridging the gap between technology and healthcare with intelligence and care.”
        </motion.p>
      </section>

      {/* Team */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="relative group rounded-2xl shadow-lg overflow-hidden bg-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={revealOnce}
            >
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-end pb-6">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-gray-200">{member.role ?? "Developer"}</p>
                <div className="flex gap-4 mt-2">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="text-white hover:opacity-80 transition">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`} className="text-white hover:opacity-80 transition">
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Project — EXACT TEXT ADDED */}
      <section className="max-w-5xl mx-auto px-6 py-12 leading-relaxed text-justify space-y-8">
        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={revealOnce}
        >
          In today&apos;s world, timely access to healthcare and emergency services can mean the difference
          between life and death. <strong>WellnessAI</strong> is a full-stack AI-powered medical assistant designed to bring instant
          care, local emergency support, and health analysis right to your fingertips. From analyzing your
          symptoms to locating nearby hospitals, pharmacies, or even police stations, WellnessAI is your
          intelligent companion in moments that matter.
        </motion.p>

        {/* PROJECT OVERVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={revealOnce}
        >
          <h2 className="text-2xl font-bold">PROJECT OVERVIEW</h2>
          <p className="mt-2">WellnessAI is a multi-functional platform that provides:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>AI Medical Assistant Chatbot (via Meditron + LangChain)</li>
            <li>Symptom &amp; Report Analysis</li>
            <li>Nearby Hospital &amp; Pharmacy Locator</li>
            <li>Nearby Police Station for Emergency Reporting</li>
            <li>Health Check &amp; Personalized Suggestions</li>
            <li>Multilingual Support (English, Hindi, Bengali, more)</li>
            <li>Local, Private Data Processing (No cloud exposure)</li>
          </ul>
        </motion.div>

        {/* TECH STACK OVERVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={revealOnce}
        >
          <h2 className="text-2xl font-bold">TECH STACK OVERVIEW</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Frontend: Next.js, TypeScript, Tailwind CSS, ShadCN UI</li>
            <li>Backend (API): Node.js + Express</li>
            <li>Backend (AI): Python + Flask (Meditron + LangChain)</li>
            <li>Mapping: Google Maps API / OpenStreetMap (Leaflet)</li>
            <li>AI Model: Meditron</li>
            <li>Dev Tools: Vite, VSCode, Git, Postman</li>
          </ul>
        </motion.div>

        {/* KEY FEATURES */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={revealOnce}
        >
          <h2 className="text-2xl font-bold">KEY FEATURES</h2>
          <ol className="list-decimal pl-6 mt-2 space-y-1">
            <li>AI Medical Chatbot: Using Meditron and LangChain to understand symptoms and give medical advice.</li>
            <li>Upload &amp; Analyze Reports: NLP + LLMs extract and explain medical documents.</li>
            <li>Nearby Hospital Locator: Find hospitals with geolocation and maps.</li>
            <li>Pharmacy &amp; Police Locator: Added support for 24x7 pharmacies and police stations.</li>
            <li>Personalized Health Checks: Health tips based on daily inputs.</li>
            <li>Multilingual Support: English, Hindi, Bengali, more.</li>
            <li>Local Data Processing: Uses local LLMs for privacy and safety.</li>
          </ol>
        </motion.div>

        {/* USE CASES */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={revealOnce}
        >
          <h2 className="text-2xl font-bold">USE CASES</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>A rural mother uploads a report and gets care advice + hospital location.</li>
            <li>An elderly person checks symptoms and alerts emergency contact.</li>
            <li>A traveler locates the nearest police station at night.</li>
          </ul>
        </motion.div>

        {/* FUTURE ROADMAP */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={revealOnce}
        >
          <h2 className="text-2xl font-bold">FUTURE ROADMAP</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Biometric integration</li>
            <li>Doctor booking</li>
            <li>X-ray AI analysis</li>
            <li>Health education content</li>
            <li>Optional cloud backup</li>
          </ul>
        </motion.div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={revealOnce}
          className="font-semibold"
        >
          WellnessAI is more than a project - it&apos;s a mission to empower people with accessible, AI-driven
          healthcare and emergency support.
        </motion.p>
      </section>

      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 text-center mt-12">
        <p>© {new Date().getFullYear()} WellnessAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
