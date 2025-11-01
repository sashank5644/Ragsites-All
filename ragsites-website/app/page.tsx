'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Placeholder Google Calendar link - replace with actual link
  const CALENDAR_LINK = "https://calendar.app.google/Ypk96WxWr9GvoXsM9";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-7xl pt-20 pb-32 sm:pt-32 sm:pb-40">
            <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6 animate-fade-in">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  RagSites
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                AI-Powered Solutions That Transform Your Business
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                Cut costs, boost revenue, and never miss another opportunity with our customized AI solutions.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href={CALENDAR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 hover:shadow-2xl"
                >
                  <span className="relative z-10">Book a Consultation</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
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
                className="group relative rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
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
                className="relative rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 backdrop-blur-sm border border-purple-500/20 text-center transition-all duration-300 hover:scale-105 hover:border-purple-500/40"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
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
                className="relative rounded-2xl bg-white/5 p-8 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30"
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

      {/* CTA Section */}
      <div className="relative py-24 bg-gradient-to-b from-slate-900/50 to-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 px-6 py-24 text-center shadow-2xl sm:px-16">
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
                className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-sm hover:bg-gray-100 transition-all duration-300 hover:scale-105"
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
                  <stop stopColor="#7c3aed" />
                  <stop offset={1} stopColor="#2563eb" />
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
