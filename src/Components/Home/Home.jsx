import React from 'react'
import { Briefcase, Target, LineChart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="px-6 py-24 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Track Your Dream Job Journey
            <span className="text-indigo-600"> Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Smart job tracking platform that helps you organize applications and discover
            opportunities tailored to your skills
          </p>
          <Link
            to="/jobs"
            className="px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-full
            hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl
            hover:-translate-y-0.5"
          >
            Explore Jobs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything you need to succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="w-8 h-8 text-indigo-600" />}
              title="Smart Job Matching"
              description="Get personalized job recommendations based on your skills and preferences"
            />
            <FeatureCard
              icon={<Briefcase className="w-8 h-8 text-indigo-600" />}
              title="Application Tracking"
              description="Keep all your job applications organized in one place"
            />
            <FeatureCard
              icon={<LineChart className="w-8 h-8 text-indigo-600" />}
              title="Progress Analytics"
              description="Track your application success rate and interview performance"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 bg-gradient-to-r from-indigo-700 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to take control of your job search?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of job seekers who've found their dream jobs using JobsForMe
          </p>
          <Link
            to="/profile"
            className="px-8 py-3 text-lg font-medium text-indigo-600 bg-white rounded-full
            hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl
            hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default Home