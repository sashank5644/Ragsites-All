'use client';

import { useState, useEffect } from 'react';

// Declare fbq function for Meta Pixel
declare global {
  interface Window {
    fbq?: (action: string, eventName: string) => void;
  }
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentChat, setCurrentChat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate chat carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChat((prev) => (prev + 1) % 3);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Placeholder Google Calendar link - replace with actual link
  const CALENDAR_LINK = "https://calendar.app.google/Ypk96WxWr9GvoXsM9";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-7xl pt-20 pb-32 sm:pt-32 sm:pb-40">
            <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  RagSites
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                Implement AI-Powered Solutions To Your Business For 10x ROI
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                Book Free 15 Minute Consultation to Learn More
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.fbq) {
                      window.fbq('track', 'Lead');
                    }
                  }}
                  className="group relative rounded-full bg-gradient-to-r from-blue-600 to-cyan-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 hover:shadow-2xl"
                >
                  <span className="relative z-10">Book Free Consultation</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                </a>
                <a
                  href="#demos"
                  className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20"
                >
                  See Our AI in Action
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pain Points Section */}
      <div className="relative py-24 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Are You Facing These Challenges?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Missing Opportunities",
                description: "Leads slipping through the cracks while you sleep or handle other clients",
                icon: "⚠️"
              },
              {
                title: "High Operational Costs",
                description: "Spending too much on tasks that could be automated efficiently",
                icon: "💸"
              },
              {
                title: "Low Conversion Rates",
                description: "Struggling to turn interested prospects into paying customers",
                icon: "📉"
              },
              {
                title: "Scheduling Chaos",
                description: "Lost revenue from missed appointments and poor calendar management",
                icon: "📅"
              },
              {
                title: "Slow Response Times",
                description: "Customers expect instant answers, but you can't be available 24/7",
                icon: "⏱️"
              },
              {
                title: "Limited Scalability",
                description: "Growth is constrained by manual processes and human limitations",
                icon: "🔒"
              }
            ].map((pain, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{pain.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{pain.title}</h3>
                <p className="text-gray-300">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="relative py-24 bg-gradient-to-b from-slate-900/50 to-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Our AI Solutions Deliver Results
            </h2>
            <p className="text-lg text-gray-300">
              Transform your business with intelligent automation and analytics
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                metric: "40-60%",
                label: "Cost Reduction",
                description: "Through intelligent automation"
              },
              {
                metric: "24/7",
                label: "Availability",
                description: "Never miss another lead"
              },
              {
                metric: "3x",
                label: "More Conversions",
                description: "With AI-powered engagement"
              },
              {
                metric: "100%",
                label: "Tracked",
                description: "Complete analytics visibility"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="relative rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-700/20 p-8 backdrop-blur-sm border border-blue-500/20 text-center transition-all duration-300 hover:scale-105 hover:border-blue-500/40"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.metric}
                </div>
                <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                <p className="text-gray-300 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What We Offer
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: "Custom AI Solutions",
                description: "Tailored artificial intelligence systems designed specifically for your business needs and workflows",
                icon: "🤖"
              },
              {
                title: "Real-Time Analytics",
                description: "Comprehensive dashboards that give you complete visibility into your AI services performance",
                icon: "📊"
              },
              {
                title: "Automated Lead Management",
                description: "Capture, qualify, and nurture leads automatically while you focus on closing deals",
                icon: "🎯"
              },
              {
                title: "Intelligent Scheduling",
                description: "AI-powered appointment booking that maximizes your calendar and reduces no-shows",
                icon: "🗓️"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-blue-500/30"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Voice Agent Demo Section */}
      <div id="demos" className="relative py-24 bg-gradient-to-b from-slate-900/50 to-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text- md:text-4xl mb-4">
              AI Backed By Certified Researchers
            </h2>
          </div>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              See Our AI Voice Agent in Action
            </h2>
            <p className="text-lg text-gray-300">
              Watch how our intelligent voice agent handles customer calls with natural conversation
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-4 hover:border-blue-500/30 transition-all duration-300">
              <video
                controls
                className="w-full rounded-xl"
                poster="/video-thumbnail.jpg"
              >
                <source src="/voice-agent-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Our AI voice agent handles inbound calls, answers questions, qualifies leads, and books appointments - all while sounding completely natural.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Lead Reactivation Section */}
      <div className="relative py-24 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              AI Lead Reactivation Agent in Action
            </h2>
            <p className="text-lg text-gray-300">
              See how businesses use our AI agents to communicate with their customers
            </p>
          </div>

          {/* Chat Carousel */}
          <div className="mx-auto max-w-md mb-12">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600/10 to-cyan-700/10 border border-white/20 backdrop-blur-sm" style={{ height: '600px' }}>
              {/* Chat Header - Dynamic based on current chat */}
              <div className="bg-gradient-to-r from-blue-600/20 to-cyan-700/20 border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {currentChat === 0 && "Solar Agent"}
                      {currentChat === 1 && "Roofing Agent"}
                      {currentChat === 2 && "PowerFit Gym AI"}
                    </div>
                    <div className="text-green-400 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Active
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages - Rotating */}
              <div className="p-6 h-[480px] overflow-y-auto">
                {/* Chat 1 - Auto Repair Shop */}
                <div className={`transition-all duration-500 ${currentChat === 0 ? 'opacity-100' : 'opacity-0 absolute'}`}>
                  <div className="space-y-4">
                    {/* Customer Message */}
                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Hi, my check engine light just came on. Can I get it checked today?</p>
                        <p className="text-gray-300 text-xs mt-1">9:14 AM</p>
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex items-start gap-2">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Of course! I can help you with that. We have availability at 2:00 PM or 4:30 PM today. Which works better for you?</p>
                        <p className="text-gray-400 text-xs mt-1">9:15 AM</p>
                      </div>
                    </div>

                    {/* Customer Message */}
                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">2:00 PM works great! How long will it take?</p>
                        <p className="text-gray-300 text-xs mt-1">9:16 AM</p>
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex items-start gap-2">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">The diagnostic usually takes 30-45 minutes. I&apos;ve booked you in for 2:00 PM today. You&apos;ll receive a confirmation text shortly! 🚗</p>
                        <p className="text-gray-400 text-xs mt-1">9:16 AM</p>
                      </div>
                    </div>

                    {/* Customer Message */}
                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Perfect, thank you!</p>
                        <p className="text-gray-300 text-xs mt-1">9:17 AM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat 2 - Dental Practice */}
                <div className={`transition-all duration-500 ${currentChat === 1 ? 'opacity-100' : 'opacity-0 absolute'}`}>
                  <div className="space-y-4">
                    {/* AI Message */}
                    <div className="flex items-start gap-2">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Hi Sarah! It&apos;s been 6 months since your last cleaning. Would you like to schedule your next appointment?</p>
                        <p className="text-gray-400 text-xs mt-1">2:32 PM</p>
                      </div>
                    </div>

                    {/* Customer Message */}
                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Yes! I&apos;ve been meaning to call. Do you have any morning slots next week?</p>
                        <p className="text-gray-300 text-xs mt-1">2:45 PM</p>
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex items-start gap-2">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Perfect! I have Tuesday at 9:00 AM or Thursday at 10:30 AM available. Which would you prefer?</p>
                        <p className="text-gray-400 text-xs mt-1">2:46 PM</p>
                      </div>
                    </div>

                    {/* Customer Message */}
                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Thursday at 10:30 works perfectly!</p>
                        <p className="text-gray-300 text-xs mt-1">2:48 PM</p>
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex items-start gap-2">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Great! You&apos;re all set for Thursday, Nov 14th at 10:30 AM with Dr. Chen. I&apos;ll send you a reminder the day before! 😊</p>
                        <p className="text-gray-400 text-xs mt-1">2:48 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat 3 - Fitness Gym */}
                <div className={`transition-all duration-500 ${currentChat === 2 ? 'opacity-100' : 'opacity-0 absolute'}`}>
                  <div className="space-y-4">
                    {/* Customer Message */}
                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Hey! Do you still have spots in the 6pm HIIT class tomorrow?</p>
                        <p className="text-gray-300 text-xs mt-1">5:22 PM</p>
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex items-start gap-2">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Yes! We have 3 spots left in tomorrow&apos;s 6pm HIIT class. Would you like me to reserve one for you?</p>
                        <p className="text-gray-400 text-xs mt-1">5:23 PM</p>
                      </div>
                    </div>

                    {/* Customer Message */}
                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">Yes please! Also, can you recommend any other classes for weight loss?</p>
                        <p className="text-gray-300 text-xs mt-1">5:25 PM</p>
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="flex items-start gap-2">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">You&apos;re booked! For weight loss, I&apos;d recommend our Spin classes (Mon/Wed/Fri 7am) and Strength Training (Tue/Thu 6pm). Want me to add you to those too?</p>
                        <p className="text-gray-400 text-xs mt-1">5:25 PM</p>
                      </div>
                    </div>

                    {/* Customer Message */}
                    <div className="flex items-end gap-2 justify-end">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-white text-sm">That would be amazing, thank you! 💪</p>
                        <p className="text-gray-300 text-xs mt-1">5:26 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentChat(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentChat === index ? 'bg-blue-500 w-6' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 max-w-3xl mx-auto">
              See how our clients use AI agents to provide instant 24/7 customer service, automatically book appointments,
              answer questions, and engage with their customers - all while sounding completely natural and personalized.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-gradient-to-b from-slate-900/50 to-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-700 px-6 py-24 text-center shadow-2xl sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Let&apos;s discuss how our AI solutions can help you cut costs, increase revenue, and scale your business.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={CALENDAR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.fbq) {
                    window.fbq('track', 'Lead');
                  }
                }}
                className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-sm hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Schedule Your Free Consultation
              </a>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="#3b82f6" />
                  <stop offset={1} stopColor="#06b6d4" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-slate-900 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-center text-sm leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} RagSites. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
