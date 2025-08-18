import React from "react";
import Navbar from "@/components/navbar";


export default function FaqPage() {
  const faqs = [
    {
      question: "What is CaReBot?",
      answer:
        "CaReBot is your intelligent health companion, designed to guide, support, and simplify healthcare by providing smart solutions to everyday health issues—anytime, anywhere.",
    },
    {
      question: "How does CaReBot work?",
      answer:
        "CaReBot uses advanced AI technology to analyze your health concerns and provide personalized recommendations, guidance, and support based on medical knowledge and best practices.",
    },
    {
      question: "Is CaReBot a replacement for doctors?",
      answer:
        "No, CaReBot is designed to complement, not replace, professional medical care. For serious health concerns, always consult with qualified healthcare professionals.",
    },
    {
      question: "Is my health information secure?",
      answer:
        "Yes, we take your privacy seriously. All health information is encrypted and stored securely, following industry-standard security protocols and healthcare privacy regulations.",
    },
    {
      question: "How much does CaReBot cost?",
      answer:
        "CaReBot offers various pricing plans to suit different needs. Contact us for detailed pricing information and to find the plan that's right for you.",
    },
    {
      question: "Can I use CaReBot on my mobile device?",
      answer:
        "Yes, CaReBot is designed to work seamlessly across all devices - desktop, tablet, and mobile - so you can access your health companion wherever you are.",
    },
  ];

  return (
    <div className="bg-[#bcf3f3] min-h-screen w-full">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-[#0c0966] text-center mb-4 [font-family:'Outfit',Helvetica]">
          Frequently Asked Questions
        </h1>

        <p className="text-xl text-black text-center mb-12 [font-family:'Outfit',Helvetica]">
          Find answers to common questions about CaReBot
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30"
            >
              <h3 className="text-2xl font-semibold text-[#0c0966] mb-3 [font-family:'Outfit',Helvetica]">
                {faq.question}
              </h3>
              <p className="text-lg text-black leading-relaxed [font-family:'Outfit',Helvetica]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-black mb-6 [font-family:'Outfit',Helvetica]">
            Still have questions? We're here to help!
          </p>
          <button className="bg-[#6cf0f2] hover:bg-[#5ce0e2] text-black font-medium px-8 py-3 rounded-full border border-solid shadow-md transition-all duration-200 [font-family:'Outfit',Helvetica] text-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
