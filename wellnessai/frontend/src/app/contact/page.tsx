"use client";
import { useState } from "react";
import { Send, Phone, Mail, CheckCircle, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate submit
    setIsLoading(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#bcf3f3]  bg-[#bcf3f3]"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-white/15 to-[#6cf0f2]/10 rounded-full animate-pulse blur-sm"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#6cf0f2]/20 to-[#0c0966]/10 rounded-full animate-bounce blur-sm"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-white/8 to-[#6cf0f2]/5 rounded-full animate-pulse blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-[#0c0966]/10 to-white/15 rounded-full animate-bounce delay-1000 blur-sm"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 [font-family:'Outfit',Helvetica] tracking-tight">
              <span className="text-[#0c0966] drop-shadow-lg">Contact</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0c0966] via-[#6cf0f2] to-[#0c0966] animate-pulse">Support</span>
            </h1>
            <p className="text-lg text-[#0c0966]/80 mb-8 [font-family:'Outfit',Helvetica] max-w-2xl mx-auto leading-relaxed font-medium">
              Have questions or need assistance? Reach out to us and we'll be happy to help!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#6cf0f2] via-[#0c0966] to-[#6cf0f2] mx-auto rounded-full shadow-sm"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/30 to-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500 hover:from-white/35 hover:to-white/25">
                {!isSubmitted ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[#0c0966] font-semibold [font-family:'Outfit',Helvetica] text-sm flex items-center">
                          <span>Your Name</span>
                          <span className="text-[#6cf0f2] ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          placeholder="Enter your full name"
                          className={`w-full p-4 rounded-xl border-2 ${
                            focusedField === 'name' 
                              ? 'border-[#6cf0f2] bg-white/70 shadow-lg transform scale-[1.02]' 
                              : 'border-white/40 bg-white/50 hover:border-white/60'
                          } backdrop-blur-sm focus:outline-none transition-all duration-300 placeholder:text-[#0c0966]/40 [font-family:'Outfit',Helvetica] text-[#0c0966] font-medium`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[#0c0966] font-semibold [font-family:'Outfit',Helvetica] text-sm flex items-center">
                          <span>Your Email</span>
                          <span className="text-[#6cf0f2] ml-1">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField('')}
                          placeholder="your.email@example.com"
                          className={`w-full p-4 rounded-xl border-2 ${
                            focusedField === 'email' 
                              ? 'border-[#6cf0f2] bg-white/70 shadow-lg transform scale-[1.02]' 
                              : 'border-white/40 bg-white/50 hover:border-white/60'
                          } backdrop-blur-sm focus:outline-none transition-all duration-300 placeholder:text-[#0c0966]/40 [font-family:'Outfit',Helvetica] text-[#0c0966] font-medium`}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[#0c0966] font-semibold [font-family:'Outfit',Helvetica] text-sm flex items-center">
                        <span>Your Message</span>
                        <span className="text-[#6cf0f2] ml-1">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        className={`w-full p-4 rounded-xl border-2 ${
                          focusedField === 'message' 
                            ? 'border-[#6cf0f2] bg-white/70 shadow-lg transform scale-[1.02]' 
                            : 'border-white/40 bg-white/50 hover:border-white/60'
                        } backdrop-blur-sm focus:outline-none transition-all duration-300 placeholder:text-[#0c0966]/40 [font-family:'Outfit',Helvetica] text-[#0c0966] font-medium resize-none`}
                      />
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading || !formData.name || !formData.email || !formData.message}
                      className="w-full bg-gradient-to-r from-[#6cf0f2] via-[#5ce0e2] to-[#6cf0f2] hover:from-[#5ce0e2] hover:via-[#4cd0d2] hover:to-[#5ce0e2] text-[#0c0966] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 [font-family:'Outfit',Helvetica] text-lg flex items-center justify-center space-x-2 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-[#6cf0f2]/30 hover:border-[#6cf0f2]/60"
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-2 border-[#0c0966]/30 border-t-[#0c0966] rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gradient-to-br from-green-400/20 to-green-500/20 p-6 rounded-full w-fit mx-auto mb-6">
                      <CheckCircle size={64} className="text-green-600 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0c0966] mb-2 [font-family:'Outfit',Helvetica]">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-[#0c0966]/70 [font-family:'Outfit',Helvetica] font-medium">
                      Thank you for reaching out. We'll get back to you within 24 hours!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30 hover:from-white/30 hover:to-white/20 transition-all duration-500">
                <h3 className="text-xl font-bold text-[#0c0966] mb-4 [font-family:'Outfit',Helvetica] flex items-center">
                  <MessageSquare className="mr-2 text-[#6cf0f2]" size={20} />
                  Get in Touch
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-300">
                    <div className="bg-[#6cf0f2]/30 p-2 rounded-lg">
                      <Phone className="text-[#0c0966]" size={18} />
                    </div>
                    <div>
                      <p className="text-[#0c0966] font-semibold [font-family:'Outfit',Helvetica] text-sm">Phone Support</p>
                      <p className="text-[#0c0966]/70 [font-family:'Outfit',Helvetica] text-xs">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-300">
                    <div className="bg-[#6cf0f2]/30 p-2 rounded-lg">
                      <Mail className="text-[#0c0966]" size={18} />
                    </div>
                    <div>
                      <p className="text-[#0c0966] font-semibold [font-family:'Outfit',Helvetica] text-sm">Email Support</p>
                      <p className="text-[#0c0966]/70 [font-family:'Outfit',Helvetica] text-xs">support@company.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-300">
                    <div className="bg-[#6cf0f2]/30 p-2 rounded-lg">
                      <Clock className="text-[#0c0966]" size={18} />
                    </div>
                    <div>
                      <p className="text-[#0c0966] font-semibold [font-family:'Outfit',Helvetica] text-sm">Response Time</p>
                      <p className="text-[#0c0966]/70 [font-family:'Outfit',Helvetica] text-xs">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/30 hover:from-white/30 hover:to-white/20 transition-all duration-500">
                <h3 className="text-lg font-bold text-[#0c0966] mb-4 [font-family:'Outfit',Helvetica]">
                  Quick Help
                </h3>
                <div className="space-y-2">
                  <a href="#" className="block text-[#0c0966]/80 hover:text-[#0c0966] [font-family:'Outfit',Helvetica] hover:bg-white/20 p-2 rounded-lg transition-all duration-200 text-sm font-medium">
                    → Frequently Asked Questions
                  </a>
                  <a href="#" className="block text-[#0c0966]/80 hover:text-[#0c0966] [font-family:'Outfit',Helvetica] hover:bg-white/20 p-2 rounded-lg transition-all duration-200 text-sm font-medium">
                    → Technical Support
                  </a>
                  <a href="#" className="block text-[#0c0966]/80 hover:text-[#0c0966] [font-family:'Outfit',Helvetica] hover:bg-white/20 p-2 rounded-lg transition-all duration-200 text-sm font-medium">
                    → Account Help
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
