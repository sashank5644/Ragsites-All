'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import MetricCard from '@/components/MetricCard';
import ChartCard from '@/components/ChartCard';
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Sample data - replace with actual API calls
  const metrics = {
    totalRequests: 45892,
    activeServices: 12,
    avgResponseTime: 234,
    successRate: 98.7
  };

  // Sample chart data - replace with actual data
  const donutMetrics = [
    { label: '38', total: 50, percentage: 76, color1: '#8B5CF6', color2: '#EC4899' },
    { label: '112', total: 150, percentage: 74.67, color1: '#8B5CF6', color2: '#EC4899' },
    { label: '51', total: 90, percentage: 56.67, color1: '#F59E0B', color2: '#EF4444' },
    { label: '25', total: 70, percentage: 35.71, color1: '#8B5CF6', color2: '#EC4899' },
    { label: '11', total: 35, percentage: 31.43, color1: '#F59E0B', color2: '#EF4444' }
  ];

  const sessionData = [
    { month: 'Jan-01', users: 35, leads: 50 },
    { month: 'Feb-01', users: 40, leads: 45 },
    { month: 'Mar-01', users: 32, leads: 60 },
    { month: 'Apr-01', users: 50, leads: 48 },
    { month: 'May-01', users: 45, leads: 55 },
    { month: 'Jun-01', users: 55, leads: 50 },
    { month: 'Jul-01', users: 62, leads: 58 }
  ];

  const recentActivity = [
    { id: 1, service: 'Chatbot AI', action: 'Processed customer inquiry', time: '2 minutes ago', status: 'success' },
    { id: 2, service: 'Lead Qualifier', action: 'Qualified new lead', time: '5 minutes ago', status: 'success' },
    { id: 3, service: 'Email Automation', action: 'Sent follow-up email', time: '12 minutes ago', status: 'success' },
    { id: 4, service: 'Analytics Engine', action: 'Generated report', time: '23 minutes ago', status: 'success' },
    { id: 5, service: 'Chatbot AI', action: 'Error in response generation', time: '45 minutes ago', status: 'error' }
  ];

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black ml-72">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-300">Here's what's happening with your AI services today.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Requests"
            value={metrics.totalRequests.toLocaleString()}
            change={12.5}
            changeLabel="vs last week"
            gradient="from-blue-500 to-blue-600"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <MetricCard
            title="Active Services"
            value={metrics.activeServices}
            change={8.3}
            changeLabel="vs last week"
            gradient="from-blue-500 to-cyan-500"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            }
          />
          <MetricCard
            title="Avg Response Time"
            value={`${metrics.avgResponseTime}ms`}
            change={-5.2}
            changeLabel="vs last week"
            gradient="from-green-500 to-emerald-500"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <MetricCard
            title="Success Rate"
            value={`${metrics.successRate}%`}
            change={1.2}
            changeLabel="vs last week"
            gradient="from-yellow-500 to-orange-500"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Charts Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Service Metrics - Donut Charts */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20"></div>
            <div className="relative">
              <ChartCard
                title="Service Metrics"
                description="Performance breakdown across services"
              >
                <div className="flex items-center justify-around py-4">
                  {donutMetrics.map((metric, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke="#1e293b"
                            strokeWidth="6"
                            fill="none"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke={`url(#gradient${index})`}
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${(metric.percentage / 100) * 201} 201`}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                          />
                          <defs>
                            <linearGradient id={`gradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={metric.color1} />
                              <stop offset="100%" stopColor={metric.color2} />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-bold text-white">{metric.label}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-xs text-gray-400">{metric.percentage.toFixed(2)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </div>

          {/* Key Sessions - Line Chart */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-blue-600 rounded-2xl blur opacity-20"></div>
            <div className="relative">
              <ChartCard
                title="Key Sessions"
                description="User engagement and lead conversion over time"
              >
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex flex-col">
                    {/* Y-axis labels */}
                    <div className="flex-1 flex flex-col justify-between text-xs text-gray-500 pr-4">
                      {[70, 60, 50, 40, 30, 20, 10].map((val) => (
                        <div key={val} className="text-right">{val}</div>
                      ))}
                    </div>
                  </div>
                  <div className="pl-8 pt-2 h-full">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 700 250">
                      {/* Grid lines */}
                      {[0, 50, 100, 150, 200, 250].map((y) => (
                        <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#1e293b" strokeWidth="1" />
                      ))}

                      {/* Users line (blue) */}
                      <polyline
                        points={sessionData.map((d, i) => `${(i / (sessionData.length - 1)) * 700},${250 - (d.users / 70) * 250}`).join(' ')}
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        className="transition-all duration-500"
                      />

                      {/* Leads line (pink) */}
                      <polyline
                        points={sessionData.map((d, i) => `${(i / (sessionData.length - 1)) * 700},${250 - (d.leads / 70) * 250}`).join(' ')}
                        fill="none"
                        stroke="#EC4899"
                        strokeWidth="3"
                        className="transition-all duration-500"
                      />

                      {/* Data points for Users */}
                      {sessionData.map((d, i) => (
                        <circle
                          key={`user-${i}`}
                          cx={(i / (sessionData.length - 1)) * 700}
                          cy={250 - (d.users / 70) * 250}
                          r="5"
                          fill="#3B82F6"
                          className="hover:r-7 transition-all cursor-pointer"
                        />
                      ))}

                      {/* Data points for Leads */}
                      {sessionData.map((d, i) => (
                        <circle
                          key={`lead-${i}`}
                          cx={(i / (sessionData.length - 1)) * 700}
                          cy={250 - (d.leads / 70) * 250}
                          r="5"
                          fill="#EC4899"
                          className="hover:r-7 transition-all cursor-pointer"
                        />
                      ))}
                    </svg>
                    {/* X-axis labels */}
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      {sessionData.map((d, i) => (
                        <span key={i}>{d.month}</span>
                      ))}
                    </div>
                    {/* Legend */}
                    <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-400">Users</span>
                        <span className="text-sm text-gray-300 font-semibold">1,855</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span className="text-sm text-gray-400">Leads</span>
                        <span className="text-sm text-gray-300 font-semibold">1,254</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ChartCard>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-15"></div>
          <div className="relative">
            <ChartCard
              title="Recent Activity"
              description="Latest events across all services"
            >
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="text-white font-medium">{activity.service}</p>
                        <p className="text-sm text-gray-400">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
